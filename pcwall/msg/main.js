!function () {
    var e = "msg", t = [], l = [], n = [], i = !1, r = {}, o = 3, a = 3, s = new Hi.DbUtil(flag, e), c = new Hi.DbUtil(flag, "keyvalue"), m = !1, u = {}, g = function () {
        var e = function (e) {
            return !(!e || !e.data) && ("Y" != e.data.hide && "holdscreen" != e.data.msgType)
        }, n = function (n, i) {
            var r = $.Deferred(), o = null, c = a;
            i && (c = i);
            var m = function (t, l, i) {
                s.getMsg(l, n, i, e).then(function (e) {
                    var l = [];
                    e.forEach(function (e) {
                        $('[data-id="' + e.data.id + '"]').length || l.push(e)
                    }), t.resolve(l, n)
                }, function () {
                    t.resolve([], n), console.error(arguments)
                })
            };
            switch (n) {
                case"first":
                    o = function () {
                        var e = $.Deferred();
                        return l = [], n = "next", m(e, [], c), n = "prev", e.promise()
                    };
                    break;
                case"last":
                    o = function () {
                        var e = $.Deferred();
                        return l = [], n = "prev", m(e, [], c), n = "next", e.promise()
                    };
                    break;
                case"prev":
                    o = function () {
                        var l = $.Deferred(), i = t.slice(), r = [];
                        if (t.forEach(function (e) {
                                $('[data-id="' + e.data.id + '"]').length || r.push(e)
                            }), r.length) {
                            var o = c - r.length;
                            o > 0 ? s.getMsg(r, n, o, e).then(function (e) {
                                l.resolve(e.concat(r), n)
                            }, function () {
                                l.resolve([], n), console.error(arguments)
                            }) : m(l, r, c)
                        } else m(l, i, c);
                        return l.promise()
                    };
                    break;
                case"next":
                    o = function () {
                        var i = $.Deferred();
                        if (t.length && t[t.length - 1].next) {
                            var r = [];
                            if (r = l.slice(0, c), l = l.slice(c + 1, l.length), r.length < c) {
                                var o = c - r.length;
                                s.getMsg(t, n, o, e).then(function (e) {
                                    i.resolve(r.concat(e), n)
                                }, function () {
                                    i.resolve(r, n), console.error(arguments)
                                })
                            } else m(i, t, c)
                        } else l = [], m(i, t, c);
                        return i.promise()
                    };
                    break;
                default:
                    console.log("不存在的方向", n)
            }
            return o ? o().then(function (e) {
                e.length ? r.resolve(e, n) : r.reject()
            }, function () {
                r.reject("查询失败")
            }) : r.reject(), r.promise()
        };
        return {getData: n}
    }(), f = function () {
        this.wall = null, this.wallmsgConfig = null, this.qrcode = {}, this.btnPause = "run", this.loopNum = 0, this.tempCache = {}
    };
    f.prototype = {
        init: function () {
            var n = this, r = $.Deferred(), s = function () {
                new Hi.DbUtil(flag, e).count().then(function (e) {
                    $("#msgCount span").text(e)
                })
            }, g = function () {
                var e = n.wall;
                u = e.tempStyle ? JSON.parse(e.tempStyle) : null, o = a = u && u.msglength ? parseInt(u.msglength) : 3, i && (a = 1), u.msglength = o
            }, f = function () {
                var t = n.wall, l = "", i = $.extend(tempGlobal.defaults, tempGlobal[t.styleName ? t.styleName : "defaults"] || {});
                if (this.tempCache = i, g(t), n.qrcode.style = i.style, l = template("msgWallTemp", {
                        tempStyle: u,
                        style: n.qrcode.style,
                        qrcode: {
                            img: t.qrCode ? Hi.String.dealUrl(t.qrCode) : "/images/placeholder.png",
                            ruleDes: t.ruleDes ? $.base64.atob(t.ruleDes, !0) : "扫描二维码参与互动大屏幕",
                            qrText: t.qrText ? $.base64.atob(t.qrText, !0) : "扫描二维码参与互动大屏幕"
                        }
                    }), Hi.Activity.currentActivity == e) {
                    var r = Hi.Activity.g(Hi.Activity.currentActivity);
                    if (r) {
                        r.leave();
                        var o = $("#msg-wall-block ul.wall-list li"), a = $("#msg-wall-block ul.wall-single-list li"), s = [];
                        $("#msg-wall-block ul li").each(function (e, t) {
                            s.push($(t).data("data"))
                        }), $("#msg-wall-block").remove(), $("#wallCont").append(l), $("#msg-wall-block ul.wall-list").append(o), $("#msg-wall-block ul.wall-single-list").append(a), s.forEach(function (e) {
                            $('#msg-wall-block ul li[data-id="' + e.data.id + '"]').data("data", e)
                        }), r.in()
                    }
                } else $("#msg-wall-block").remove(), $("#wallCont").append(l)
            }, h = function () {
                var e = $.Deferred();
                return Hi.Message.init("msg").always(e.resolve), e.promise()
            }, d = function () {
                var e = $.Deferred(), t = function () {
                    var e = $.Deferred();
                    return Hi.Db.get("global", "wall").then(function (t) {
                        n.wall = t, g(), f(), e.resolve()
                    }, function () {
                        console.error("wall获取错误"), e.reject()
                    }), e.promise()
                }, l = function () {
                    var e = $.Deferred();
                    return Hi.Db.get("global", "wallmsgConfig").then(function (t) {
                        n.wallmsgConfig = t, e.resolve()
                    }, function () {
                        console.error("查询失败"), e.reject()
                    }), e.promise()
                };
                return t().then(l).always(e.resolve), e.promise()
            }, p = function () {
                var t = $.Deferred();
                return Hi.Note.r(Hi.Note.type.UPDATE_GLOBAL, function (e) {
                    "wall" == e.noteType ? (n.wall = e, f()) : "wallmsgConfig" == e.noteType && (n.wallmsgConfig = e, "msg" == Hi.Activity.currentActivity && ("Y" == e.showCount ? $("#msgCount,#msgCount::before").show() : $("#msgCount,#msgCount::before").hide(), Hi.Control.time(e.turnTime)))
                }), Hi.Note.r("newmsg", function () {
                    s()
                }), s(), Hi.Note.r("newmsg_" + e, function (e) {
                    m && (e.type = "newmsg", l.push(e))
                }), t.resolve(), t.promise()
            }, v = function () {
                var e = $.Deferred();
                return $.get("/pcwall/msg/template.htm", function (t) {
                    $("#allTemplate").append(t), e.resolve()
                }, "html"), e.promise()
            }, w = function () {
                var e = $.Deferred();
                try {
                    c.get("cursorMsgArr").then(function (e) {
                        e || (e = "[]");
                        var l = JSON.parse(e);
                        $.isArray(l) && (t = l)
                    }).always(e.resolve)
                } catch (t) {
                    e.resolve()
                }
                return e.promise()
            };
            return v().then(h).then(d).then(p).then(w).always(r.resolve), r.promise()
        }, in: function () {
            Hi.Control.bindEvent(), Hi.Control.show();
            var e = this, r = e.wallmsgConfig.turnTime;
            l = [], "Y" == e.wallmsgConfig.showCount ? $("#msgCount").show() : $("#msgCount").hide(), $("#msg-wall-block").show(), i ? ($("#msg-wall-block .wall-single-info").show(100), $(".wall-multiple-info").hide()) : ($("#msg-wall-block .wall-single-info").hide(100), $(".wall-multiple-info").show(), $(".wall-multiple-info").find(".wall-list").hide()), Hi.Control.time(r).fn = function (l) {
                var n = $.Deferred();
                return g.getData(l).then(e.htmlObj.bind(e)).then(e.toHtml).then(e.appendToHtml).then(e.animate).then(e.imgAnimate).then(e.saveData).then(function () {
                }, function () {
                    m && (e.loopNum = 0, m = !1), e.loopNum++, e.loopNum > 50 && (m = !0, t = [])
                }).always(function () {
                    setTimeout(n.resolve, 50)
                }), n.promise()
            }, $("#msg-wall-block ul li").length || Hi.Control.go(), Hi.Control.state(e.btnPause), $(".wall-list").delegate("li", "click.singleClick", function (l) {
                i = !0, a = 1, n = t.slice();
                var r = Hi.Control.state();
                "run" == r && Hi.Control.stop();
                var o = $(this), s = o.data("data");
                $("#msg-wall-block .wall-single-info").show(100), $("#msg-wall-block .grid-left,#msg-wall-block .grid-right").hide(), $("#msg-wall-block .wall-list").empty().hide(100), e.htmlObj([s], "next").then(e.toHtml).then(e.appendToHtml).then(e.animate).then(e.imgAnimate).then(e.saveData).then(function () {
                    e.loopNum = 0
                }, function () {
                    console.error(arguments)
                }).always(function () {
                    "run" == r && Hi.Control.start()
                })
            }), $(".wall-single-list").delegate(".sing-info-close", "click.singleClose", function () {
                i = !1, a = o;
                var l = Hi.Control.state();
                "run" == l && Hi.Control.stop();
                var r = function () {
                    var e = $.Deferred();
                    if (Hi.Array.contains(n, t[0]))t = n.slice(), e.resolve(t, "next"); else {
                        var l = a - 1, i = function () {
                            var e = $.Deferred();
                            return g.getData("next", l).then(function (e) {
                                t = t.concat(e)
                            }).always(function () {
                                e.resolve()
                            }), e.promise()
                        }, r = function () {
                            var e = $.Deferred(), l = a - t.length;
                            return l > 0 ? g.getData("prev", l).then(function (e) {
                                t = e.concat(t)
                            }).always(function () {
                                e.resolve()
                            }) : e.resolve(), e.promise()
                        };
                        i().then(r).always(function () {
                            e.resolve(t, "next")
                        })
                    }
                    return e.promise()
                };
                $("#msg-wall-block .wall-single-info").hide(100), $(".wall-multiple-info").show(), $("#msg-wall-block .grid-left,#msg-wall-block .grid-right,#msg-wall-block .wall-list").hide(), r().then(e.htmlObj.bind(e)).then(e.toHtml).then(e.appendToHtml).then(e.animate).then(e.imgAnimate).then(e.saveData).then(function () {
                    "run" == l && Hi.Control.start(), e.loopNum = 0
                }, function () {
                }).always(function () {
                    $("#msg-wall-block .wall-single-info ul").empty()
                })
            }), $(".wall-list").delegate("li img", "click.imgToBig", function (e) {
                e.stopPropagation();
                var t = this;
                if ("wechat-emoji" != $(this).attr("class")) {
                    var l = function () {
                        var e = $.Deferred(), l = t.src;
                        return layer.preview({
                            photos: {data: [{src: l}]},
                            limitArea: [$("body").width() - 100, $("body").height() - 100],
                            last: function () {
                                layer.closeAll(), e.resolve()
                            },
                            previewClose: function () {
                                e.resolve()
                            }
                        }), e.promise()
                    }, n = "run" == Hi.Control.state();
                    n && Hi.Control.state("paused"), l().then(function () {
                        n && Hi.Control.state("run")
                    })
                }
            })
        }, leave: function () {
            var e = this;
            e.btnPause = Hi.Control.state(), Hi.Control.stop(), Hi.Control.hide(), $("#msgCount,#msg-wall-block").hide(), Hi.Control.unbindEvent(), $(".wall-list").undelegate(".singleClick"), $(".wall-single-list").undelegate(".singleClose"), $(".wall-list").undelegate(".imgToBig"), clearTimeout(e.timerImg), layer.closeAll()
        }, htmlObj: function (e, t) {
            var l = $.Deferred();
            if (!e.length)return l.reject(), l.promise();
            var n = this, r = {_this: n, dataArr: e, drt: t, htmlObj: $(".wall-list")};
            return i && (r.htmlObj = $(".wall-single-list")), l.resolve(r), l.promise()
        }, toHtml: function (e) {
            var t = $.Deferred(), l = e._this, n = e.dataArr, r = [], o = "", a = null;
            return i ? (a = n[0].data, "image" == a.msgType ? a.text = '<div class="single-content-img"><img src=' + Hi.String.dealUrl(a.content) + " /></div>" : a.text = a.content, Hi.Wall.data.showFullName && (a.nickName = a.noteName || a.fullName || a.nickName), a.imgPath || (a.imgPath = "/images/wall/unname.jpg"), o = template("msgSingleItem", a)) : n.forEach(function (e, t) {
                a = e.data, Hi.Wall.data.showFullName && (a.nickName = a.noteName || a.fullName || a.nickName), a.imgPath = Hi.String.dealUrl(a.imgPath), "image" == a.msgType ? a.text = '<img width="80" height="80" src=' + Hi.String.dealUrl(a.content) + " />" : ("grid-top" == l.qrcode.style ? a.content.length < 10 ? r[t] = 1 : a.content.length < 36 ? r[t] = 2 : r[t] = 3 : a.content.length < 6 ? r[t] = 1 : a.content.length < 13 ? r[t] = 2 : r[t] = 3, a.clazz = "lineText-" + r[t], a.text = a.content), o += template("msgItemTemp", a)
            }), e.html = o, t.resolve(e), t.promise()
        }, appendToHtml: function (e) {
            var t = $.Deferred();
            return e.htmlObj["prev" == e.drt ? "prepend" : "append"](e.html), e.dataArr.forEach(function (e) {
                $('li[data-id="' + e.data.id + '"]').data("data", e)
            }), t.resolve(e), t.promise()
        }, animate: function (e) {
            var t = $.Deferred(), l = e.htmlObj.find("li").length - a;
            if (l < 1)return t.resolve(e), t.promise();
            var n = e.htmlObj.find("li").first(), r = n[0].offsetHeight, o = (n.height(), i ? "margin-left" : "margin-top"), s = 0;
            s = i ? e.htmlObj.find("li").width() : l * r, s = -s;
            var c = e.htmlObj.find("li").slice(0, l), m = {};
            return "prev" == e.drt ? (c.addClass("past"), m[o] = s + "px", e.htmlObj.css(m), m[o] = "0px", e.htmlObj.animate(m, 500, function () {
                c.removeClass("past"), e.htmlObj.find("li").slice("-" + l).remove(), t.resolve(e)
            })) : (m[o] = s + "px", c = e.htmlObj.find("li").slice("-" + l), c.addClass("future"), e.htmlObj.animate(m, 500, function () {
                c.removeClass("future"), m[o] = "0px", e.htmlObj.css(m), e.htmlObj.find("li").slice(0, l).remove(), t.resolve(e)
            })), t.promise()
        }, imgAnimate: function (e) {
            var t = $.Deferred(), l = e._this, n = [];
            if ($(".wall-list li .wall-continfo img").not('[class="wechat-emoji"]').each(function (e, t) {
                    var l = $(this).attr("src");
                    r[l] || (r[l] = "img", n.push({index: e, src: l}))
                }), !n.length || "Y" != l.wall.useMode)return t.resolve(e), t.promise();
            l.timerImg = 0;
            var i = layer.preview({
                photos: {data: n}, tab: function (e, t, n) {
                    clearTimeout(l.timerImg), l.timerImg = setTimeout(function () {
                        i && i.imgnext()
                    }, 3e3)
                }, limitArea: [$("body").width() - 100, $("body").height() - 100], last: function () {
                    layer.close(i.index), t.resolve(e)
                }, previewClose: function () {
                    layer.close(i.index), clearTimeout(l.timerImg), t.resolve(e)
                }
            });
            return t.promise()
        }, saveData: function (e) {
            var l = $.Deferred(), n = (e._this, []);
            return e.htmlObj.find("li").each(function (e, t) {
                $(this).data("data").type || n.push($(this).data("data"))
            }), 0 != n.length && (t = n), l.resolve(), l.promise()
        }
    }, window.onbeforeunload = function () {
        g.getData("prev").always(function (e) {
            e || (e = []), c.update("cursorMsgArr", JSON.stringify(e))
        })
    }, Hi.Activity.r(e, new f)
}(jQuery);
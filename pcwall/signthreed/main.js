!function () {
    function t(t, n) {
        var e = n - t, a = Math.random(), o = t + Math.floor(a * e);
        return o
    }

    var n = {stageObj: $(".wall3d ul"), shape: "Cube", isImg: !0};
    n.Utils = function () {
        var t = window.innerWidth, e = window.innerHeight, a = [], o = 0, i = function () {
            if (a.length && !(o > 2)) {
                ++o;
                var t = a.shift(), n = t.item, e = t.url, r = new Image;
                r.onload = function () {
                    n.append(r), $(r).fadeIn(), --o, setTimeout(i, 100)
                }, r.onerror = function () {
                    --o, setTimeout(i, 150)
                }, r.src = e, setTimeout(i, 150)
            }
        };
        return {
            width: t, height: e, aTr: function (t) {
                return Math.PI / 180 * t
            }, in: function () {
                var t = $.Deferred(), e = n.stageObj.find("li");
                return e.length ? (n.Stage.stop(), e.snabbt({
                    position: [-3e3, 0, -700],
                    duration: 0,
                    allDone: t.resolve
                })) : t.resolve(), t.promise()
            }, leave: function () {
                var t = $.Deferred(), e = n.stageObj.find("li");
                return e.length ? (n.Stage.stop(), e.snabbt({
                    position: [3e3, 0, -700],
                    duration: 500,
                    delay: function (t, n) {
                        return 1e3 * Math.random()
                    },
                    allDone: t.resolve
                })) : t.resolve(), t.promise()
            }, loadImg: function (t) {
                a.push(t), i()
            }
        }
    }();
    var e = n.Utils.aTr;
    n.Card = function () {
        var t = -1, e = [], a = function () {
            var t = $('<li class="card"></li>'), a = 335 * Math.random() | 0;
            n.isImg && n.Utils.loadImg({
                item: t,
                url: "/images/signthreed/" + a + ".jpg?v=1"
            }), e.push(t), n.stageObj.append(t)
        };
        return {
            count: function () {
                return e.length
            }, init: function (t) {
                var n = t - e.length;
                if (n > 0)for (var o = 0; o < n; o++)a()
            }, reset: function () {
                t = -1, $("li.card").removeClass("activate")
            }, next: function () {
                if (++t, e[t])return e[t]
            }
        }
    }(), n.Wall = function () {
        for (var t = [], e = h = 50 * Math.sqrt(2), a = n.Utils.height / h | 0, o = n.Utils.width / e | 0, i = 0; i < a; i++)for (var r = 0; r < o; r++) {
            var s = (o - 1) / 2 - r, l = (a - 1) / 2 - i;
            t.push({position: [s * e, l * h, 0], rotation: [0, 0, Math.PI / 4]})
        }
        return {
            card: {count: t.length, allCard: t, perspective: 3500}, stage: function (t) {
                n.stageObj.snabbt({position: [0, 0, 0], rotation: [0, 0, 0], duration: 0});
                var e = function () {
                };
                return setTimeout(t, 1e4), e
            }
        }
    }(), n.Sphere = function () {
        for (var t = [], n = 380, a = 16, o = 30, i = {}, r = a / 2 | 0, s = 0; s < a; s++) {
            var l = (Math.sin(Math.PI / (a - 1) * s) * o | 0) + 1;
            i[s] = l
        }
        return Object.keys(i).forEach(function (o) {
            for (var s = r - o, l = i[o], u = 0; u < l; u++) {
                var c = 180 / a * s, d = 360 / l * u;
                1 == l && (c = c > 0 ? 90 : -90);
                var f = o * e(180 / (a - 1)), h = u * e(360 / l), g = n * Math.sin(f) * Math.cos(h), p = n * Math.sin(f) * Math.sin(h), v = .9 * n * Math.cos(f);
                t.push({rotation: [-e(c), -e(d), 0], position: [p, -v, g]})
            }
        }), {card: {count: t.length, allCard: t, perspective: 2e3}, stage: {position: [0, 0, 0], duration: 4e4}}
    }(), n.Wall2 = function () {
        for (var t = [], e = h = 55 * Math.sqrt(2), a = 17, o = 20, i = 0; i < a; i++)for (var r = 0; r < o; r++) {
            var s = (o - 1) / 2 - r, l = (a - 1) / 2 - i, u = 0;
            i % 2 == 0 && (u = h / 2), t.push({position: [s * e + u, l * h / 2, 0], rotation: [0, 0, Math.PI / 4]})
        }
        return {
            card: {count: t.length, allCard: t, perspective: 3500}, stage: function (t) {
                n.stageObj.snabbt({position: [0, 0, -200], rotation: [0, 0, 0], duration: 0});
                var e = function () {
                };
                return setTimeout(t, 1e4), e
            }
        }
    }(), n.Cylinder = function () {
        for (var t = [], n = 500, a = 500, o = 7, i = 45, r = a / o | 0, s = o / 2 | 0, l = 0; l < o; l++)for (var u = 360 / i, c = 0; c < i; c++) {
            var d = 0, f = 0, h = 0, g = 0;
            d = n * Math.sin(e(c * u)), f = (l - s) * r, h = n * Math.cos(e(c * u)), g = c * u, t.push({
                position: [d, f, h],
                rotation: [0, -e(g), 0]
            })
        }
        return {card: {count: t.length, allCard: t, perspective: 3500}, stage: {position: [0, 0, 0], duration: 2e4}}
    }(), n.Cube = function () {
        for (var t = [], n = h = d = 100, e = 5, a = 9, o = 8, i = 0; i < o; i++)for (var r = 0; r < e; r++)for (var s = 0; s < a; s++) {
            var l = (a - 1) / 2 - s, u = (e - 1) / 2 - r, c = (o - 1) / 2 - i;
            t.push({position: [l * n, u * h, c * d], rotation: [0, 0, 0]})
        }
        return {card: {count: t.length, allCard: t, perspective: 3500}, stage: {position: [0, 0, 0], duration: 2e4}}
    }(), n.Cube2 = function () {
        for (var t = [], e = 9, a = 57, o = (length / 2, []), i = [], r = [], s = 0; s < e; s++)for (var l = 0; l < e; l++) {
            var u = (e - 1) / 2, c = (u - s) * a, d = (u - l) * a, f = u * a + a / 2;
            o.push({position: [c, d, f], rotation: [0, 0, 0]}), o.push({
                position: [c, d, -f],
                rotation: [Math.PI, 0, 0]
            }), i.push({position: [-f, c, d], rotation: [0, Math.PI / 2, 0]}), i.push({
                position: [f, c, d],
                rotation: [0, -Math.PI / 2 * 3, Math.PI]
            }), r.push({position: [d, -f, c], rotation: [Math.PI / 2 * 3, 0, 0]}), r.push({
                position: [d, f, c],
                rotation: [Math.PI / 2, 0, 0]
            })
        }
        return t = o.concat(i, r), {
            card: {count: t.length, allCard: t, perspective: 3500}, stage: function (t) {
                var e = function () {
                    n.Stage.snabbt({
                        fromRotation: [0, 0, 0],
                        rotation: [2 * Math.PI, 2 * Math.PI, 0],
                        duration: 2e4,
                        complete: function () {
                            t && t()
                        }
                    })
                };
                return e
            }
        }
    }(), n.Screw = function () {
        for (var t = [], a = 300, o = 7, i = 25, r = n.Utils.width / o / i, s = 360 / i, l = 0; l < o; l++)for (var u = o / 2 | 0, c = 0; c < i; c++) {
            var d = i / 2 | 0, f = e(s * c), h = (l - u) * i * r + (c - d) * r, g = a * Math.sin(f), p = a * Math.cos(f), v = f, m = 0, b = 0;
            t.push({position: [h, g, p], rotation: [v, m, b], skew: [0, e(6)]})
        }
        return {
            card: {count: t.length, allCard: t, perspective: 3500}, stage: function (t) {
                var e = function () {
                    n.Stage.snabbt({
                        fromRotation: [0, 0, 0],
                        rotation: [2 * Math.PI, 0, 0],
                        duration: 2e4,
                        complete: function () {
                            e()
                        }
                    })
                };
                return setTimeout(t, 3e4), e
            }
        }
    }(), n.Stage = function () {
        var t = {
            fromRotation: [0, 0, 0], rotation: [0, 2 * Math.PI, 0], duration: 35e3, complete: function () {
                e()
            }
        }, e = function () {
            n.Stage.stop(), n.Stage.snabbt(t)
        };
        return {
            default: function (a, o) {
                a.transformOrigin || (a.transformOrigin = [0, 0, 0]), a.duration || (a.duration = 35e3), Object.keys(a).forEach(function (n) {
                    t[n] = a[n]
                }), t.complete = o, n.Stage.snabbt({position: [0, 0, 0], duration: 400, complete: e})
            }, snabbt: n.stageObj.snabbt.bind(n.stageObj), stop: function () {
                n.stageObj.snabbt("stop")
            }, reset: function (t) {
                n.stageObj.css("transform", "")
            }
        }
    }(), n.Build = function () {
        var t = n[n.shape];
        if (t) {
            var e = t.stage, a = t.card, o = function () {
            };
            if (e && "function" == typeof e ? o = e(n.Control.next) : n.Stage.default(e, n.Control.next), a) {
                n.Card.reset();
                for (var i = 0, r = 0; r < a.count; r++) {
                    var s = n.Card.next();
                    if (s) {
                        s.addClass("activate");
                        var l = a.allCard[r];
                        Object.keys(l).forEach(function (t) {
                            s.data("data-" + t, l[t])
                        });
                        var u = {
                            rotation: l.rotation,
                            position: l.position,
                            delay: 1e3 * Math.random(),
                            complete: function () {
                                ++i, i == a.count && o()
                            }
                        };
                        l.skew || (l.skew = [0, 0]), u.skew = l.skew, s.snabbt(u)
                    }
                }
            }
        }
    }, n.Control = function () {
        var t = function () {
            var t = n.shape;
            if (!t)return void n.changeMode();
            var e = [];
            Object.keys(n).forEach(function (t) {
                n[t].card && e.push(t)
            }), e.length && (e.push(e[0]), n.changeMode(e[e.indexOf(n.shape) + 1]))
        };
        return {next: t}
    }(), n.changeMode = function (t) {
        t || (t = "Wall"), n.shape != t && n.Utils.leave().then(function () {
            n.stageObj.removeClass(n.shape.toLowerCase()), n.shape = t, n.stageObj.addClass(n.shape.toLowerCase());
            var e = n[n.shape];
            n.Card.init(e.card.count), n.Utils.in().then(function () {
                n.Build()
            })
        })
    };
    var a = function () {
        this.modeName = "sign", this.onWallSignIn = [], this.wallsignthreedConfig = null, this.dbUtil = new Hi.DbUtil(flag, "sign"), this.modeChangeControl = null
    };
    a.prototype.init = function () {
        var t = $.Deferred(), e = this, a = function () {
            var t = $.Deferred(), n = function () {
                var t = $.Deferred();
                return Hi.Message.init("sign").always(t.resolve), t.promise()
            }, a = function () {
                var t = $.Deferred();
                return $.indexedDB(flag).objectStore(e.modeName, "readonly").each(function (t) {
                    var n = t.value.data;
                    Hi.Wall.data.signUsers[n.id] = n
                }).done(t.resolve), t.promise()
            };
            return n().then(a).always(t.resolve), t.promise()
        }, o = function () {
            var t = $.Deferred();
            return Hi.Db.get("global", "wallsignthreedConfig").then(function (n) {
                e.wallsignthreedConfig = n, t.resolve()
            }, function () {
                console.error("查询失败"), t.reject()
            }), t.promise()
        }, i = function () {
            var t = $.Deferred();
            return Hi.Note.r(Hi.Note.type.UPDATE_GLOBAL, function (t) {
                "wallsignthreedConfig" == t.noteType && (e.wallsignthreedConfig.virtualHeadimg != t.virtualHeadimg && (n.isImg = "Y" == e.wallsignthreedConfig.virtualHeadimg), e.wallsignthreedConfig = t)
            }), t.resolve(), t.promise()
        };
        return a().then(o).then(i).then(function () {
            "Y" == e.wallsignthreedConfig.virtualHeadimg ? n.isImg = !0 : n.isImg = !1
        }).always(t.resolve), t.promise()
    }, a.prototype.in = function () {
        n.changeMode();
        var t = this;
        $("#wallcontrol .fr").hide(), $("#play-handle").show().css("opacity", "0");
        var e = $("#qrCode").attr("src");
        if (e && "/images/placeholder.png" != e) {
            var a = $("#signthreed-wall-block .qrcodebox");
            a.html('<img src="' + e + '">'), a.css("opacity", "0.8"), $("#signthreed-wall-block .qrcodebox").bind("click", function () {
                $(document).trigger({type: "keyup", which: 77, originalEvent: KeyboardEvent})
            })
        }
        $("#signthreed-wall-block").show(), Hi.Control.bindEvent(), Hi.Control.time(4).fn = function () {
            var n = $.Deferred();
            return t.nextPage(function () {
                n.resolve()
            }), n.promise()
        }, Hi.Control.go()
    }, a.prototype.leave = function () {
        Hi.Control.stop(), n.Stage.stop(), Hi.Control.unbindEvent(), $("#signthreed-wall-block").hide(), $("#play-handle").css("opacity", "1").hide(), $("#play-handle a").css("pointer-events", "auto"), $("#signthreed-wall-block .qrcodebox img").remove()
    }, a.prototype.nextPage = function (t) {
        t || (t = function () {
        });
        var n = this;
        n.dbUtil.getMsg(n.onWallSignIn, "next", 1).then(function (e) {
            if (e.length) {
                var a = e[0];
                n.animation(a.data, function () {
                    n.onWallSignIn.push(a), t && t()
                })
            }
        }, function () {
            console.log("fail")
        }).always(t)
    }, a.prototype.animation = function (n, e) {
        if (!n)return e && e(), !1;
        var a = n.id, o = Hi.Wall.getSignUserName(a, n.nickName), i = "/images/wall/unname.jpg";
        n.imgPath && (i = Hi.String.dealUrl(n.imgPath));
        var r = [[-800, 400, 3e3], [800, -400, 3e3], [-800, -400, 3e3], [-800, 400, 3e3]], s = "signthreed" + (new Date).getTime(), l = '<div id="' + s + '" class="new-sign"><img src="' + i + '"></a><p class="nickname">' + o + "</p></div>";
        $("#signthreed-wall-block").append(l), $("#" + s).snabbt({
            fromPosition: r[t(0, r.length - 1)],
            fromRotation: [0, 2 * Math.PI, 0],
            fromScale: [2, 2],
            posotion: [0, 0, 2e3],
            scale: [1, 1],
            rotation: [0, 0, 0],
            duration: 2500,
            easing: "easeOut",
            complete: function () {
                $("#" + s + " p").snabbt({
                    fromOpacity: 1,
                    opacity: 0,
                    delay: 500,
                    duration: 200,
                    scale: [0, 0],
                    easing: "ease"
                });
                var n = $(".wall3d li.activate").filter(function (t, n) {
                    return "Y" != $(n).attr("data-padding")
                }), a = n.length, o = t(0, a), r = n.eq(o), l = '<img src="' + i + '">';
                $("#" + s + " img").snabbt({
                    position: r.data().dataPosition,
                    rotation: r.data().dataRotation,
                    duration: 600,
                    scale: [.25, .25],
                    easing: "easeIn",
                    delay: 500,
                    complete: function () {
                        $("#" + s).remove(), r.html(l).attr("data-padding", "Y"), e && e()
                    }
                })
            }
        })
    }, Hi.Activity.r("signthreed", new a)
}(jQuery);
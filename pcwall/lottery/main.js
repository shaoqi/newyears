!function (t) {
    function e(t) {
        this.playIndet = 0, this.playDom = t.find("ul"), this.playLg = this.playDom.find("li").length, this.playHg = this.playDom.find("li").outerHeight(), this.control = null, this.inter = 80
    }

    function i() {
        var e = t(".lottery-box .lottery-limt").size();
        e < 4 ? (t(".lottery-limt").removeClass("lottery-smallimg"), t(".lottery-limt").addClass("lottery-bigimg")) : (t(".lottery-limt").removeClass("lottery-bigimg"), t(".lottery-limt").addClass("lottery-smallimg"))
    }

    function l(t) {
        var e = t.imgpath ? Hi.String.dealUrl(t.imgpath) : o, i = t.nickName, l = template("winHeadTemp", {
            id: t.id,
            imgsrc: e,
            nickName: i
        });
        return l
    }

    function r(e) {
        if (e) {
            var i = [];
            "array" === t.type(e) ? i = e : i.push(e);
            var r = "";
            [].slice.call(i).forEach(function (e) {
                e && !t('.lottery-limt[data-id="' + e.id + '"]').length && (r += l(e))
            }), t(".lottery-box").prepend(r)
        }
    }

    var n = [2, 515068].indexOf(wallJson.userId) !== -1, o = "/images/wall/unknow.png";
    n && (o = "/images/lottery/dz.png"), document.documentElement.style.overflow = "hidden", Hi.Push.r("waitLotterCount", function (t) {
        if (!t) {
            var t = {system: {cmd: "waitLotterCount"}, data: {}};
            Hi.Push.s(t)
        }
    }), Hi.Push.r("wallLotteryStartEvent", function (e) {
        if (t("#luck-draw").hasClass("luck-wait") && !(t(".prizeIn").length > 0)) {
            var i = Hi.Activity.g("lottery");
            i.active || i.startLottery(), i.active = !1
        }
    }), Hi.Push.r("wallLotteryStopEvent", function (e) {
        if (t("#luck-draw").hasClass("luck-over") && !(t(".prizeIn").length > 0)) {
            var i = Hi.Activity.g("lottery");
            i.active || i.stopLottery(), i.active = !1
        }
    }), Hi.Push.r("wallLotteryDelete", function (t) {
        var e = Hi.Activity.g("lottery");
        e.resetWinUserList()
    }), Hi.Push.r("wallLotteryFadeOutEvent", function (e) {
        t(".prizeIn-mask:visible").click(), t(".prizeIn .ribbon:visible").click()
    }), Hi.Push.r("mcToggleLotteryStart", function (e) {
        t("#luck-draw").hasClass("luck-wait") && 0 === t(".prizeIn").length && t("#luck-draw").click()
    }), Hi.Push.r("mcToggleLotteryStop", function (e) {
        t("#luck-draw").hasClass("luck-over") && 0 === t(".prizeIn").length && t("#luck-draw").click()
    }), Hi.Push.r("mcToggleLotteryCollapseAvatar", function (e) {
        t(".prizeIn-mask,#ribbonAni").click()
    });
    var a = function (e) {
        t(document).bind("keyup.space", function (i) {
            t(".prizeIn-mask").length > 0 ? t(".prizeIn-mask").click() : t(".prizeIn").length > 0 || e.lotterEvent()
        }), t(document).bind("keyup.up", function (e) {
            t("#prevGame").click()
        }), t(document).bind("keyup.down", function (e) {
            t("#nextGame").click()
        })
    }, s = function () {
        t(document).unbind("keyup.space"), t(document).unbind("keyup.up"), t(document).unbind("keyup.down")
    }, c = function () {
        this.wall = null, this.currentLotterAwards = null, this.toDrawCountContral = null, this.playPrizesContral = null, this.winUserList = [], this.walllotteryConfig = null, this.realCount = null, this.active = !1
    };
    c.prototype.init = function () {
        console.log('init');
        var i = t.Deferred(), l = this;
        Hi.Note.r(Hi.Note.type.UPDATE_GLOBAL, function (t) {
            "walllotteryConfig" == t.noteType && (l.refresh(t), l.changeBgOpacity()), "wall" == t.noteType && (l.wall = t)
        });
        var r = function () {
            l.toDrawCount()
        };
        Hi.Note.r(Hi.Note.type.UPDATE_WALL_SIGNIN_USER, r);
        var a = function () {
            var e = t.Deferred(), i = function () {
                var e = t.Deferred();
                return Hi.Db.get("global", "walllotteryConfig").then(function (t) {
                    l.walllotteryConfig = t, e.resolve()
                }, function () {
                    console.error("查询失败")
                }), e.promise()
            }, r = function () {
                var e = t.Deferred();
                return Hi.Db.get("global", "wall").then(function (t) {
                    l.wall = t, e.resolve()
                }, function () {
                    console.error("查询失败")
                }), e.promise()
            };
            return i().then(r).always(e.resolve), e.promise()
        }, s = function () {
            var e = t.Deferred();
            return t.get("/pcwall/lottery/template.htm", function (i) {
                t("#allTemplate").append(i), t('[data-modle="wall-modle-cont"]').append(template("lotteryTemp", {
                    dzFlag: n,
                    unknowImg: o
                })), e.resolve()
            }, "html"), e.promise()
        }, c = function () {
            var i = t.Deferred();
            return l.playPrizesContral = new e(t(".drawbox .unknow")), t(".lottery-poper").delegate(".lottery-remove", "click", function () {
                var e = this;
                layer.confirm("请确认是否删除？", {btn: ["确定", "取消"], shade: [.1, "#fff"]}, function () {
                    var i = t(e).parents(".lottery-limt").first().attr("data-id");
                    l.deleteLuckDraw(i)
                }, function () {
                })
            }), i.resolve(), i.promise()
        };
        return s().then(a).then(c).always(i.resolve), i.promise()
    }, c.prototype.in = function () {
        console.log('init2');
        var e = this;
        Hi.Db.get("global", "walllotteryConfig").then(function (t) {
            e.walllotteryConfig = t, e.refresh(t)
        }, function () {
            console.error("查询失败")
        }), e.toDrawCount(), e.toDrawCountContral = setInterval(function () {
            e.toDrawCount()
        }, 5e3), t("#luck-draw").click(function () {
            e.lotterEvent()
        }), t("#lottery-wall-block").show(), a(e), t("#play-handle").hide(), t("#game-control-switch").css("display", "inline"), t("#prevGame").bind("click", function () {
            Hi.Dc.query({
                where: {
                    flag: flag,
                    type: "up"
                }
            }).post("/web/walllotteryWin/lotterySwitch.html", function (t, e) {
                t && layer.msg(e.systemContent.msg)
            })
        }), t("#nextGame").bind("click", function () {
            Hi.Dc.query({
                where: {
                    flag: flag,
                    type: "down"
                }
            }).post("/web/walllotteryWin/lotterySwitch.html", function (t, e) {
                t && layer.msg(e.systemContent.msg)
            })
        }), Hi.Db.get("global", "wall").then(function (t) {
            e.wall = t, e.changeBgOpacity()
        }, function () {
            console.error("查询失败")
        })
    }, c.prototype.leave = function () {
        console.log('leave');
        clearInterval(this.toDrawCountContral), t("#lottery-wall-block").hide(), t("#luck-draw").unbind("click"), s(), t("#wallcontrol .fr").hide(), t("#prevGame").unbind("click"), t("#nextGame").unbind("click")
    }, c.prototype.changeBgOpacity = function () {
        var e = this, i = 4, l = JSON.parse(e.wall.tempStyle);
        l.msgOpacity && 1 < l.msgOpacity && l.msgOpacity < 6 && (i = parseInt(l.msgOpacity));
        var r = t("#lottery-wall-block"), n = r[0].className;
        if (n.indexOf("msg-opacity") > 0) {
            var o = n.replace(/msg-opacity\d+/g, "msg-opacity" + i);
            r[0].className = o
        } else r.addClass("msg-opacity" + i)
    }, c.prototype.refresh = function (e) {
        console.log('refresh');
        t("#luck-draw").hasClass("luck-over") && t("#luck-draw").click(), t(".prizeIn-mask").length > 0 && t(".prizeIn-mask,.prizeIn").remove();
        var i = this;
        if (e && e.walllotteryAwardsList && e.lotteryId) {
            i.walllotteryConfig = e;
            var l = e.walllotteryAwardsList;
            for (var r in l) {
                var n = l[r];
                if (n.id == e.lotteryId) {
                    i.currentLotterAwards = n, t(".luck-presz .imgbox").css("background-image", "url(" + n.prizeImg + ")");
                    var o = '<div class="prize-option" title="' + n.awardName + '">' + n.awardName + '</div><div class="prize-product" title="' + n.prizeName + '">' + n.prizeName + "</div>";
                    t(".luck-presz .luck-torryname").html(o);
                    break
                }
            }
            i.resetWinUserList()
        }
    }, c.prototype.lotterEvent = function (e) {
        console.log('lotterEvent');
        Hi.Wall.checkState();
        var i = this;
        i.active = !0;
        var l = t("#luck-draw");
        l.hasClass("luck-wait") ? i.startLottery(function () {
            Hi.Push.s({system: {cmd: "globalNote", secondCmd: "wallLotteryStartEvent"}, data: {}})
        }) : l.hasClass("luck-over") && (i.stopLottery(e), Hi.Push.s({
            system: {
                cmd: "globalNote",
                secondCmd: "wallLotteryStopEvent"
            }, data: {}
        }))
    }, c.prototype.startLottery = function (e) {
        console.log('startLottery');
        var i = this, l = t("#luck-draw"), r = function () {
            Hi.Wall.unBindControl(), i.resetRollLuck(), l.removeClass("luck-wait").addClass("luck-ing").html("正在抽奖..."), i.rollLuckUser(function () {
                i.winUserList = [], Hi.Dc.query({
                    where: {
                        flag: flag,
                        type: "down",
                    }
                }).post(i.active ? "api.php?a=cmd&m=remain&c=lottery" : "api.php?a=cmd&m=remain&c=winers", function (r, n, o) {
                    if (l.removeClass("luck-ing").addClass("luck-over").html("停止"), "Right" == o.state && null != n && n.length > 0) {
                        for (var a = [], s = 0; s < n.length; s++) {
                            var c = n[s];
                            0 === t(".lottery-box").find('div[data-id="' + c.id + '"]').length && a.push(c)
                        }
                        i.winUserList = a
                    } else layer.msg(o.msg, {time: 2e3}), i.lotterEvent({auto: !0});
                    e && e()
                })
            })
        };
        if (!i.active)return void r();
        var n = parseInt(t(".latter-totalnum span").html());
        return isNaN(n) || n < 1 ? (t(".drawbox .unknow ul li:last").show().siblings().hide(), void layer.msg("待抽奖人数为0，不能进行抽奖!", {time: 2e3})) : i.winUserList.length >= i.currentLotterAwards.prizeNum ? void layer.msg("该奖项已抽满!", {time: 2e3}) : void r();
    },

        c.prototype.stopLottery = function (e) {
            console.log('stopLottery');
        var i = this, l = t("#luck-draw");
        if (Hi.Wall.bindControl(), l.removeClass("luck-over").addClass("luck-wait").html("开始抽奖"), i.toDrawCount(), i.playPrizesContral.stop(), i.resetRollLuck(), !i.winUserList || !i.winUserList.length)return void(e && e.auto || layer.msg("没有抽中任何人!", {time: 2e3}));
        var r = '<li><img src="${imgpath}"></li>', n = t(".drawbox .unknow ul"), a = "";
        n.empty(), i.winUserList.sort(function (t, e) {
            return e.winId - t.winId
        });
        for (var s in i.winUserList) {
            console.log(i.winUserList[s]);
            var c = i.winUserList[s], u = c && c.imgpath ? Hi.String.dealUrl(c.imgpath) : o;
            a.indexOf(u) == -1 && (a += r.replace("${imgpath}", u))
        }
        a += r.replace("${imgpath}", o), n.append(a), "Y" == i.walllotteryConfig.flash ? i.animation(i.winUserList, function () {
        }) : i.showInwall(i.winUserList)
    }, c.prototype.resetWinUserList = function (e) {
        console.log('resetWinUserList');
        var l = this;
        Hi.Dc.query({
            where: {flag: flag, awardsId: this.walllotteryConfig.lotteryId},
            sort: {id: "desc"}
            // 读取已经中奖人的数量
        }).post("api.php?a=cmd&m=remain&c=awards", function (n, o, a) {
            if ("Right" == a.state) {
                t(".lottery-box").empty();
                var s = o;
                l.winUserList = s, r(l.winUserList), i()
            }
            e && e()
        })
    }, c.prototype.toDrawCount = function (e) {
        console.log('toDrawCount');
        if (console.log("待抽奖人数更新"), t("#luck-draw").hasClass("luck-wait")) {
            var i = this;
            Hi.Dc.query({
                where: {
                    flag: flag,
                    noUsers: "Y"
                }
            }).post("/api.php?a=cmd&m=remain&c=count", function (l, r, n) {
                if (!l && "Right" == n.state) {
                    var o = r.notWinNum;
                    i.realCount = o, t(".latter-totalnum span").html(o), e && e()
                }
            })
        }
    }, c.prototype.deleteLuckDraw = function (e) {
        console.log('deleteLuckDraw');
        var i = this;
        Hi.Dc.query({
            where: {
                flag: flag,
                wxUserId: e,
                awardsId: i.walllotteryConfig.lotteryId
            }
        }).post("/api.php?a=cmd&m=remain&c=remove", function (i, l, r) {
            "Right" == r.state ? 0 === l.resultCount ? layer.msg("已确认，禁止删除！", {time: 2e3}) : (Hi.Push.s({
                system: {
                    cmd: "globalNote",
                    secondCmd: "wallLotteryDelete"
                }, data: {}
            }), t('.lottery-poper .lottery-limt[data-id="' + e + '"]').remove(), layer.msg("删除成功", {time: 2e3})) : layer.msg("删除失败", {time: 2e3})
        })
    }, c.prototype.getLotteryHeadImg = function (t) {
        console.log('getLotteryHeadImg');
        var e = this;
        !e.lotteryHeadImg || e.lotteryHeadImg.length < 200 ? Hi.Dc.query().page(1, 200).post("api.php?a=cmd&m=img", function (i, l) {
            return i ? void console.error("错误", i) : (e.lotteryHeadImg = l.dataList, void t(e.lotteryHeadImg))
        }) : t(e.lotteryHeadImg)
    }, c.prototype.rollLuckUser = function (e) {
        console.log('rollLuckUser');
        e || (e = function () {
        });
        var i = this, l = '<li><img src="${imgpath}"></li>', r = t(".drawbox .unknow ul");
        this.getLotteryHeadImg(function (n) {
            var a = "";
            r.empty();
            for (var s = 0; s < n.length; s++) {
                var c = n[s];
                c = c ? Hi.String.dealUrl(c) : o, t('.lottery-box .lottery-avatar[src="' + c + '"]').length || null == c && a.indexOf(o) != -1 || a.indexOf(c) == -1 && (a += l.replace("${imgpath}", c))
            }
            a || (a += l.replace("${imgpath}", o)), r.append(a), i.playPrizesContral.init(), i.playPrizesContral.start(), e()
        })
    }, c.prototype.resetRollLuck = function () {
        console.log('resetRollLuck');
        var e = this;
        e.playPrizesContral.stop();
        var i = t(".drawbox .unknow ul");
        i.empty(), i.append('<li><img src="' + o + '"></li>')
    }, c.prototype.removeRollLuck = function (e) {
        t(".drawbox .unknow ul li").each(function () {
            var i = t(this).find("img").attr("src");
            i == e && t(this).remove()
        })
    }, e.prototype = {
        start: function () {
            var t = this;
            clearInterval(this.control), this.control = setInterval(function () {
                t.autoplay()
            }, this.inter)
        }, init: function () {
            this.playDom.find("li").hide().eq(0).show()
        }, autoplay: function () {
            this.playLg = this.playDom.find("li").length, this.playIndet++, this.playIndet >= this.playLg && (this.playIndet = 0), this.playAnimate()
        }, playAnimate: function () {
            this.playDom.find("li").hide().eq(this.playIndet).show()
        }, stop: function () {
            clearInterval(this.control), this.playDom.find("li").hide().eq(0).show()
        }
    }, c.prototype.showInwall = function (e, l) {
        console.log('showInwall');
        var n = this;
        if ("undefined" == typeof e || 0 == e.length)return n.playPrizesContral.stop(), t("#luck-draw").removeClass("lotter-over").addClass("lotter-wait").text("开始抽奖"), n.resetRollLuck(), void(l && l());
        var o = e.pop();
        r(o), i(), n.showInwall(e, l)
    }, c.prototype.animation = function (e, l) {
        var n = this;
        if (!e || !e.length)return n.playPrizesContral.stop(), t("#luck-draw").removeClass("lotter-over").addClass("lotter-wait").text("开始抽奖"), n.resetRollLuck(), void l();
        var a = e.pop(), s = o;
        a.imgpath && (s = Hi.String.dealUrl(a.imgpath), n.removeRollLuck(s));
        var c = a.nickName, u = template("winAniTemp", {imgsrc: s, nickName: c});
        t("body").append(u).prepend('<div class="prizeIn-mask"></div>');
        var p = t(".unknow").offset(), d = t("#winnerAni .tou").offset(), m = p.left - d.left, y = p.top - d.top, f = document.getElementById("winnerAni"), h = document.getElementById("ribbonAni"), g = document.getElementById("raysAni"), w = document.getElementById("winnerDom");
        snabbt.sequence([[f, {
            fromPosition: [m, y, 0],
            position: [0, 0, 0],
            formScale: [.5, .5],
            formScale: [1, 1],
            easing: "easeOut",
            duration: 500
        }], [h, {
            formOpacity: 0,
            opacity: 1,
            fromScale: [0, 0],
            scale: [1, 1],
            rotation: [Math.PI, 0, 0],
            easing: "easeIn",
            duration: 300
        }], [g, {formOpacity: 0, opacity: 1, fromScale: [0, 0], scale: [1, 1], easing: "ease", duration: 400}]]);
        var v = function (e) {
            var i, l, r = t(".lottery-avatar").first();
            r.width() ? r.width() : 216;
            "undefined" != typeof r && 0 != r.length ? (i = r.offset().left - d.left, l = r.offset().top - d.top) : (i = t(window).width / 2 - 60 - d.left, l = 160 - d.top), snabbt.sequence([[h, {
                opacity: 0,
                scale: [0, 0],
                rotation: [Math.PI, 0, 0],
                easing: "easeIn",
                duration: 200
            }], [g, {opacity: 0, scale: [0, 0], easing: "ease", duration: 100}], [w, {
                position: [i, l, 0],
                scale: [.3, .3],
                fromOpacity: 1,
                opacity: .1,
                easing: "easeIn",
                duration: 300,
                complete: function () {
                    e && e()
                }
            }]])
        }, k = !0;
        t(".prizeIn-mask,#ribbonAni").bind("click", function () {
            k && (k = !1, t(".prizeIn-mask").hide().remove(), Hi.Push.s({
                system: {
                    cmd: "globalNote",
                    secondCmd: "wallLotteryFadeOutEvent"
                }, data: {}
            }), v(function () {
                t("#winnerDom").remove(), k = !0, r(a), i(), n.animation(e, l)
            }))
        })
    };
    var u = new c;
    Hi.Activity.r("lottery", u)
}(jQuery);
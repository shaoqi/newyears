!function () {
    Hi.Push.r("wallShakeStart", function (e) {
        Hi.Note.n(Hi.Note.type.WALL_SHAKE_START, e)
    }), Hi.Push.r("mcToggleShakeStart", function (e) {
        var a = $("#shake-wall-block .shakewall").find(".pic img");
        a && a.length && a.attr("src").indexOf("/images/wall/preshake.png") != -1 && a.click()
    }), Hi.Push.r("mcToggleShakeNext", function (e) {
        var a = $(".next-btn img");
        a && a.length && a.is(":visible") && $(".next-btn img").click()
    }), Hi.Push.r("updateWallShakeRegedit", function (e) {
        var a = e.count;
        a && ($("#shakeRegeditNum").html(a), Hi.Activity.g("shake").regeditCount = a)
    });
    var e = ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十"], a = Hi.Dc.query({where: {flag: flag}}), t = function () {
        $(document).bind("keyup.space", function (e) {
            var a = $("#shake-wall-block .shakewall").find(".pic");
            a && a.length && a.is(":visible") && a.click();
            var t = $(".next-btn img");
            t && t.length && t.is(":visible") && $(".next-btn img").click()
        }), $(document).bind("keyup.up", function (e) {
            $("#prevGame").click()
        }), $(document).bind("keyup.down", function (e) {
            $("#nextGame").click()
        })
    }, i = function () {
        $(document).unbind("keyup.space"), $(document).unbind("keyup.up"), $(document).unbind("keyup.down")
    }, l = function () {
        this.wallshakeConfig = null, this.wallshakeRanking = [], this.updateDataContrl = null, this.timeCounter3Contrl = null, this.timeCounter60Contrl = null, this.countdown = 60, this.shakeId = 0, this.finishFlag = !1, this.maxShakeColum = {
            maxHeight: 350,
            maxNumber: 30
        }, this.active = !1, this.regeditCount = 0
    };
    l.prototype.init = function () {
        var e = $.Deferred(), a = this, t = function () {
            var e = $.Deferred();
            return Hi.Message.init("sign").always(e.resolve), e.promise()
        }, i = function () {
            var e = $.Deferred();
            return Hi.Db.get("global", "wallshakeConfig").then(function (t) {
                a.wallshakeConfig = t, t.wallshake && (a.countdown = t.wallshake.shakeTime), e.resolve()
            }, function () {
                e.resolve(), console.error("查询失败")
            }), e.promise()
        }, l = function () {
            var e = $.Deferred();
            return Hi.Note.r(Hi.Note.type.UPDATE_GLOBAL, function (e) {
                if ("wallshakeConfig" == e.noteType)try {
                    var t = !1;
                    a.wallshakeConfig.shakeId != e.shakeId && "shake" == Hi.Activity.currentActivity && (t = !0), a.wallshakeConfig = e, a.countdown = a.wallshakeConfig.wallshake.shakeTime, t && (a.leave(), a.in()), a.refreshShakeRegeditCount(function () {
                        $("#shakeRegeditNum").html(a.regeditCount)
                    })
                } catch (e) {
                }
            }), Hi.Note.r(Hi.Note.type.WALL_SHAKE_START, function (e) {
                a.shakeId = e.shakeId, a.active || a.start()
            }), e.resolve(), e.promise()
        };
        return t().then(i).then(l).always(function () {
            a.refreshShakeRegeditCount(function () {
                e.resolve()
            })
        }), e.promise()
    }, l.prototype.in = function () {
        $("#wallNote,#wallcopyright").css("visibility", "hidden");
        var e = this;
        e.finishFlag = !1, e.maxShakeColum.maxNumber = 30;
        var a = function () {
            $("#shake-wall-block .shakewall").empty();
            var a = "", t = $("#shake-wall-block .shakewall"), i = "";
            Hi.Db.get("global", "wall").then(function (l) {
                i = "NoBound" == l.type ? "点击互动按钮参与" + e.wallshakeConfig.wallshake.title : "发送“" + e.wallshakeConfig.keyword + "”参与" + e.wallshakeConfig.wallshake.title, a += '<div class="curpeople">参与人数：<span id="shakeRegeditNum">' + e.regeditCount + "</span></div>", a += '<div class="pic"><img src="/images/wall/preshake.png" alt="点击开始摇一摇"></div>', a += '<div class="tishi">' + i + "</div>", t.append(a), t.find(".pic").bind("click", function () {
                    Hi.Wall.checkState(), "In" == l.activeState && (t.find(".pic").unbind("click"), e.active = !0, e.start())
                })
            }, function () {
                console.error("查询失败")
            })
        };
        t(), $("#game-control-switch").css("display", "inline"), $("#play-handle").hide(), $("#prevGame").bind("click", function () {
            Hi.Dc.query({where: {flag: flag, type: "up"}}).post("/web/wallshake/shakeSwitch.html", function (e, a, t) {
                t.msg.length > 0 && layer.msg(t.msg)
            })
        }), $("#nextGame").bind("click", function () {
            Hi.Dc.query({
                where: {
                    flag: flag,
                    type: "down"
                }
            }).post("/web/wallshake/shakeSwitch.html", function (e, a, t) {
                t.msg.length > 0 && layer.msg(t.msg)
            })
        }), $("#shake-wall-block").delegate(".next-btn img", "click", function () {
            e.nextShake()
        }), $("#shakeRegeditNum").html(e.regeditCount), Hi.Dc.query({
            where: {
                flag: flag,
                shakeId: e.wallshakeConfig.shakeId
            }
        }).post("/web/wallshake/getAlreadyUserList.html", function (t, i, l) {
            "Right" == l.state && i.length > 0 && (e.wallshakeRanking = i), e.wallshakeRanking.length > 0 ? e.finish() : a(), $("#wallNote,#wallcopyright").css("visibility", "hidden"), $("#shake-wall-block").show()
        })
    }, l.prototype.leave = function () {
        var e = this;
        $("#shake-wall-block").hide(), $("#wallNote,#wallcopyright").css("visibility", "visible"), clearInterval(e.updateDataContrl), e.wallshakeRanking = [], i(), $("#shake-wall-block").undelegate("click"), $("#wallcontrol .fr").hide(), $("#prevGame").unbind("click"), $("#nextGame").unbind("click")
    }, l.prototype.clearState = function () {
        clearInterval(this.autoPlayControl), this.autoPlayControl = null
    }, l.prototype.reloadState = function () {
        this.autoPlayFlag && this.autoPlay()
    }, l.prototype.refreshShakeRegeditCount = function (e) {
        var a = this;
        Hi.Dc.query({
            where: {
                wallId: wallJson.id,
                shakeId: a.wallshakeConfig.shakeId
            }
        }).post("/web/wallshakeRegedit/count.html", function (t, i, l) {
            var i = i;
            i.shakeId == a.wallshakeConfig.shakeId && (a.regeditCount = i.count), e()
        })
    }, l.prototype.nextShake = function () {
        a.post("/web/wallshake/nextRound.html", function (e, a, t) {
        })
    }, l.prototype.start = function () {
        var e = this;
        e.active && Hi.Push.s({
            system: {cmd: "globalNote", secondCmd: "wallShakeStart"},
            data: {shakeId: e.wallshakeConfig.shakeId}
        }), Hi.Wall.unBindControl();
        var t = 3, i = $("#shake-wall-block .pic img");
        i.attr("src", "/images/wall/" + t + ".png"), clearInterval(e.timeCounter3Contrl), e.timeCounter3Contrl = setInterval(function () {
            t--, t <= 0 ? (i.attr("src", "/images/wall/go.png"), clearInterval(e.timeCounter3Contrl), e.active ? a.post("/web/wallshake/go.html", function (a, t, i) {
                a && console.log(i.msg), "Right" == i.state && (e.shakeId = t.shakeId), e.go()
            }) : e.go()) : i.attr("src", "/images/wall/" + t + ".png")
        }, 1e3)
    }, l.prototype.go = function () {
        var e = this;
        this.tempStagtInit(), clearInterval(e.timeCounter60Contrl), e.timeCounter60Contrl = setInterval(function () {
            e.countdown > 0 ? e.countdown-- : (clearInterval(e.timeCounter60Contrl), clearInterval(e.updateDataContrl), e.finishFlag = !0, e.end(), e.active = !1)
        }, 1e3)
    };
    var n = function (e) {
        var a = "/images/wall/unname.jpg";
        return null == e.weixinUser.imgpath ? a : Hi.String.dealUrl(e.weixinUser.imgpath)
    };
    l.prototype.end = function () {
        function e() {
            try {
                Hi.Dc.query({
                    where: {
                        flag: flag,
                        shakeId: a.wallshakeConfig.shakeId
                    }
                }).post("/web/wallshake/getAlreadyUserList.html", function (t, i) {
                    if (t)return void setTimeout(function () {
                        e()
                    }, 800);
                    a.wallshakeRanking = i;
                    var l = '<img style="display: block;margin:0 auto; margin-top:-34px;" src="/images/wall/shake/bang2.gif" />';
                    $("#shake-wall-block .shakewall").empty().append(l), setTimeout(function () {
                        a.finish()
                    }, 800)
                })
            } catch (a) {
                setTimeout(function () {
                    e()
                }, 1e3)
            }
        }

        var a = this, t = '<img style="display: block;margin:0 auto; margin-top:-34px;" src="/images/wall/shake/bang.gif" />';
        $("#shake-wall-block .shakewall").empty().append(t), e()
    }, l.prototype.finish = function () {
        var a = this;
        Hi.Wall.bindControl();
        for (var t = a.wallshakeRanking.sort(function (e, a) {
            var t = a.count - e.count;
            if (!t)try {
                t = e.id ? e.id - a.id : e.lastDate.getDate().getTime() - a.lastDate.getDate().getTime()
            } catch (e) {
            }
            return t
        }), i = 0; i < t.length; i++) {
            var l = t[i];
            l && l.weixinUser && (l.weixinUser.nickName = Hi.Wall.getSignUserName(l.wxUserId, l.nickName))
        }
        try {
            var s = a.wallshakeConfig.wallshake.rank;
            s = parseInt(s), isNaN(s) || (t = t.slice(0, s))
        } catch (e) {
        }
        $("#shake-wall-block .shakewall").empty().removeClass("toshake");
        var o = (t.length, "");
        o += '<div class="next-btn"><img src="/images/wall/shake/next-shake.png"></div>', o += '<div class="podium">', o += '<ul class="clearfix">';
        var r = t.shift(), h = t.shift(), c = t.shift();
        if (o += h ? '<li class="second"><img src="' + n(h) + '" alt=""><p><nobr>' + h.weixinUser.nickName + "</nobr></p></li>" : '<li class="second"></li>', o += r ? '<li class="first"><img src="' + n(r) + '" alt=""><p>' + r.weixinUser.nickName + "</p></li>" : '<li class="first"></li>', o += c ? '<li class="third"><img src="' + n(c) + '" alt=""><p>' + c.weixinUser.nickName + "</p></li>" : '<li class="third"></li>', o += "</ul>", o += "</div>", t.length > 0) {
            o += '<div class="podium_last">', o += '<ul class="clearfix">';
            for (var u = 2; ;) {
                u++;
                var k = t.shift();
                if (!k)break;
                var d = k.weixinUser.nickName;
                o += "<li>", o += "<p>第" + e[u] + "名</p>", o += '<div class="tou"><img src="' + n(k) + '" alt=""><nobr>' + d + "</nobr></div>", o += "</li>"
            }
            o += "</ul>", o += "</div>"
        }
        $("#shake-wall-block .shakewall").append(o), $(".tooltip").tooltipster({
            theme: "tooltipster-light",
            position: "left",
            timer: "100"
        })
    }, l.prototype.updateRanking = function () {
        function e(e) {
            return a.maxShakeColum.maxHeight * e / a.maxShakeColum.maxNumber
        }

        var a = this;
        if (!a.finishFlag) {
            var t = a.wallshakeRanking;
            $("#shake-wall-block .shakewall").empty().addClass("toshake");
            var i = "";
            i += "<h3>" + a.wallshakeConfig.wallshake.title + "结束还剩余<span>" + a.countdown + "</span>秒</h3>", i += '<ul class="clearfix">';
            for (var l = 0; l < t.length; l++) {
                var s = t[l], o = s.count;
                if (o > 0) {
                    var r = s.weixinUser, h = Hi.Wall.getSignUserName(r.id, r.nickName);
                    if (i += '<li class="ranking' + l + '">', i += '<span class="nickname"><nobr>' + h + "</nobr></span>", i += '<div class="cont">', i += '<img src="' + n(s) + '" alt="">', i += "<p>" + o + "</p>", i += '<div class="column" style="height:' + e(s.count) + 'px;"><span></span></div></div>', i += "</li>", l >= 9)break
                }
            }
            i += "</ul>", $("#shake-wall-block .shakewall").append(i);
            var c = t.length;
            c > 10 && (c = 10);
            var u = 80 * c + 10 + "px";
            $("#shake-wall-block .shakewall ul").css("width", u)
        }
    };
    var s = function (e) {
        try {
            for (var a = new Map, t = 0; t < e.length; t++) {
                var i = e[t];
                if (i) {
                    var l = i.shakeId + "-" + i.wxUserId, n = a.get(l);
                    n ? (i.count = i.count + n.count, a.put(l, i)) : a.put(l, i)
                }
            }
            return a.values()
        } catch (e) {
        }
        return e
    };
    l.prototype.updateData = function () {
        var e = this;
        clearInterval(e.updateDataContrl), e.updateDataContrl = setInterval(function () {
            Hi.Dc.query({
                where: {
                    flag: flag,
                    shakeId: e.shakeId
                }
            }).post("/web/wallshake/userList.html", function (a, t, i) {
                try {
                    if ("Right" == i.state) {
                        var l = t;
                        l = s(l), l.length >= e.wallshakeRanking.length && (e.wallshakeRanking = l, l.sort(function (e, a) {
                            return a.count - e.count
                        }), l[0].count && l[0].count > e.maxShakeColum.maxNumber && (e.maxShakeColum.maxNumber = l[0].count + 50))
                    }
                } catch (e) {
                    console.log("WallShake", "数据更新错误", response, e)
                }
                e.tempSwitchChange()
            })
        }, 1e3)
    }, l.prototype.tempStagtInit = function () {
        "sm" == this.wallshakeConfig.wallshake.type && this.horseInit(), this.updateData()
    }, l.prototype.tempSwitchChange = function () {
        "sm" == this.wallshakeConfig.wallshake.type ? this.horsePlayying() : this.updateRanking()
    }, l.prototype.horseInit = function () {
        var e = "";
        e += '<div class="shake-horse horse-animate">', e += '    <div class="shake-horse-box">', e += '       <div class="horse-prospects"></div>', e += '        <div class="horse-close-hot"></div>', e += '        <div class="horse-tite-box">' + this.wallshakeConfig.wallshake.title + '距离结束<span class="time-down">' + this.countdown + "</span>秒</div>", e += '        <div class="horse-join-num">', e += '            <div class="text">参与人数</div>', e += '            <div class="regist-num">' + this.regeditCount + "</div>", e += "        </div>", e += "    </div>", e += '    <div class="horse-court"></div>', e += "</div>  ", $("#shake-wall-block .shakewall").html(e);
        for (var a = "", t = 1; t <= 10; t++)a += '<div class="horse-court-line ' + (t % 2 == 0 ? "even" : "") + '">', a += '    <div class="sort-number">' + t + "</div>", a += '    <div class="horse-line"><div class="horse-player"></div></div>', a += "</div>";
        $("#shake-wall-block .shakewall").find(".horse-court").html(a)
    }, l.prototype.horsePlayying = function () {
        $(".shake-horse").find(".time-down").text(this.countdown), $(".shake-horse").find(".regist-num").text(this.wallshakeRanking.length);
        var e = this.wallshakeConfig.wallshake.shakeTime, a = 4 * e;
        this.wallshakeRanking.sort(function (e, a) {
            return a.count - e.count
        }), this.wallshakeRanking.forEach(function (e, t) {
            var i = $("#shake-wall-block .horse-court").find(".horse-court-line").eq(t);
            i.find(".horse-player").css("left", 100 * e.count / a + "%");
            var l = "";
            l += '<div class="pony"></div><div class="player-info"><div class="ig"><img src="' + e.weixinUser.imgpath + '" alt=""></div><div class="info-cont">' + e.weixinUser.nickName + "</div></div>", i.find(".horse-player").html(l)
        })
    };
    var o = new l;
    Hi.Activity.r("shake", o)
}(jQuery);
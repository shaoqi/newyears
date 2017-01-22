!function () {
    Hi.Push.r("syncVote", function (t) {
        Hi.Note.n(Hi.Note.type.UPDATE_VOTE, t)
    }), Hi.Push.r("UPDATE_VOTE", function (t) {
        Hi.Note.n(Hi.Note.type.UPDATE_VOTE, t)
    });
    var t = function () {
        $(document).bind("keyup.up", function (t) {
            $("#prevGame").click()
        }), $(document).bind("keyup.down", function (t) {
            $("#nextGame").click()
        })
    }, e = function () {
        $(document).unbind("keyup.up"), $(document).unbind("keyup.down")
    }, o = function () {
        this.wallvoteConfig = null, this.wallvoteSubject = null, this.voteNum = 0, this.voteData = null, this.contral = null
    };
    o.prototype.init = function (t) {
        var e = $.Deferred(), o = this, l = function () {
            var t = $.Deferred();
            return $.get("/pcwall/vote/template.htm", function (e) {
                $("#allTemplate").append(e), t.resolve()
            }, "html"), t.promise()
        }, a = function () {
            var t = $.Deferred();
            return Hi.Db.get("global", "wallvoteConfig").then(function (e) {
                o.wallvoteConfig = e, t.resolve()
            }, function () {
                console.error("wallvoteConfig查询失败")
            }), t.promise()
        }, i = function () {
            var t = $.Deferred();
            return Hi.Note.r(Hi.Note.type.UPDATE_GLOBAL, function (t) {
                "wallvoteConfig" == t.noteType && (o.wallvoteConfig = t, o.refreshSubject(), n(o))
            }), Hi.Note.r(Hi.Note.type.UPDATE_VOTE, function (t) {
                0 != t.length && (o.voteData = t, o.updateVote())
            }), t.resolve(), t.promise()
        };
        return l().then(a).then(i).then(function () {
            o.refreshSubject(), e.resolve()
        }, function () {
            console.error("初始化查询失败")
        }), e.promise()
    }, o.prototype.in = function () {
        var e = this;
        $("#vote-wall-block").show(), n(e), e.contral = setInterval(function () {
            n(e)
        }, 3e3), t(), $("#play-handle").hide(), $("#game-control-switch").css("display", "inline"), $("#prevGame").bind("click", function () {
            $("#rankbox:visible").length && $("#rankClose").click(), Hi.Dc.query({
                where: {
                    flag: flag,
                    type: "up"
                }
            }).post("/web/vote/voteSwitch.html", function (t, e) {
                t && layer.msg(t)
            })
        }), $("#nextGame").bind("click", function () {
            $("#rankbox:visible").length && $("#rankClose").click(), Hi.Dc.query({
                where: {
                    flag: flag,
                    type: "down"
                }
            }).post("/web/vote/voteSwitch.html", function (t, e) {
                t && layer.msg(t)
            })
        }), $("#votewall").delegate("#rankBtn", "click", function () {
            Hi.Dc.query({
                where: {
                    voteSubjectId: e.wallvoteSubject.id,
                    flag: flag
                }
            }).post("/vote.php?m=rank", function (t, o) {
                if (t)layer.msg(t); else {
                    $(".votewall h3 .join").css("border-right", "none"), e.voteData = o;
                    var n = e.toHtml(!0);
                    n && $("#rankbox").html(n).show()
                }
            })
        }), $("#rankbox").delegate("#rankClose", "click", function () {
            $(".votewall h3 .join").css("border-right", "2px solid #666"), $("#rankbox").empty().hide()
        })
    }, o.prototype.leave = function () {
        var t = this;
        $("#vote-wall-block,#wallcontrol .fr").hide(), clearInterval(t.contral), e(), $("#prevGame,#nextGame").unbind("click")
    };
    var n = function (t) {
        var e = {system: {cmd: "syncVote"}, data: {where: {subjectId: t.wallvoteSubject.id}}};
        Hi.Push.s(e)
    };
    o.prototype.getVoteNumArr = function () {
        var t = this, e = t.wallvoteSubject.items.slice(0), o = t.voteData ? t.voteData.list : null, n = {}, l = [];
        return o && 0 != o.length && o.forEach(function (t, e) {
            n[t.id] = t.count
        }), e.forEach(function (t, e) {
            t.offCount || (t.offCount = 0), l[e] = t, l[e].count = n[t.id] ? n[t.id] + t.offCount : t.offCount
        }), l
    }, o.prototype.getMaxCountByList = function () {
        var t = this, e = t.getVoteNumArr();
        return e.sort(function (t, e) {
            return parseInt(e.count) - parseInt(t.count)
        }), t.voteData ? e[0].count || t.voteData.joinCount : e[0].count || 0
    }, o.prototype.tipFront = function () {
        var t = this, e = t.getVoteNumArr(), o = null, n = 0;
        if ($(".column").removeClass("bar-1"), $(".column").removeClass("bar-2"), $(".column").removeClass("bar-3"), $(".no,.rank").remove(), e && 0 != e.length) {
            e.sort(function (t, e) {
                return e.count == t.count ? parseInt(t.seq) - parseInt(e.seq) : parseInt(e.count) - parseInt(t.count)
            });
            for (var l = 0; l < 3; l++)o = $("[data-id = " + e[l].id + "]"), n = l + 1, "bigScreen" == t.wallvoteSubject.screenShow ? o.find(".picbox").append('<div class="no no' + n + '">' + n + "</div>") : t.voteNum > 10 ? o.find(".column").addClass("bar-" + n) : o.find(".column").addClass("bar-" + n)
        }
    }, o.prototype.updateVote = function () {
        try {
            var t = this, e = "width", o = t.getVoteNumArr(), n = t.getMaxCountByList();
            if ("bigScreen" != t.wallvoteSubject.screenShow && t.voteNum < 11 && (e = "height"), t.wallvoteSubject && t.wallvoteSubject.items) {
                var l = !1;
                o.forEach(function (t) {
                    var o = $("[data-id = " + t.id + "]"), a = t.count, i = a ? a / n : 0;
                    t.offCount && (l = !0), o.find("p.count span").length ? o.find("p.count span").text(a) : o.find("p.count").text(a), i = i > 1 ? "100%" : Math.round(100 * i) + "%", o.find("div.column").removeAttr("style").css(e, i)
                }), l ? $(".votewall h3 .fr .join").css("display", "none") : ($(".votewall h3 .fr .join").css("display", "inline-block"), t.voteData && $(".votewall h3 .fr .join #joinPerson").text(t.voteData.joinCount))
            }
            t.voteData && t.voteData.joinCount > 5 && 0 == $("#rankbox:visible").length && t.tipFront()
        } catch (t) {
            console.log("WallVote", "updateVote", "投票更新错误", t)
        }
    }, o.prototype.toHtml = function (t) {
        var e = this, o = e.getVoteNumArr(), n = e.getMaxCountByList(), l = e.voteNum = o.length, a = "", i = {
            name: e.wallvoteSubject.name,
            joinCount: e.wallvoteSubject.joinCount,
            rankstyle: t
        };
        if (a += template("voteTitTemp", i), !o || 0 == l)return a;
        if (o && o.length > 0 && (t ? o.sort(function (t, e) {
                return e.count == t.count ? parseInt(t.seq) - parseInt(e.seq) : parseInt(e.count) - parseInt(t.count)
            }) : o.sort(function (t, e) {
                return parseInt(t.seq) - parseInt(e.seq)
            })), o.forEach(function (t, e) {
                t.percent = t.count ? Math.round(t.count / n * 100) : 0, t.img = t.optionImg && "/images/wall/vote/default.jpg" != t.optionImg ? Hi.String.dealUrl(t.optionImg) : "/images/wall/vote/default.jpg", t.rankclazz = e > 2 ? "n" : e + 1
            }), 0 == l || l < 0)return !1;
        var r = template("votePicTemp"), u = template("voteLevelTemp"), c = template("voteBarTemp"), s = {
            items: o,
            rankstyle: t
        };
        return "bigScreen" == e.wallvoteSubject.screenShow ? (s.voteNum = l, a += r(s)) : l > 10 ? ("allText" != e.wallvoteSubject.textImage && (s.clazz = "tu"), s.type = e.wallvoteSubject.textImage, a += u(s)) : ("allText" != e.wallvoteSubject.textImage && (s.clazz = "smalltu"), s.type = e.wallvoteSubject.textImage, a += c(s)), a
    }, o.prototype.newChart = function () {
        var t = this.toHtml(!1);
        t && $("#votewall").html(t), $(".tooltip[title]").tooltipster({theme: "tooltipster-light", position: "bottom"})
    }, o.prototype.refreshSubject = function () {
        var t = this, e = t.wallvoteConfig;
        e.wallvoteSubject && (t.wallvoteSubject && t.wallvoteSubject.id == e.wallvoteSubject.id || (t.wallvoteSubject = e.wallvoteSubject, t.wallvoteSubject.textImage || (t.wallvoteSubject.textImage = "textImage"), t.newChart()), t.wallvoteSubject && t.wallvoteSubject.id == e.wallvoteSubject.id && (t.wallvoteSubject = e.wallvoteSubject, t.updateVote()))
    };
    var l = new o;
    Hi.Activity.r("vote", l)
}(jQuery);
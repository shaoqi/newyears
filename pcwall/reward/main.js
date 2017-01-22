!function () {
    Hi.Push.r("wallRewardMoneyAdd", function (e) {
        Hi.Note.n("rewardMoney", e)
    }), Hi.Push.r("wallRewardClickLikeAdd", function (e) {
        Hi.Note.n("rewardClickLike", e)
    });
    var e = function () {
        $(document).bind("keyup.up", function (e) {
            $("#prevGame").click()
        }), $(document).bind("keyup.down", function (e) {
            $("#nextGame").click()
        }), $(document).bind("keyup.left", function (e) {
            $("#rewardwall .arrow-l").click()
        }), $(document).bind("keyup.right", function (e) {
            $("#rewardwall .arrow-r").click()
        })
    }, t = function () {
        $(document).unbind("keyup.up"), $(document).unbind("keyup.down"), $(document).unbind("keyup.left"), $(document).unbind("keyup.right")
    }, r = function () {
        this.wall = null, this.wallrewardConfig = null, this.itemConfig = null, this.contral = null, this.allContral = null, this.likedArr = [], this.rewardArr = [], this.likeAniRender = null, this.rewardAniRender = null, this.likeAnitimer = null, this.optionId = null, this.rewardId = null
    }, a = function (e) {
        var t = $.Deferred(), r = $.indexedDB(flag).objectStore("sign", "readonly").index("data.id");
        return r.get(e).then(function (e) {
            t.resolve(e.data)
        }, t.reject), t.promise()
    }, n = function (e) {
        var t = this, r = null, a = t.itemConfig.wallrewardOptionList;
        return a && a.length && a.forEach(function (t) {
            e == t.id && (r = t)
        }), r
    };
    r.prototype.init = function (e) {
        var t = $.Deferred(), r = this;
        Hi.Note.r("rewardMoney", function (e) {
            var t = e.wxUserId, i = e.optionId, l = e.count;
            t && i && a(t).then(function (e) {
                var t = n.bind(r)(i), a = Hi.Wall.getSignUserName(e.id, e.nickName);
                e && t && (r.rewardArr.push({
                    id: t.id,
                    name: t.name,
                    count: l,
                    wxUserId: e.id,
                    nickName: a,
                    imgPath: e.imgPath
                }), !$(".reward-mask").length && r.rewardArr.length && r.rewardAnimate())
            })
        }), Hi.Note.r("rewardClickLike", function (e) {
            var t = e.wxUserId, i = e.optionId;
            t && i && a(t).then(function (e) {
                var t = n.bind(r)(i);
                if (e && t) {
                    var a = Hi.Wall.getSignUserName(e.id, e.nickName);
                    r.likedArr.push({wxUserId: e.id, name: t.name, nickName: a, imgPath: e.imgPath})
                }
            })
        }), Hi.Note.r(Hi.Note.type.UPDATE_GLOBAL, function (e) {
            "wallrewardConfig" == e.noteType && r.refreshReward(e)
        });
        var i = function () {
            var e = $.Deferred();
            return Hi.Message.init("sign").always(e.resolve), e.promise()
        }, l = function () {
            var e = $.Deferred();
            return $.get("/pcwall/reward/template.htm", function (t) {
                $("#allTemplate").append(t), e.resolve()
            }, "html"), e.promise()
        }, o = function () {
            var e = $.Deferred(), t = function () {
                var e = $.Deferred();
                return Hi.Db.get("global", "wall").then(function (t) {
                    r.wall = t, e.resolve()
                }, function () {
                    console.error("wall获取错误"), e.reject()
                }), e.promise()
            }, a = function () {
                var e = $.Deferred();
                return Hi.Db.get("global", "wallrewardConfig").then(function (t) {
                    r.wallrewardConfig = t, e.resolve()
                }, function () {
                    console.error("查询失败"), e.reject()
                }), e.promise()
            };
            return t().then(a).always(e.resolve), e.promise()
        }, d = function () {
            var e = $.Deferred();
            return Hi.Dc.query({
                where: {
                    flag: flag,
                    rewardId: r.wallrewardConfig.rewardId
                }
            }).post("/web/wallreward/read.html", function (t, a) {
                t ? layer.msg(t.msg) : (r.itemConfig = a, e.resolve())
            }), e.promise()
        };
        return i().then(l).then(o).then(d).then(function () {
            r.rendInitDom(), r.likeAniRender = template("likeAniTemp"), r.rewardAniRender = template("rewardAniTemp"), r.updateData(), r.allContributionList(), t.resolve()
        }, function () {
            console.error("初始化查询失败")
        }), t.promise()
    }, r.prototype.in = function () {
        function t(e) {
            $("#rewardwall > .cont").hide(), e.show()
        }

        var r = this, a = r.rendInitDom();
        $("#reward-wall-block").append(a).show(), e(), $("#play-handle").hide(), $("#game-control-switch").css("display", "inline"), $("#prevGame").bind("click", function () {
            $(".seeallbox:visible").length || t($(".likedbox")), Hi.Dc.query({
                where: {
                    flag: flag,
                    type: "up"
                }
            }).post("/web/wallrewardConfig/switch.html", function (e, t) {
                e && layer.msg(e)
            })
        }), $("#nextGame").bind("click", function () {
            $(".seeallbox:visible").length || t($(".likedbox")), Hi.Dc.query({
                where: {
                    flag: flag,
                    type: "down"
                }
            }).post("/web/wallrewardConfig/switch.html", function (e, t) {
                e && layer.msg(e)
            })
        }), $("#rewardwall").delegate("#seeallBtn", "click.rewardbtn", function () {
            var e = $(this);
            Hi.Dc.query({where: {flag: flag}}).post("/web/wallreward/option.html", function (a, n) {
                if (a)layer.msg(a); else {
                    r.itemConfig.wallrewardOptionList = n;
                    var i = r.toHtml(n, !1, "seeallTemp");
                    $(".seeallbox .seeall").html(i), t($(".seeallbox")), e.hide(), $("#backBtn").css("display", "inline-block")
                }
            })
        }), $("#rewardwall").delegate("#rankBtn", "click.rewardbtn", function () {
            var e = $(this), t = "Y" == e.attr("data-rank"), a = "", n = r.itemConfig.wallrewardOptionList;
            a = r.toHtml(n, t, "seeallTemp"), $(".seeallbox .seeall").html(a), t ? e.attr("data-rank", "N").html("&#x2611; 排行榜") : e.attr("data-rank", "Y").html("&#11036; 排行榜")
        }), $("#rewardwall").delegate("#backBtn", "click.rewardbtn", function () {
            $("#rewardwall #rankBtn").attr("data-rank", "Y").html("&#11036; 排行榜"), t($(".likedbox")), $(this).hide(), $("#seeallBtn").css("display", "inline-block")
        }), $("#rewardListUl").delegate(".tab-change", "click", function () {
            var e = $(this).attr("changto"), t = $(this).closest(".tab-con-erm");
            "ewm" === e ? t.css("transform", "translateX(-50%)") : t.css("transform", "translateX(0)")
        }), $("#rewardwall").undelegate(".otherbtn"), $("#rewardwall").delegate(".see-all-contribute", "click.otherbtn", function () {
            $(".likedbox").hide(), $(".contribute-all-box").show(), r.allContributionList(), r.allContral && clearInterval(r.allContral), r.allContral = setInterval(function () {
                r.allContributionList()
            }, 5e3)
        }), $("#rewardwall").delegate(".contribute-all-box .go-back", "click.otherbtn", function () {
            $(".likedbox").show(), $(".contribute-all-box").hide(), clearInterval(r.clearInterval)
        }), $("#rewardwall").delegate(".contribute-all-box .ct-ewm-btn", "click.otherbtn", function () {
            $(".contribute-all-box").hide(), $(".contribute-ewm-box").show()
        }), $("#rewardwall").delegate(".js-close-ewm", "click.otherbtn", function () {
            $(".contribute-all-box").show(), $(".contribute-ewm-box").hide()
        }), r.updateData(), r.contral = setInterval(function () {
            r.updateData()
        }, 5e3), r.likeAnimate()
    }, r.prototype.leave = function () {
        var e = this;
        $("#reward-wall-block,#wallcontrol .fr").hide(), clearInterval(e.contral), clearInterval(e.allContral), t(), $("#prevGame,#nextGame").unbind("click"), $("#rewardwall").undelegate(".rewardbtn"), $("#rewardwall").undelegate(".rewardflipbtn"), $("#rewardwall").undelegate(".otherbtn"), clearTimeout(e.likeAnitimer), $(".reward-ani,.reward-mask").remove()
    }, r.prototype.updateData = function () {
        var e = this;
        try {
            if (!$(".likedbox:visible").length)return;
            Hi.Dc.query({where: {flag: flag}}).post("/web/wallreward/upClick.html", function (e, t) {
                if (e)layer.msg(e); else {
                    var r = {};
                    t.forEach(function (e, t) {
                        r = $('.likedbox li[data-id = "' + e.optionId + '"]'), r.find(".getlike strong").text(e.count)
                    })
                }
            })
        } catch (e) {
            console.log("WallReward", "updateData", "打赏人更新错误", e)
        }
        e.contributionList()
    }, r.prototype.contributionList = function (e, t) {
        var r = this;
        e && (r.optionId = e), t && (r.rewardId = t);
        try {
            Hi.Dc.query({
                where: {
                    flag: flag,
                    rewardId: r.rewardId,
                    optionId: r.optionId
                }
            }).post("/web/wallreward/optionTop.html", function (e, t) {
                if (e)layer.msg(e); else {
                    if (!t || !t.length)return;
                    var a = r.toHtml(t, !1, "contributeTemp", !0);
                    $('.likedbox li[data-id = "' + r.optionId + '"] ul').html(a)
                }
            })
        } catch (e) {
            console.log("WallReward", "updateData", "贡献榜更新错误", e)
        }
    }, r.prototype.allContributionList = function () {
        var e = this;
        Hi.Dc.query({where: {flag: flag}}).post("/web/wallreward/currentTop.html ", function (t, r) {
            if (t)layer.msg(t); else {
                if (!r || !r.length)return;
                var a = r.length;
                a < 3 && (r.push({}), 1 == a && r.push({}));
                var n = r[0], i = r[1];
                r[0] = i, r[1] = n;
                var l = template("rewardContributeTemp", {list: r, hasPraise: e.itemConfig.hasPraise});
                $("#listContributeBox").html(l)
            }
        })
    }, template.helper("nickNameDeal", function (e) {
        return Hi.Wall.getSignUserName(e.wxUserId, e.nickName)
    }), template.helper("ewmLinkDeal", function (e) {
        var t = "" !== e ? "&optionId=" + e : "";
        return "/api/qrcode/generate.html?w=362&el=l&qr=1&content=" + encodeURIComponent(wwwdomain + "w/wallreward/" + wallJson.flag + "/index.html?from=standalone" + t)
    }), r.prototype.toHtml = function (e, t, r, a) {
        var n = this, i = "", l = e.length, o = {};
        if (!e || !e.length)return i;
        switch (o.hasPraise = n.itemConfig.hasPraise, o.rankstyle = t, o.list = e, t ? o.list.sort(function (e, t) {
            return parseInt(t.count) - parseInt(e.count)
        }) : a || o.list.sort(function (e, t) {
            return parseInt(e.sort) - parseInt(t.sort)
        }), r) {
            case"contributeTemp":
                i = template("contributeTemp", o);
                break;
            case"seeallTemp":
                i = l > 5 ? template("seeallMoreTemp", o) : template("seeallTemp", o);
                break;
            default:
                i = template("contributeTemp", o)
        }
        return i
    }, r.prototype.rendInitDom = function () {
        var e = this;
        if (e.wallrewardConfig && e.itemConfig) {
            var t, r = e.itemConfig, a = r.wallrewardOptionList.length, n = 0;
            r.wallType = e.wall.type, "Bound" == e.wall.type && (r.keyword = e.wallrewardConfig.keyword), r.wallrewardOptionList.sort(function (e, t) {
                return parseInt(e.sort) - parseInt(t.sort)
            }), $("#rewardwall").html(template("rewardTemp", r)), t = r.id, e.contributionList(r.wallrewardOptionList[0].id, t), "NoBound" === wallJson.type ? $(".ct-ewm-btn,.JS-erm").show() : $(".ct-ewm-btn,.JS-erm").hide(), $("#rewardwall").undelegate(".rewardflipbtn"), $("#rewardListUl").css("width", 100 * a + "%"), $("#rewardListUl li").css("width", 100 / a + "%"), $("#rewardwall").delegate(".arrow-r", "click.rewardflipbtn", function () {
                if (n < a - 1) {
                    $("#rewardListUl").css("transform", "translateX(-" + 100 * (n + 1) / a + "%)"), n++;
                    var r = $("#rewardListUl>li").eq(n).attr("data-id");
                    e.contributionList(r, t)
                } else n = a - 1
            }), $("#rewardwall").delegate(".arrow-l", "click.rewardflipbtn", function () {
                if (n > 0) {
                    $("#rewardListUl").css("transform", "translateX(-" + 100 * (n - 1) / a + "%)"), n--;
                    var r = $("#rewardListUl>li").eq(n).attr("data-id");
                    e.contributionList(r, t)
                } else n = 0
            })
        }
    }, r.prototype.refreshReward = function (e) {
        var t = this;
        t.wallrewardConfig && t.wallrewardConfig.rewardId != e.rewardId && (t.wallrewardConfig = e, Hi.Dc.query({
            where: {
                flag: flag,
                rewardId: e.rewardId
            }
        }).post("/web/wallreward/read.html", function (e, r) {
            e ? layer.msg(e.msg) : (t.itemConfig = r, t.rendInitDom())
        }))
    }, r.prototype.likeAnimate = function () {
        var e = this, t = (new Date).valueOf();
        if (e.likedArr.length) {
            var r = e.likedArr.shift(), a = $("#rewardwall").width() + 260;
            r.id = "rdanmu_" + t;
            var n = e.likeAniRender(r), a = "-" + a;
            $('#rewardwall .footbox[data-praise="Y"]').append(n), $("#" + r.id).snabbt({
                position: [parseInt(a), 0, 0],
                easing: "linear",
                duration: 3e4,
                complete: function () {
                    $("#" + r.id).remove()
                }
            })
        }
        e.likeAnitimer = setTimeout(function () {
            e.likeAnimate()
        }, 1e4)
    }, r.prototype.rewardAnimate = function () {
        var e = this, t = $("body").height(), r = 1;
        if (e.rewardArr.length) {
            var a = e.rewardArr.shift();
            "N" == e.itemConfig.hasPraise ? a.desc = "送出" + (a.count / 100 | 0) + "元" : a.desc = "送出" + a.count + "赞";
            var n = e.rewardAniRender(a);
            $(".reward-mask").length ? ($(".reward-ani").remove(), $("body").append(n)) : $("body").append('<div class="reward-mask"></div>').append(n), t < 800 && ($(".reward-ani").css("transform", "scale(0.8)"), r = .8);
            var i = document.getElementById("sequence-one"), l = document.getElementById("sequence-two"), o = document.getElementById("sequence-three"), d = document.querySelectorAll(".headimg"), s = document.querySelectorAll(".reward-ani");
            snabbt.sequence([[i, {
                fromPosition: [0, 140, 0],
                position: [0, 275, 0],
                fromHeight: 310,
                height: 250,
                easing: "ease",
                duration: 200
            }], [i, {position: [0, 0, 0], height: 310, easing: "easeIn", duration: 400}], [d, {
                scale: [r / 2, r / 2],
                fromOpacity: function (e, t) {
                    return 0 == e ? 1 : 0
                },
                opacity: 1,
                easing: "ease",
                duration: 200
            }], [d, {scale: [r, r], easing: "ease", duration: 200}], [l, {
                fromPosition: [0, 40, 0],
                position: [0, 0, 0],
                fromOpacity: .6,
                opacity: 1,
                easing: "linear",
                duration: 800
            }], [o, {
                fromOpacity: 1,
                opacity: 1,
                fromPosition: [0, 57, 0],
                position: [0, 0, 0],
                fromScale: [r / 2, r / 2],
                scale: [r, r],
                easing: "easeOut",
                duration: 800
            }], [s, {
                fromOpacity: 1,
                opacity: 0,
                fromScale: [1, 1],
                scale: [0, 0],
                delay: 3e3,
                easing: "easeIn",
                duration: 800,
                complete: function () {
                    e.rewardArr.length ? e.rewardAnimate() : $(".reward-ani,.reward-mask").remove()
                }
            }]])
        }
    };
    var i = new r;
    Hi.Activity.r("reward", i)
}(jQuery);
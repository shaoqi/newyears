var startTime = +new Date;
Hi.Time = function () {
    var e = +new Date;
    return {
        now: function () {
            var t = +new Date, n = "\t" + (t - startTime) / 1e3 + "s\t" + (t - e) / 1e3 + "s";
            return e = t, n
        }
    }
}(), Hi.LoadAnimate = {
    reset: function () {
        $(".m-progress").show()
    }, set: function (e) {
        return 100 == e && setTimeout(function () {
            Hi.LoadAnimate.close()
        }, 1e3), function () {
            var t = $.Deferred();
            return $("#load-runing").css("width", e + "%"), t.resolve(), t.promise()
        }
    }, close: function (e) {
        $(".progress-fulled").addClass("loaded-suc"), setTimeout(function () {
            $(".m-progress").hide(), $("#load-runing").css("width", "0%")
        }, 400), e && e()
    }
}, Hi.LoadAnimate.reset(), Hi.LoadAnimate.set(10)(), Hi.Recurse = function () {
    var e = function (e, t) {
        this.arr = e, this.fn = t
    };
    return e.data = function (t, n) {
        return new e(t, n)
    }, e.prototype.done = function (e) {
        var t = this, n = function (o) {
            var r = o.shift();
            "undefined" != typeof r ? t.fn(r, function () {
                n(t.arr)
            }) : e()
        };
        n(t.arr)
    }, e
}(), Hi.Load = function () {
    var e = {}, t = function (t, n) {
        if (t += "?v=" + v, e.url)return void(n && n());
        var o = document.createElement("script");
        o.type = "text/javascript", o.src = t, document.getElementsByTagName("body")[0].appendChild(o), o.onload = o.onreadystatechange = function () {
            this.readyState && "loaded" !== this.readyState && "complete" !== this.readyState || (o.onload = o.onreadystatechange = null, n && n())
        }, o.onerror = function () {
            n && n()
        }
    }, n = function (e) {
        e += "?v=" + v, $("<link>").attr({rel: "stylesheet", type: "text/css", href: e}).appendTo("head")
    }, o = function (e) {
        var t = $.Deferred();
        return $.get("/wall/temp/defaults/wall-html-" + e + ".html", function (e) {
            $('[data-modle="wall-modle-cont"]').append(e), t.resolve()
        }, "html"), t.promise()
    }, r = {}, i = function (e, n) {
        if (r[e])return void(n && n());
        console.log("    module", e, Hi.Time.now()), r[e] = e;
        var o = function () {
            var n = $.Deferred(), o = "/pcwall/" + e + "/main.js";
            return t(o, function () {
                n.resolve()
            }), n.promise()
        };
        o().always(function () {
            var t = Hi.Activity.g(e);
            if (!t)return console.error("该活动还在开发中", e), void(n && n());
            var o = "wall" + e + "Config";
            "signinlogo" == e && (o = "wallapplysignConfig"), t.init().then(function () {
                n && n();
                var e = allConfig[o];
                e && (e.noteType = o, Hi.Note.n(Hi.Note.type.UPDATE_GLOBAL, e))
            }, function () {
                console.error("加载失败", e)
            })
        })
    }, a = function () {
        $("svg[data-src]").each(function (e, t) {
            var n = $(t).attr("data-src");
            $.ajax({
                url: n, dataType: "xml", success: function (e) {
                    $(t).after(e.documentElement).remove()
                }
            })
        })
    }, l = function (e) {
        var t = $.Deferred(), n = new Image;
        return n.onload = function () {
            t.resolve(n)
        }, n.onerror = function () {
            t.reject()
        }, n.src = e, t.promise()
    };
    return {js: t, css: n, module: i, moduleHtml: o, svg: a, img: l}
}(), Hi.Db = function () {
    var e = {
        db: {
            global: [],
            msg: ["data.id", "delete", "data.seq", "prev", "next", "data.msgType"],
            sign: ["data.id", "delete", "data.seq", "prev", "next"],
            pic: ["data.id", "delete", "data.seq", "prev", "next"],
            mst: ["data.id", "delete", "data.seq", "prev", "next"],
            mstreg: ["data.id", "delete", "data.seq", "prev", "next"],
            keyvalue: []
        }
    }, t = "Hi", n = "Hi", o = {
        version: 1, schema: {
            1: function (e) {
                e.createObjectStore(n)
            }
        }
    }, r = function (e) {
        var t = $.Deferred();
        return indexedDB.deleteDatabase(e), t.resolve(), t.promise()
    }, i = function () {
        var e = $.Deferred(), r = [];
        if (window.indexedDB.webkitGetDatabaseNames) {
            var i = window.indexedDB.webkitGetDatabaseNames();
            i.onsuccess = function (t) {
                var n = t.srcElement.result;
                Object.keys(n).forEach(function (e) {
                    "undefined" != n[e] && r.push(n[e])
                }), e.resolve(r)
            }, i.onerror = function () {
                e.resolve([])
            }
        } else {
            var a = $.indexedDB(t, o).objectStore(n, "readonly");
            a.each(function (e) {
                e.key != flag && r.push(e.key)
            }).then(function () {
                e.resolve(r)
            }, e.reject)
        }
        return e.promise()
    }, a = function (e) {
        var t = $.Deferred(), n = {};
        return Hi.Recurse.data(e, function (e, t) {
            var o = window.indexedDB.open(e);
            o.onsuccess = function (e) {
                var r = o.result, i = r.objectStoreNames, a = {version: r.version, table: {}};
                Object.keys(i).forEach(function (e) {
                    if (!isNaN(parseInt(e))) {
                        var t = i[e], n = r.transaction(t).objectStore(t), o = n.indexNames, l = [];
                        Object.keys(o).forEach(function (e) {
                            o[e].length && l.push(o[e])
                        }), a.table[t] = l
                    }
                }), n[r.name] = a, t()
            }, o.onerror = function (e) {
                console.error(e, o), t()
            }
        }).done(function () {
            t.resolve(n)
        }), t.promise()
    }, l = function (r) {
        console.log("checkDbTables", Hi.Time.now());
        var i = $.Deferred(), a = function () {
            var e = $.Deferred();
            return r[t] && !r[t].table[n] ? (Hi.Db.deleteDb(t).then(e.resolve, e.reject), console.log("checkDbTables delete Hi")) : e.resolve(), e.promise()
        }, l = function () {
            console.log("clearExpire");
            var e = $.Deferred(), r = $.indexedDB(t, o).objectStore(n, "readonly");
            return r.each(function (e) {
                if (e.key != flag) {
                    var t = e.value, n = parseInt(t.createTime);
                    (new Date).getTime() - n > 432e6 && $.indexedDB(e.key).deleteDatabase().done(function () {
                        r.delete(e.key)
                    })
                }
            }).then(e.resolve, e.reject), e.promise()
        }, s = function () {
            var t = $.Deferred(), n = r[flag], o = !1;
            return n && Object.keys(e.db).forEach(function (t) {
                if (!o) {
                    var r = e.db[t], i = n.table[t];
                    i && JSON.stringify(r.sort()) == JSON.stringify(i.sort()) || (o = !0)
                }
            }), o ? (Hi.Db.deleteDb(flag).then(t.resolve, t.reject), console.log("checkDbTables delete", flag)) : t.resolve(), t.promise()
        };
        return a().then(l).then(s).always(i.resolve), i.promise()
    }, s = function () {
        console.log("initDb", Hi.Time.now());
        var r = $.Deferred();
        return $.indexedDB(flag, {
            version: 1, schema: {
                1: function (t) {
                    var n = function (e, n) {
                        var o = t.createObjectStore(e);
                        n && n.forEach(function (e) {
                            o.createIndex(e)
                        })
                    };
                    Object.keys(e.db).forEach(function (t) {
                        n(t, e.db[t])
                    })
                }
            }
        }).then(function () {
            var e = $.indexedDB(t, o).objectStore(n);
            e.get(flag).then(function (t) {
                t ? (t.createTime = +new Date, e.put(t, flag)) : e.add({
                    name: flag,
                    createTime: +new Date
                }, flag), r.resolve()
            }, function () {
                console.error(arguments)
            })
        }, function () {
            console.log("db init fail", arguments), r.reject()
        }), r.promise()
    }, c = function (e, t, n) {
        var o = $.Deferred();
        return $.indexedDB(flag).objectStore(e).put(n, t).then(function (e) {
            o.resolve(e)
        }, function () {
            o.reject(arguments)
        }), o.promise()
    }, u = function (e, t) {
        var n = $.Deferred();
        return $.indexedDB(flag).objectStore(e).get(t).then(function (e) {
            n.resolve(e)
        }, function () {
            n.reject(arguments)
        }), n.promise()
    };
    return {
        checkDb: function () {
            console.log("checkDb", Hi.Time.now());
            var e = $.Deferred(), n = !1;
            return i().then(function (e) {
                e.forEach(function (e) {
                    e == flag && (n = !0)
                })
            }).always(function () {
                n ? a([t, flag]).then(l).always(e.resolve) : e.resolve()
            }), e.promise()
        }, initDb: s, deleteDb: r, update: c, get: u
    }
}(), Hi.Push = function () {
    var e = new Hi.Map, t = function (t) {
        console.log(t);
        var n = JSON.parse(t), o = n.system, t = n.data, r = o.cmd;
        console.log("note", r);
        var i = e.get(r);
        console.log(i);
        return i ? void i(t, o) : void console.error("该指令没有实现:" + r)
    }, n = new Hi.Socket({
        uri: "/web/wall/socket/" + flag, onMessage: function (e) {
            t($.base64.atob(e.data, !0))
        }, onClose: function (e) {
            setTimeout(function () {
                n.connect()
            }, 3e3)
        }, onOpen: function () {
        }
    });
    n.connect();
    var o = new Hi.Map, r = function (e, t, n) {
        console.log(e);
        o.get(e) || (o.put(e, ""), setTimeout(function () {
            try {
                if (1 === t.socket.readyState && n) return o.remove(e), void n(),console.log('33333')
            } catch (e) {
                console.error("Wall", "连接失败", e)
            }
            o.remove(e), r(e, t, n)
        }, 5))
    };
    return {
        note: e, r: function (t, n) {
            e.put(t, n)
        }, s: function (e) {
            var t = JSON.stringify(e);
            r(t, n, function () {
                n.send($.base64.btoa(t, !0))
            })
        }
    }
}(), Hi.Activity = function () {
    var e = {};
    return {
        all: e, currentActivity: "", r: function (t, n) {
            e[t] = n
        }, g: function (t) {
            return e[t]
        }
    }
}(), Hi.Note = function () {
    var e = new Hi.Map;
    return {
        note: e,
        type: {
            NEW_MESSAGE: "NEW_MESSAGE",
            UPDATE_MESSAGE_COUNT: "UPDATE_MESSAGE_COUNT",
            UPDATE_WALL: "UPDATE_WALL",
            UPDATE_WALL_MSGCONFIG: "UPDATE_WALL_MSGCONFIG",
            NEW_PIC: "NEW_PIC",
            NEW_USER: "NEW_USER",
            UPDATE_USER: "UPDATE_USER",
            UPDATE_GLOBAL: "UPDATE_GLOBAL",
            UPDATE_VOTE: "UPDATE_VOTE",
            UPDATE_WALL_SHAKECONFIG: "UPDATE_WALL_SHAKECONFIG",
            UPDATE_WALL_GUEST: "UPDATE_WALL_GUEST",
            UPDATE_WALL_SIGNIN_USER: "UPDATE_WALL_SIGNIN_USER",
            WALL_SHAKE_START: "WALL_SHAKE_START",
            WALL_SHAKEPRIZE_START: "WALL_SHAKEPRIZE_START",
            UPDATE_WALL_NEW_MSTCHING_USER: "UPDATE_WALL_NEW_MSTCHING_USER",
            WALL_MONEY_START: "WALL_MONEY_START"
        },
        r: function (t, n) {
            var o = e.get(t);
            o ? (o.add(n), e.put(t, o)) : (o = new Hi.List, o.add(n), e.put(t, o))
        },
        n: function (t, n) {
            var o = e.get(t);
            if (o)for (var r = 0; r < o.size(); r++)o.get(r)(n)
        }
    }
}(), Hi.SponerScroll = function () {
    function e() {
        this.dom = $("#wallcopyright"), this.moveDom = $(".sponer-order"), this.parentW = parseInt(this.moveDom.parents().outerWidth()), this.oncespeed = 2e4, this.limit = this.dom.outerWidth(), this.moveDomW = 0, this.moveTime = 0, this.edgeGap = (this.limit - this.parentW) / 2, this.isPlay = !1, this.playStart = !1, this.upStart = !1, this.init()
    }

    return e.prototype = {
        init: function () {
            this.preLoad()
        }, preLoad: function () {
            function e() {
                t !== n ? setTimeout(e, 500) : o.calcul()
            }

            var t = 0, n = 0;
            this.moveDom.find(".sponer-list").each(function () {
                if ($(this).find("img").length > 0) {
                    t++;
                    var e = $(this).find("img").attr("src"), o = new Image;
                    o.onload = function () {
                        n++
                    }, o.src = e
                }
            });
            var o = this;
            e()
        }, calcul: function () {
            var e = 0;
            this.moveDom.find(".sponer-list").each(function () {
                e += parseInt($(this).outerWidth()) + 10
            }), e > this.parentW ? (this.moveDom.css("width", e + "px"), this.moveDomW = e, this.isPlay = !0) : (this.moveDom.css("width", "auto"), this.isPlay = !1), this.upStart = !1, this.calculTime()
        }, calculTime: function () {
            var e = this.moveDomW / this.parentW;
            e = e.toFixed(2), this.moveTime = e * this.oncespeed, this.animate()
        }, animate: function () {
            var e = this;
            this.upStart && this.calcul(), this.isPlay ? (this.playStart = !0, this.moveDom.animate({left: -(e.moveDomW + e.edgeGap) + "px"}, e.moveTime, function () {
                e.moveDom.css("left", "100%"), this.isPlay = !1, e.interval()
            })) : e.moveDom.stop().css("left", "0")
        }, interval: function () {
            var e = this;
            setTimeout(function () {
                e.animate()
            }, 100)
        }, upMsg: function () {
            this.moveDom.stop(), this.upStart = !0, this.animate()
        }
    }, e
}(), Hi.Tomlive = function () {
    Hi.Push.r("playTomlive", function (e, t) {
        Hi.Tomlive.pushMessage(e)
    });
    var e = !1;
    return {
        messageArr: [], playMessage: function () {
            if (!messageArr || !messageArr.length)return e = !0, void $("#tomLive").fadeOut(1e3, function () {
                e = !1
            });
            var t = messageArr.shift(), n = '<i class="fa fa-volume-up"></i>  ' + t.content;
            $("#tomLive-msg").css("left", "100%").html(n);
            var o = $("#tomLive-msg").width();
            $("#tomLive-msg").animate({left: -o + "px"}, 15e3, "linear", function () {
                Hi.Tomlive.playMessage()
            })
        }, pushMessage: function (t) {
            messageArr = [];
            for (var n = 0; n < 3; n++)messageArr.push(t);
            ($("#tomLive").is(":hidden") || e) && $("#tomLive").stop().fadeIn(1e3, function () {
                Hi.Tomlive.playMessage()
            })
        }
    }
}(), Hi.DbUtil = function () {
    function e(e, t, n) {
        this.dbName = e, this.tableName = t, this.indexName = n
    }

    return e.prototype.getMaxSeq = function () {
        var e = this, t = $.Deferred(), n = 0;
        return $.indexedDB(e.dbName).objectStore(e.tableName, "readonly").index("data.seq").each(function (e) {
            return n = e.value, !1
        }, null, "prev").then(function () {
            n ? t.resolve(n.data.seq) : t.resolve(0)
        }, function () {
            console.error(arguments)
        }), t.promise()
    }, e.prototype.lastMsg = function () {
        var e = this, t = $.Deferred(), n = $.indexedDB(e.dbName).objectStore(e.tableName, "readonly");
        return n.index("next").get(0).then(function (e) {
            e ? t.resolve(e) : t.resolve()
        }, function () {
            t.reject()
        }), t.promise()
    }, e.prototype.add = function (e) {
        var t = this, n = $.Deferred(), o = {prev: 0, data: e, next: 0};
        return t.lastMsg().then(function (e) {
            var r = $.indexedDB(t.dbName).transaction(t.tableName);
            r.progress(function (r) {
                var i = r.objectStore(t.tableName);
                e ? (o.prev = e.data.seq, i.add(o, o.data.seq).then(function () {
                    e.next = o.data.seq, i.put(e, e.data.seq).then(n.resolve, function () {
                        console.error(arguments)
                    })
                }, function () {
                    console.error(arguments)
                }).always(n.resolve)) : i.add(o, o.data.seq).then(n.resolve, function () {
                    console.error(arguments)
                })
            }).always(function () {
                Hi.Note.n("storechange_" + t.tableName), n.resolve()
            })
        }, function () {
            console.error(arguments)
        }), n.promise()
    }, e.prototype.clear = function () {
        var e = $.Deferred(), t = $.indexedDB(this.dbName).objectStore(this.tableName);
        return t.clear().always(function () {
            e.resolve()
        }), e.promise()
    }, e.prototype.count = function () {
        var e = $.Deferred(), t = this, n = function () {
            var e = $.Deferred(), n = $.indexedDB(t.dbName).objectStore(t.tableName);
            return n.count().always(function (t) {
                e.resolve(t)
            }), e.promise()
        }, o = function (e) {
            var t = $.Deferred(), n = $.indexedDB(this.dbName).objectStore(this.tableName), o = 0;
            return n.index("delete").each(function () {
                o++
            }, "Y").always(function () {
                t.resolve(e - o)
            }), t.promise()
        };
        return n().then(o.bind(t)).always(e.resolve), e.promise()
    }, e.prototype.dealArr = function (e) {
        var t = this, n = $.Deferred();
        if (e && e.length) {
            var o = new Hi.Map, r = new Hi.Map, i = new Hi.Map, a = new Hi.Map, l = new Hi.LinkedList("seq");
            e.sort(function (e, t) {
                return e.data.seq - t.data.seq
            });
            var s = e[e.length - 1].data.seq;
            e.forEach(function (e) {
                var t = e.data;
                "del" == e.operType ? r.put(t.id, t) : "update" == e.operType ? i.put(t.id, t) : o.put(t.id, t)
            }), r.keys().forEach(function (e) {
                var t = o.get(e);
                t && (a.put(e, t), r.remove(e))
            }), o.keys().forEach(function (e) {
                l.append(o.get(e))
            });
            var c = function (e) {
                var n = $.Deferred();
                e || (e = {prev: 0, data: {seq: 0}, next: 0});
                var o = l.all, i = o.length;
                if (i || r.size()) {
                    var c = $.indexedDB(flag).transaction(t.tableName);
                    c.progress(function (l) {
                        var c = l.objectStore(t.tableName), u = function () {
                            var n = $.Deferred();
                            return o && i ? (o[0].prev = e.data.seq, e.next = o[0].data.seq, Hi.Recurse.data(o, function (e, n) {
                                a.get(e.data.id) && (e.delete = "Y"), c.add(e, e.data.seq).then(function () {
                                    n(), Hi.Note.n("newmsg_" + t.tableName, e)
                                }, function () {
                                    n(), console.log(arguments)
                                })
                            }).done(n.resolve)) : n.resolve(), n.promise()
                        }, d = function () {
                            var e = $.Deferred();
                            return r.size() ? Hi.Recurse.data(r.values(), function (e, t) {
                                c.index("data.id").each(function (e) {
                                    if (!e)return void t();
                                    var n = e.value;
                                    n.delete = "Y", e.update(n)
                                }, e.id).always(function () {
                                    t()
                                })
                            }).done(e.resolve) : e.resolve(), e.promise()
                        };
                        u().then(d).then(function () {
                            i && e.data.seq && c.put(e, e.data.seq), new Hi.DbUtil(flag, "keyvalue").update(t.tableName + "_maxseq", s)
                        }).always(n.resolve)
                    })
                } else n.resolve();
                return n.promise()
            };
            t.lastMsg().then(c).then(function () {
                setTimeout(function () {
                    Hi.Note.n("storechange_" + t.tableName)
                }, 1e3)
            }).always(n.resolve)
        } else n.resolve();
        return n.promise()
    }, e.prototype.get = function (e) {
        var t = this, n = $.Deferred(), o = $.indexedDB(t.dbName).objectStore(t.tableName, "readonly");
        return t.indexName && (o = o.index(t.indexName)), o.get(e).then(function (e) {
            n.resolve(e)
        }, function () {
            console.error(arguments)
        }), n.promise()
    }, e.prototype.update = function (e, t) {
        var n = this, o = $.Deferred(), r = $.indexedDB(n.dbName).objectStore(n.tableName);
        return n.indexName && (r = r.index(n.indexName)), r.put(t, e).then(o.resolve, function () {
            console.error(arguments)
        }), o.promise()
    }, e.prototype.delete = function (e) {
        var t = this, n = $.Deferred(), o = $.indexedDB(t.dbName).objectStore(t.tableName);
        return t.indexName && (o = o.index(t.indexName)), o.delete(e).always(n.resolve), n.promise()
    }, e.prototype.getMsg = function (e, t, n, o) {
        var r = $.Deferred(), i = this, a = [], l = {}, s = function () {
            var n = $.Deferred();
            if (e && e.length) {
                var o = e[e.length - 1];
                o.next ? (l = "next" == t ? e[e.length - 1] : e[0], n.resolve()) : new Hi.DbUtil(flag, i.tableName).get(o.data.seq).then(function (n) {
                    n && (e[e.length - 1] = n, l = "next" == t ? e[e.length - 1] : e[0])
                }).always(n.resolve)
            } else l = {prev: 0, data: {seq: 0}, next: 0}, n.resolve();
            return n.promise()
        }, c = function () {
            var e = $.Deferred(), r = $.indexedDB(i.dbName).objectStore(i.tableName), s = function () {
                var i = null;
                i = "next" != t || 0 != l.next || l.data.seq ? "prev" != t || 0 != l.prev || l.data.seq ? r.index("data.seq") : r.index("next") : r.index("prev"), i.get(l[t]).then(function (t) {
                    !t || a.length >= n ? (a.sort(function (e, t) {
                        return e.data.seq - t.data.seq
                    }), e.resolve(a)) : (l = t, "Y" == t.delete || (o ? o(t) && a.push(t) : a.push(t)), s())
                }, function () {
                    e.reject(arguments)
                })
            };
            return s(), e.promise()
        };
        return s().then(c).then(function (e) {
            r.resolve(e)
        }, function () {
            r.reject(arguments)
        }), r.promise()
    }, e
}(), Hi.Message = function () {
    var e = {}, t = function (e) {
        this.Hi = "Hi", this.modelName = e, this.config = {
            tableName: e,
            syncUrl: "/api.php?a=cmd&m="+e,
            seqUrl: "/api.php?a=CmdByseq&m=" + e
        }, this.config || console.error("不存在模块配置:" + e), this.newMsg = {}, this.control = {
            timer: 0,
            timerSocket: 0
        }, this.goFlag = {}
    };
    t.prototype = {
        getVersion: function () {
            var e = $.Deferred(), t = this, n = new Hi.DbUtil(this.Hi, this.Hi);
            return n.get(flag).then(function (n) {
                var o = t.modelName + "Version";
                e.resolve({version: n[o] || ""})
            }, function () {
                console.error("版本查询错误"), e.reject()
            }), e.promise()
        }, updateVersion: function (e) {
            var t = $.Deferred(), n = this, o = new Hi.DbUtil(this.Hi, this.Hi);
            return o.get(flag).then(function (r) {
                if (r) {
                    var i = n.modelName + "Version";
                    r[i] = e, o.update(flag, r).always(t.resolve)
                }
            }, function () {
                t.resolve(), console.log("版本查询错误")
            }), t.promise()
        }, clear: function () {
            var e = $.Deferred(), t = this, n = new Hi.DbUtil(flag, t.modelName), o = new Hi.DbUtil(flag, "keyvalue"), r = function () {
                var e = $.Deferred();
                return n.clear().always(e.resolve), e.promise()
            }, i = function () {
                var e = $.Deferred();
                return o.delete(t.modelName + "_maxseq").always(e.resolve), e.promise()
            }, a = function () {
                var e = $.Deferred();
                return o.delete("cursorMsgArr").always(e.resolve), e.promise()
            };
            return r().then(i).then(a).always(e.resolve), e.promise()
        }, getMaxSeq: function (e) {
            var t = this, n = $.Deferred(), o = new Hi.DbUtil(flag, "keyvalue");
            return o.get(t.modelName + "_maxseq").then(function (t) {
                t || (t = 0), e ? (e.maxSeq = t, n.resolve(e)) : n.resolve({maxSeq: t})
            }, function () {
                n.reject("查询最大seq错误")
            }), n.promise()
        }, sync: function (e) {
            var t = this, n = e.version, o = e.maxSeq, r = $.Deferred();
            if (!o && 0 != o)return void console.error("不合法的请求，maxSeq不能为空");
            var i = {where: {}};
            return n && (i.where.v = n, o && (i.where.seq = o)), Hi.Dc.query(i).page(0, 5e3).post(t.config.syncUrl, function (o, i) {
                if (o)return console.error(o), void r.reject();
                var a = i.data ? i.data.length : 0, l = function (e) {
                    var n = i.data;
                    n && n.length ? (n.forEach(function (e) {
                        t.newMsg[e.data.seq] = e
                    }), t.getVersion().then(t.getMaxSeq.bind(t)).always(function (n) {
                        t.dealNewMsg(n).always(function () {
                            e && e()
                        })
                    })) : e && e()
                }, s = 5e3;
                n != i.v ? t.updateVersion(i.v).always(function () {
                    t.clear().always(function () {
                        l(function () {
                            a < s ? r.resolve() : (e.go = !0, r.resolve(e))
                        })
                    })
                }) : l(function () {
                    a < s ? r.resolve() : (e.go = !0, r.resolve(e))
                })
            }), r.promise()
        }, dealNewMsg: function (e) {
            var t = this, n = $.Deferred();
            if (t.goFlag.dealNewMsg)return n.resolve(), n.promise();
            t.goFlag.dealNewMsg = !0;
            var o = e.maxSeq;
            if (!o && 0 != o)return void console.error("不合法的请求，maxSeq不能为空");
            var r = new Hi.Map;
            for (var i in t.newMsg)r.put(i, t.newMsg[i]);
            if (r.size() < 1)return setTimeout(n.resolve, 10), n.promise();
            var a = r.keys();
            a.sort(function (e, t) {
                return e - t
            });
            var l = a[0], s = a[a.length - 1], c = function () {
                var e = $.Deferred(), t = [];
                if (s - o != r.size()) {
                    for (var n = o + 1; n < s; n++)r.get(n) || t.push(n);
                    console.log("存在遗漏数据", t)
                }
                return setTimeout(function () {
                    e.resolve(t)
                }, 10), e.promise()
            }, u = function (e) {
                var n = $.Deferred();
                return e && e.length ? Hi.Dc.query({where: {seqList: e}}).post(t.config.seqUrl, function (o, r) {
                    return o ? void n.reject({msg: "补充数据失败", misArr: e}) : (r && r.length && r.forEach(function (e) {
                        t.newMsg[e.data.seq] = e
                    }), void n.resolve())
                }) : setTimeout(n.resolve, 10), n.promise()
            }, d = function () {
                for (var e = $.Deferred(), n = [], r = "sign" == t.modelName, i = o + 1; i <= s; i++) {
                    var a = t.newMsg[i];
                    a && (n.push(a), r && "add" == a.operType && (Hi.Wall.data.signUsers[a.data.id] = a.data))
                }
                n.sort(function (e, t) {
                    return e.data.seq - t.data.seq
                });
                var c = n.length;
                !!n.length;
                return console.log("入库数据", t.config.tableName, n.length), new Hi.DbUtil(flag, t.config.tableName).dealArr(n).then(function () {
                    for (var n = l; n <= s; n++)delete t.newMsg[n];
                    Hi.Note.n("new" + t.modelName), e.resolve(c)
                }, function () {
                    e.reject("入库失败")
                }), e.promise()
            };
            return c().then(u).then(d).then(function (e) {
                n.resolve(e)
            }, function () {
                console.error("处理新消息入库失败", arguments), n.reject()
            }).always(function () {
                t.goFlag.dealNewMsg = !1
            }), n.promise()
        }, timer: function () {
            var e = this, t = !1, n = function () {
                t || "{}" == JSON.stringify(e.newMsg) || (t = !0, e.getMaxSeq().then(e.dealNewMsg.bind(e)).always(function () {
                    t = !1
                }))
            };
            return clearInterval(e.control.timer), e.control.timer = setInterval(n, 2e3), function () {
                clearInterval(timer)
            }
        }, go: function () {
            var e = $.Deferred(), t = this, n = 0;
            if (t.goFlag[t.modelName])setTimeout(e.resolve, 500); else {
                t.goFlag[t.modelName] = !0;
                var o = function () {
                    return ++n, n > 10 ? void e.resolve() : void t.getVersion().then(t.getMaxSeq.bind(t)).then(t.sync.bind(t)).always(function (n) {
                        n && n.go ? o() : (t.goFlag[t.modelName] = !1, e.resolve())
                    })
                };
                o()
            }
            return e.promise()
        }, timerSocket: function () {
            var e = this, t = !1, n = function () {
                t || (t = !0, e.go().always(function () {
                    t = !1
                }))
            };
            return clearInterval(e.control.timerSocket), e.control.timerSocket = setInterval(n, 5e3), function () {
                clearInterval(timerSocket)
            }
        }
    };
    var n = function (t) {
        Hi.Push.r("new" + t, function (n) {
            var o = e[t];
            o.newMsg[n.data.seq] = n
        })
    };
    return {
        init: function (o) {
            var r = $.Deferred(), i = e[o];
            if (i)r.resolve(); else {
                i = new t(o), e[o] = i, n(o), i.timer();
                var a = function () {
                    var e = $.Deferred();
                    if ("sign" == o) {
                        var t = $.indexedDB(flag).objectStore("sign", "readonly");
                        t.each(function (e) {
                            var t = e.value;
                            if (t) {
                                var n = t.data;
                                n && n.id && n.nickName && (Hi.Wall.data.signUsers[n.id] = n)
                            }
                        }).always(e.resolve)
                    } else e.resolve();
                    return e.promise()
                };
                i.go().then(a).always(r.resolve)
            }
            return r.promise()
        }
    }
}(), Hi.Control = function () {
    var e = 3, t = function () {
        var e = $.Deferred();
        return setTimeout(e.reject, 10), e.promise()
    }, n = function () {
        return $("#playPause").find("span")
    }, o = function () {
        n().css("animation-play-state", "running"), $("#playPause i").last().removeClass("hi-plays").addClass("hi-suspend")
    }, r = function () {
        n().css("animation-play-state", "paused"), $("#playPause i").last().removeClass("hi-suspend").addClass("hi-plays")
    }, i = function () {
        n().removeClass("play")
    }, a = function () {
        n().addClass("play").css("animation-duration", e + "s")
    }, l = function () {
        $("#playPause").click(function () {
            "paused" == n().css("animation-play-state") ? o() : r()
        }), $("#firstPage,#prevPage,#nextPage,#lastPage").click(function () {
            if ($(this).hasClass("clickDisabled"))return !1;
            $("#firstPage,#prevPage,#nextPage,#lastPage").addClass("clickDisabled");
            var e = n().css("animation-play-state");
            i(), r();
            var l = $(this).attr("data-flag");
            n().hasClass("play") || t(l).fail(function () {
                console.log("没有播放内容")
            }).always(function () {
                "running" == e && o(), a(), $("#firstPage,#prevPage,#nextPage,#lastPage").removeClass("clickDisabled")
            })
        }), n().bind("animationend", function () {
            i(), r();
            try {
                t("next").always(function () {
                    a(), o()
                })
            } catch (e) {
                a(), o(), console.log(e)
            }
        })
    }, s = function () {
        $("#playPause").unbind("click"), $("#firstPage,#prevPage,#nextPage,#lastPage").unbind("click"), n().unbind("animationend")
    }, c = function () {
        n().trigger("animationend")
    }, u = function () {
        $(document).bind("keyup.left", function (e) {
            $("#firstPage:visible").click()
        }), $(document).bind("keyup.up", function (e) {
            $("#prevPage:visible").click()
        }), $(document).bind("keyup.space", function (e) {
            $("#playPause:visible").click()
        }), $(document).bind("keyup.down", function (e) {
            $("#nextPage:visible").click()
        }), $(document).bind("keyup.right", function (e) {
            $("#lastPage:visible").click()
        })
    }, d = function () {
        $(document).unbind("keyup.left"), $(document).unbind("keyup.up"), $(document).unbind("keyup.space"), $(document).unbind("keyup.down"), $(document).unbind("keyup.right")
    };
    return {
        bindEvent: l, unbindEvent: s, time: function (t) {
            return e = t, this
        }, state: function (e) {
            var t = n().css("animation-play-state");
            return "running" == t && (t = "run"), e && e != t ? void("run" == e ? o() : r()) : t
        }, stop: function () {
            i()
        }, start: function () {
            a()
        }, go: c, set fn(e) {
            t = e, i(), a()
        }, show: function () {
            $("#play-handle").show(), u()
        }, hide: function () {
            $("#game-control-switch").hide(), d()
        }
    }
}(), Hi.Tooltip = function () {
    var e = function () {
        $(".tooltip[data-title]").each(function (e, t) {
            var n = $(this).attr("data-title");
            n && $(t).tooltipster({theme: "tooltipster-light", content: n})
        })
    };
    return {show: e}
}(), Hi.Wall = function () {
    var e = {showFullName: !1, signUsers: {}}, t = null;
    Hi.Push.r("mcToggleDanMu", function () {
        $(document).trigger({type: "keyup", which: 68, originalEvent: KeyboardEvent})
    }), Hi.Push.r("mcToggleQrcode", function () {
        $(document).trigger({type: "keyup", which: 77, originalEvent: KeyboardEvent})
    }), [].slice.call(["Msg", "Pic", "Applysign", "SigninLogo", "Guest", "Lottery", "Vote", "Mstching", "Shake", "Money", "Shakeprize", "Reward"]).forEach(function (e) {
        e = "mcToggleWall" + e, Hi.Push.r(e, function (e, t) {
            var n = t.cmd;
            n = n.replace("mcToggleWall", ""), n = n.toLowerCase(), $('[wall-type="' + n + '"]:visible').click()
        })
    }), [].slice.call(["FirstPage", "PrevPage", "PlayPause", "NextPage", "LastPage"]).forEach(function (e) {
        e = "mcToggleControl" + e, Hi.Push.r(e, function (e, t) {
            var n = t.cmd;
            n = n.replace("mcToggleControl", ""), n = n.substring(0, 1).toLowerCase() + n.substring(1), $("#" + n + ":visible").click()
        })
    }), [].slice.call(["danmu", "msg", "pic", "applysign", "signthreed", "lottery", "vote", "mstching", "shake", "money", "guest", "shakeprize", "redpack", "reward", "holdscreen"]).forEach(function (e) {
        e = "wall" + e + "Config";
        var t = "update" + e.replace(/(\w)/, function (e) {
                return e.toUpperCase()
            });
        Hi.Push.r(t, function (t, n) {
            t.noteType = e, allConfig[e] = t, Hi.Db.update("global", t.noteType, t).then(function () {
                Hi.Note.n(Hi.Note.type.UPDATE_GLOBAL, t)
            }, function () {
                console.error("数据库操作失败")
            })
        })
    }), Hi.Note.r(Hi.Note.type.UPDATE_GLOBAL, function (e) {
        var t = e.noteType.substr(4).replace("Config", ""), n = '#wallcontrol li[wall-type="' + t + '"]', o = e.openState;
        "Y" == o ? ("applysign" == t && ("fullname" == e.displayType && (Hi.Wall.data.showFullName = !0), Hi.Load.module("signinlogo", function () {
            $('#wallcontrol li[wall-type="signinlogo"]').show()
        })), Hi.Load.module(t, function () {
            $(n).show()
        })) : ("applysign" == t && (Hi.Wall.data.showFullName = !1, $('#wallcontrol li[wall-type="signinlogo"]').hide()), $(n).hide())
    });
    var n = function () {
        if ($("#wallcontrol [wall-type]")[0]) {
            var e = $._data($("#wallcontrol [wall-type]")[0], "events");
            if (e && e.click)return
        }
        $("#wallcontrol [wall-type]").click(function () {
            var e = $(this).attr("id");
            (new Hi.Anchor).put("wallType", e).done();
            var t = $("#" + e + "-wall-block"), n = $("#wallCont");
            if (Hi.Activity.currentActivity == e)return void t.snabbt("attention", {
                start: function () {
                    n.css("overflow", "inherit")
                },
                position: [50, 0, 0],
                easing: "spring",
                springConstant: 2.5,
                springDeceleration: .9,
                complete: function () {
                    n.css("overflow", "hidden"), t.css("transform", "")
                }
            });
            var o = Hi.Activity.g(Hi.Activity.currentActivity), r = Hi.Activity.g(e);
            o && o.leave(), r && (r.in(), t.snabbt({
                start: function () {
                    n.css("overflow", "inherit")
                },
                fromScale: [.8, .8],
                scale: [1, 1],
                easing: "spring",
                springConstant: 2,
                springDeceleration: .6,
                complete: function () {
                    n.css("overflow", "hidden"), t.css("transform", "")
                }
            })), Hi.Activity.currentActivity = e
        })
    }, o = function () {
        $("#wallcontrol [wall-type]").unbind("click")
    }, r = function () {
        var e = document;
        e.exitFullscreen ? e.exitFullscreen() : e.mozCancelFullScreen ? e.mozCancelFullScreen() : e.webkitCancelFullScreen && e.webkitCancelFullScreen()
    }, i = function () {
        var e = document.documentElement;
        if (e.requestFullscreen)e.requestFullscreen(); else if (e.mozRequestFullScreen)e.mozRequestFullScreen(); else if (e.webkitRequestFullScreen)e.webkitRequestFullScreen(); else if ("undefined" != typeof window.ActiveXObject) {
            var t = new ActiveXObject("WScript.Shell");
            t && t.SendKeys("{F11}")
        }
    }, a = function () {
        console.log("loadModel", Hi.Time.now());
        var e = $.Deferred(), t = (new Hi.Anchor).get("wallType") || "msg", n = [t];
        return n.unshift("danmu"), console.log("loaded model", JSON.stringify(n)), Hi.Recurse.data(n, function (e, t) {
            Hi.Load.module(e, t)
        }).done(function () {
            e.resolve()
        }), e.promise()
    }, l = function (e) {
        var n = wallJson.styleName ? wallJson.styleName : "defaults", o = e.styleName ? e.styleName : "defaults";
        if (o !== n)return void window.location.reload();
        var r = e && e.logo ? Hi.String.dealUrl(e.logo) : "/images/placeholder.png", i = e && e.qrCode ? Hi.String.dealUrl(e.qrCode) : "/images/placeholder.png", a = e && e.title ? e.title : "", l = e && e.ruleDes ? e.ruleDes : "", s = e && e.sponsor ? e.sponsor : "", c = [];
        try {
            c = JSON.parse(s)
        } catch (e) {
            c.push({img: "/images/wall/temp/hi-eg.png", cont: "Hi现场工作室提供技术支持"})
        }
        var u = function () {
            $(".wall_logo img").attr("src", r).show(), $(".wall_logo img").attr("layer-src", r), i ? $(".qrcode img").attr("src", i).show() : $(".qrcode img").hide(), $("#wallHd").find(".wall_tit .wall-title-box").html(a), $("#wallNote").html($.base64.atob(l, !0));
            for (var o = "", s = 0, u = c.length; s < u; s++) {
                var d = c[s];
                o += '<div class="sponer-list"><span class="remove"><i class="fa fa-close"></i></span>', null != d.img && (o += '<img src="' + d.img + '">'), o += '<span class="sponer-cont">' + d.cont + "</span></div>"
            }
            c.length ? $("#wallcopyright").show() : $("#wallcopyright").hide();
            var f = $("#wallcopyright").find(".sponer-order").html();
            f !== o && ($("#wallcopyright").find(".sponer-order").html(o), t && t.upMsg());
            var m = tempGlobal[n].bgImg, v = e && e.backgroundImg ? Hi.String.dealUrl(e.backgroundImg) : m, p = "url(" + v + ")";
            $("body").css("background-image", p);
            try {
                var g = JSON.parse(e.tempStyle);
                g.fontColor ? ($("#wallHd").css("color", g.fontColor), $("#lottery-wall-block").css("color", g.fontColor)) : $("#wallHd").css("color", ""), g && g.sponerAlign ? $("#wallcopyright").find(".sponer-order").css("text-align", g.sponerAlign) : $("#wallcopyright").find(".sponer-order").css("text-align", "center"), 0 == $("#custom-style").length && $("body").append('<div id="custom-style"></div>'), $("#custom-style").html(""), g && g.customBg ? $("#custom-style").html("<style>.custom-bg{background-color:" + g.customBg + ";}</style>") : $("#custom-style").html("<style>.custom-bg{background-color:#fff;}</style>")
            } catch (e) {
                $("#wallcopyright").find(".sponer-order").css("text-align", "center")
            }
        }, d = e.qrText;
        "Y" == e.encodeFlag && d && (d = $.base64.atob(d, !0)), $("#qcord-win").find(".win-hed-cont").html(d), "Bound" == e.type ? $(".win-hed-bound").show() : $(".win-hed-bound").hide(), u()
    };
    Hi.Note.r(Hi.Note.type.UPDATE_GLOBAL, function (e) {
        "wall" == e.noteType && l(e)
    }), Hi.Push.r("updateWall", function (e, t) {
        e.noteType = "wall", Hi.Db.update("global", e.noteType, e).then(function () {
            Hi.Note.n(Hi.Note.type.UPDATE_GLOBAL, e)
        }, function () {
            console.error("数据库操作失败")
        })
    });
    var s = function () {
        var e = $.Deferred();
        n(), t = new Hi.SponerScroll, $("body").delegate("#logo", "click", function () {
            layer.closeAll();
            var e = this.src, t = new Image;
            t.onload = function () {
                var t = this.width > 720 ? .6 * this.width : this.width;
                layer.open({
                    type: 1,
                    title: !1,
                    closeBtn: 0,
                    shadeClose: !0,
                    area: t + "px",
                    content: '<img width="' + t + '" src="' + e + '"/>'
                })
            }, t.src = e
        });
        var o = function () {
            var e = -1, t = function () {
                Hi.Wall.qrcode().then(function (t) {
                    if (t.img && "/images/placeholder.png" != t.img) {
                        var n = "run" == Hi.Control.state(), o = template("qrcodeTemp", t);
                        return e > 0 ? (layer.close(e), void(e = -1)) : void(e = layer.open({
                            title: !1,
                            area: "470px",
                            type: 1,
                            shadeClose: !0,
                            content: o,
                            success: function () {
                                n && Hi.Control.state("paused")
                            },
                            end: function () {
                                n && Hi.Control.state("run"), e = -1
                            }
                        }))
                    }
                })
            };
            return {open: t}
        }();
        return $("body").delegate("#qrCode", "click", function () {
            var e = $(this), t = e.attr("src");
            return t.indexOf("placeholder.png") == -1 && void o.open()
        }), $(document).bind("keyup.m", function (e) {
            o.open()
        }), $("body").delegate("#wallcontrol", "mouseover", function () {
            $(this).css("bottom", "0")
        }), $("body").delegate("#wallcontrol", "mouseout", function () {
            $(this).css("bottom", "-75px")
        }), $("#btnFullScreen").click(function () {
            _this = $(this), _this.hasClass("esc_full") ? (_this.removeClass("esc_full"), r()) : (_this.addClass("esc_full"), i())
        }), $("[data-hotkey]").each(function () {
            var e = $(this), t = e.attr("data-hotkey");
            t && $(document).bind(t, function (t) {
                var n = e.attr("id");
                $("#" + n + ":visible").click()
            })
        }), e.resolve(), e.promise()
    }, c = function (e, t) {
        if (!e)return t || "";
        var n = Hi.Wall.data.signUsers[e];
        if (!n)return t || "";
        var o = n.nickName;
        return Hi.Wall.data.showFullName && (o = n.noteName || n.fullName || n.nickName), o
    }, u = function (e) {
        var t = $.Deferred(), n = function (e) {
            return {
                img: e.qrCode ? Hi.String.dealUrl(e.qrCode) : "/images/placeholder.png",
                ruleDes: e.ruleDes ? $.base64.atob(e.ruleDes, !0) : "扫描二维码参与互动大屏幕",
                qrText: e.qrText ? $.base64.atob(e.qrText, !0) : "扫描二维码参与互动大屏幕"
            }
        };
        return e ? t.resolve(n(e)) : Hi.Db.get("global", "wall").then(function (e) {
            t.resolve(n(e))
        }, function () {
            console.error("wall获取错误")
        }), t.promise()
    }, d = function () {
        var e = Hi.String.getDate(wallJson.endDate);
        if (e.getTime() < (new Date).getTime())throw layer.msg("活动结束"), new Error("活动结束")
    };
    return {
        data: e,
        loadModel: a,
        bindControl: n,
        unBindControl: o,
        updateWall: l,
        initDone: s,
        getSignUserName: c,
        qrcode: u,
        checkState: d
    }
}(), Hi.Custom = function () {
    var e = {}, t = function () {
        var e = $.Deferred();
        return Hi.Dc.query({flag: flag}).post("/web/wallcustom/read.html", function (t, n) {
            return t || !n ? void e.reject() : void e.resolve(n)
        }), e.promise()
    }, n = function (t) {
        var n = $.Deferred(), o = t.config;
        if (o)try {
            e = JSON.parse(o)
        } catch (e) {
            console.log("parse json error", o, e)
        }
        return n.resolve(), n.promise()
    }, o = function () {
        var t = $.Deferred();
        if (e) {
            var n = e.name;
            Hi.Load.module(n, function () {
                t.resolve(e)
            })
        } else t.reject();
        return t.promise()
    }, r = function (e) {
        var t = $.Deferred(), n = e.name, o = e.text, r = e.icon, i = e.index || $(".control-keys ul li").length - 1, a = $('<li class="tooltip" wall-type="reward"><a href="javascript:;"><i></i></a><div></div></li>');
        return a.attr("id", n), a.attr("wall-type", n), a.addClass("color-" + n), a.find("i").addClass(r), a.find("div").text(o), $(".control-keys ul li").eq(i).after(a), t.resolve(), t.promise()
    };
    return {
        init: function () {
            var e = $.Deferred();
            return t().then(n).then(o).then(r).always(e.resolve), e.promise()
        }
    }
}(), $(function () {
    function e() {
        var e = 800, t = document.documentElement.clientHeight || document.body.clientHeight;
        $("#wall").css("zoom", t / e)
    }

    var t = function () {
        console.log("loadCommon", Hi.Time.now());
        var e = $.Deferred(), t = tempGlobal.defaults, n = $.extend(!0, t, tempGlobal[wallJson.styleName ? wallJson.styleName : "defaults"] || {});
        Hi.Wall.data.themeConfig = n;
        var o = n.model;
        Hi.Load.css(n.css);
        var r = [];
        return [].slice.call(["arttemplate", "body", "header", "sponer", "control"]).forEach(function (e) {
            r.push(o[e])
        }), Hi.Recurse.data(r, function (e, t) {
            $.get(e.html, function (n) {
                var o = $('[data-modle="' + e.modelBox + '"]');
                o || console.error("节点不存在", e), o.append(n), t()
            }, "html")
        }).done(function () {
            e.resolve()
        }), e.promise()
    }, n = function () {
        allConfig.wall = wallJson;
        var e = function () {
            console.log("config.save", Hi.Time.now());
            var e = $.Deferred();
            return Hi.Recurse.data(Object.keys(allConfig), function (e, t) {
                Hi.Db.update("global", e, allConfig[e]).then(t, function () {
                    console.error("数据保存失败", e)
                })
            }).done(function () {
                Hi.Wall.updateWall(wallJson), e.resolve()
            }), e.promise()
        }, t = function () {
            console.log("config.note", Hi.Time.now());
            var e = $.Deferred();
            return Hi.Recurse.data(Object.keys(allConfig), function (e, t) {
                var n = allConfig[e];
                n && (n.noteType = e, Hi.Note.n(Hi.Note.type.UPDATE_GLOBAL, n)), t()
            }).done(function () {
                e.resolve()
            }), e.promise()
        };
        return {save: e, note: t}
    }();
    console.group("-------Init start-------", startTime), Hi.Db.checkDb().then(Hi.LoadAnimate.set(20)).then(Hi.Db.initDb).then(Hi.LoadAnimate.set(30)).then(t).then(Hi.LoadAnimate.set(40)).then(n.save).then(Hi.LoadAnimate.set(50)).then(Hi.Wall.loadModel).then(Hi.LoadAnimate.set(60)).then(Hi.Custom.init).then(n.note).then(Hi.LoadAnimate.set(70)).then(Hi.Wall.initDone).then(Hi.LoadAnimate.set(80)).then(Hi.LoadAnimate.set(90)).then(function () {
        Hi.Load.svg();
        var e = (new Hi.Anchor).get("wallType");
        e || (e = "msg"), $("#" + e + ":visible").length || $(".control-handle li:visible").length > 2 && (e = $(".control-handle li:visible").eq(1).attr("id")), $("#" + e).click(), Hi.Tooltip.show(), "End" == wallJson.activeState ? layer.msg("活动已结束！") : "NoStart" == wallJson.activeState && layer.msg("活动未开始！"), setTimeout(function () {
            $("#wallcontrol").css("bottom", "-75px")
        }, 3e3)
    }, function () {
        console.error(arguments)
    }).always(function () {
        console.log("-------Init end-------", Hi.Time.now()), console.groupEnd(), Hi.LoadAnimate.set(100)()
    }), $(window).load(function () {
        e()
    }), $(window).resize(function () {
        e()
    })
});
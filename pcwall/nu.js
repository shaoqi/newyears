var Hi = Hi || {};
Hi.Cookie = {
    put: function (t, e, n, i, r) {
        i || (i = "/"), n || (n = 30);
        var a = new Date;
        a.setDate(a.getDate() + n);
        var o = t + "=" + escape(e) + ";expires=" + a.toGMTString() + ";path=" + i;
        return r && (o += ";" + r), document.cookie = o, this
    },
    get: function (t) {
        return document.cookie.length > 0 && (c_start = document.cookie.indexOf(t + "="), c_start != -1) ? (c_start =
            c_start + t.length + 1, c_end = document.cookie.indexOf(";", c_start), c_end == -1 && (c_end = document.cookie
            .length), unescape(document.cookie.substring(c_start, c_end))) : null
    },
    delete: function (t, e) {
        e || (e = "/");
        var n = new Date;
        n.setTime(n.getTime() - 1), document.cookie = t + "=;path=" + e + ";expires=" + n.toGMTString()
    }
}, Hi.Date = {
    format: function (t, e) {
        var n = {
            "M+": t.getMonth() + 1,
            "d+": t.getDate(),
            "h+": t.getHours(),
            "m+": t.getMinutes(),
            "s+": t.getSeconds(),
            "q+": Math.floor((t.getMonth() + 3) / 3),
            S: t.getMilliseconds()
        };
        /(y+)/.test(e) && (e = e.replace(RegExp.$1, (t.getFullYear() + "").substr(4 - RegExp.$1.length)));
        for (var i in n) new RegExp("(" + i + ")").test(e) && (e = e.replace(RegExp.$1, 1 == RegExp.$1.length ? n[i] :
                ("00" + n[i]).substr(("" + n[i]).length)));
        return e
    }
}, Hi.String = {
    getDate: function (t) {
        if (!t) return "";
        var e = Date.parse(t);
        return isNaN(e) && (e = Date.parse(t.replace(/-/g, "/"))), isNaN(e) && t.length > 23 && (e = Date.parse(t.substr(
            0, 23))), new Date(e)
    },
    formatDate: function (t, e) {
        return t ? Hi.Date.format(Hi.String.getDate(t), e) : ""
    },
    utf16ToUtf8: function (t) {
        var e, n, i, r;
        for (e = "", i = t.length, n = 0; n < i; n++) r = t.charCodeAt(n), r >= 1 && r <= 127 ? e += t.charAt(n) : r >
                2047 ? (e += String.fromCharCode(224 | r >> 12 & 15), e += String.fromCharCode(128 | r >> 6 & 63), e +=
                String.fromCharCode(128 | r >> 0 & 63)) : (e += String.fromCharCode(192 | r >> 6 & 31), e += String.fromCharCode(
                128 | r >> 0 & 63));
        return e
    },
    utf8ToUtf16: function (t) {
        var e, n, i, r, a, o;
        for (e = "", i = this.length, n = 0; n < i;) switch (r = this.charCodeAt(n++), r >> 4) {
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
                e += this.charAt(n - 1);
                break;
            case 12:
            case 13:
                a = this.charCodeAt(n++), e += String.fromCharCode((31 & r) << 6 | 63 & a);
                break;
            case 14:
                a = this.charCodeAt(n++), o = this.charCodeAt(n++), e += String.fromCharCode((15 & r) << 12 | (63 & a) <<
                    6 | (63 & o) << 0)
        }
        return e
    },
    dealUrl: function (t, e) {
        if (!t) return "";
        var n = t;
        return Hi.String.startWith(n, "http://") || Hi.String.startWith(n, "https://") ? n : (e || (e = imgdomain ?
            imgdomain : "http://img.wkey.cn/"), Hi.String.endWith(e, "/") || Hi.String.startWith(n, "/") || (e += "/"),
            Hi.String.endWith(e, "/") && Hi.String.startWith(n, "/") && (e = e.substr(0, e.length - 1)), e + n)
    },
    replaceAll: function (t, e, n) {
        return t ? t.replace(new RegExp(e, "gm"), n) : {}
    },
    toJson: function (t) {
        return t ? JSON.parse(t.replaceAll('"', '"')) : {}
    },
    startWith: function (t, e) {
        return !(!t || !e) && (!(e.length > t.length) && t.substr(0, e.length) == e)
    },
    endWith: function (t, e) {
        return !(!t || !e) && (!(e.length > t.length) && t.substring(t.length - e.length) == e)
    },
    html: function () {
        var t = {
            "<": "<",
            ">": ">",
            '"': "\"",
            "'": "'",
            " ": " "
        }, e = {
                "<": "<",
                ">": ">",
                "\"": '"',
                "'": "'",
                " ": " "
            }, n = function (t, e) {
                if (!t) return "";
                var n = t;
                return Object.keys(e).forEach(function (t) {
                    n = Hi.String.replaceAll(n, t, e[t])
                }), n
            };
        return {
            encode: function (e) {
                return n(e, t)
            },
            decode: function (t) {
                return n(t, e)
            }
        }
    }(),
    testMail: function (t) {
        return /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
            .test(t)
    },
    testPhone: function (t) {
        return /^1[34578]\d{9}$/.test(t)
    }
}, Hi.Array = {
    insert: function (t, e, n) {
        t.splice(e, 0, n)
    },
    indexOf: function (t) {
        for (var e = 0; e < t.length; e++) if (t[e] == val) return e;
        return -1
    },
    remove: function (t, e) {
        var n = t.indexOf(e);
        n > -1 && t.splice(n, 1)
    },
    contains: function (t, e) {
        for (var n = 0; n < t.length; n++) if (JSON.stringify(e) == JSON.stringify(t[n])) return !0;
        return !1
    }
}, Hi.Map = function () {
    this.elements = new Array, this.size = function () {
        return this.elements.length
    }, this.isEmpty = function () {
        return this.elements.length < 1
    }, this.clear = function () {
        this.elements = new Array
    }, this.put = function (t, e) {
        this.remove(t), this.elements.push({
            key: t,
            value: e
        })
    }, this.remove = function (t) {
        var e = !1;
        try {
            for (i = 0; i < this.elements.length; i++) if (this.elements[i].key == t) return this.elements.splice(i, 1), !
                        0
        } catch (t) {
            e = !1
        }
        return e
    }, this.get = function (t) {
        try {
            for (i = 0; i < this.elements.length; i++) if (this.elements[i].key == t) return this.elements[i].value
        } catch (t) {
            return null
        }
    }, this.element = function (t) {
        return t < 0 || t >= this.elements.length ? null : this.elements[t]
    }, this.containsKey = function (t) {
        var e = !1;
        try {
            for (i = 0; i < this.elements.length; i++) this.elements[i].key == t && (e = !0)
        } catch (t) {
            e = !1
        }
        return e
    }, this.containsValue = function (t) {
        var e = !1;
        try {
            for (i = 0; i < this.elements.length; i++) this.elements[i].value == t && (e = !0)
        } catch (t) {
            e = !1
        }
        return e
    }, this.values = function () {
        var t = new Array;
        for (i = 0; i < this.elements.length; i++) t.push(this.elements[i].value);
        return t
    }, this.keys = function () {
        var t = new Array;
        for (i = 0; i < this.elements.length; i++) t.push(this.elements[i].key);
        return t
    }
}, Hi.List = function () {
    this.value = [], this.add = function (t) {
        return this.value.push(t)
    }, this.size = function () {
        return this.value.length
    }, this.get = function (t) {
        return this.value[t]
    }, this.put = function (t, e) {
        this.value[t] = e
    }, this.remove = function (t) {
        return this.value.splice(t, 1), this.value
    }, this.removeAll = function () {
        return this.value = []
    }, this.constains = function (t) {
        for (var e in this.value) if (t == this.value[e]) return !0;
        return !1
    }, this.getAll = function () {
        var t = "";
        for (var e in this.value) t += e != this.value.length - 1 ? this.value[e] + "," : this.value[e];
        return t += this.value[e] + ","
    }
}, Hi.LinkedList = function (t) {
    this.name = t || "id", this.all = []
}, Hi.LinkedList.prototype.append = function (t) {
    var e = {
        prev: 0,
        data: t,
        next: 0
    };
    if (this.all.length) {
        var n = this.all[this.all.length - 1];
        e.prev = n.data[this.name], n.next = e.data[this.name]
    }
    this.all.push(e)
}, Hi.Socket = function (t) {
    var e = {
        baseUrl: wsdomain,
        uri: "",
        onOpen: function () {},
        onMessage: function (t) {},
        onClose: function (t) {
            close()
        }
    };
    this.setting = $.extend(e, t), this.socket = null
}, Hi.Socket.prototype = {
    connect: function () {
        if ("WebSocket" in window) this.socket = new WebSocket(this.setting.baseUrl + this.setting.uri);
        else {
            if (!("MozWebSocket" in window)) throw new Error("浏览器不支持socket");
            this.socket = new MozWebSocket(this.setting.baseUrl + this.setting.uri)
        }
        this.socket.onopen = this.setting.onOpen, this.socket.onmessage = this.setting.onMessage, this.socket.onclose =
            this.setting.onClose
    },
    close: function () {
        this.socket && this.socket.close()
    },
    send: function (t) {
        this.socket && this.socket.send(t)
    }
}, Hi.Anchor = function () {
    this.anchor = {};
    var t = window.location.hash;
    if (!t) return this;
    Hi.String.startWith(t, "#") && (t = t.substr(1, t.length));
    for (var e = t.split("&"), n = 0; n < e.length; n++) {
        var i = e[n].split("="),
            r = i[0] || "",
            a = i[1] || "";
        this.put(r, a)
    }
}, Hi.Anchor.prototype = {
    put: function (t, e) {
        return this.anchor[t] = e, this
    },
    remove: function (t) {
        return delete this.anchor[t], this
    },
    get: function (t) {
        var e = this.anchor[t];
        return e || ""
    },
    done: function () {
        var t = "";
        for (var e in this.anchor) t += e + "=" + this.anchor[e] + "&";
        t = t.substr(0, t.length - 1), window.location.hash = t
    }
}, Hi.Dc = function (t) {
    this.data = t, this.set = {}
}, Hi.Dc.query = function (t) {
    return new Hi.Dc(t)
}, Hi.Dc.prototype = {
    setting: function (t) {
        return t && (this.set = t), this
    },
    page: function (t, e) {
        return this.data || (this.data = {}), this.data.pageIndex = t, this.data.pageSize = e, this
    },
    sort: function (t) {
        return this.data.sort = t, this
    },
    include: function (t) {
        return this.data.include = t, this
    },
    except: function (t) {
        return this.data.except = t, this
    },
    timeout: function (t) {
        return this.timeout = t, this
    },
    post: function (t, e) {
        var n = this,
            i = n.timeout || 3e4,
            r = "dataContent=" + encodeURIComponent(JSON.stringify(n.data || {}));
        $.ajax({
            url: t,
            timeout: i,
            data: r,
            dataType: "json",
            type: "POST",
            success: function (t) {
                e && e(null, t.dataContent, t.systemContent)
            },
            error: function (t, i, r) {
                if (!n.set.ignoreTimeout && 500 == t.status && t.responseJSON) {
                    var a = t.responseJSON;
                    if (a.systemContent) {
                        if ("LoginTimeout" == a.systemContent.state) return void(window.location.href =
                                "/web/user/login.html");
                        if ("SuperLoginTimeout" == a.systemContent.state) return void(window.location.href =
                                "/websuper/user/login.html")
                    }
                }
                var o = t.responseJSON;
                o ? e && e(o.systemContent) : e && e({
                    state: 500,
                    msg: "未知异常"
                })
            }
        })
    },
    toJson: function () {
        return JSON.stringify(this.data || {})
    }
},
function (t) {
    t.fn.serializeForm = function () {
        var e = this,
            n = {}, i = e.serializeArray();
        e.serialize();
        return t(i).each(function (e, i) {
            n[i.name] ? t.isArray(n[i.name]) ? n[i.name].push(i.value) : n[i.name] = [n[i.name], i.value] : n[i.name] =
                i.value
        }), n
    }
}(window.jQuery || window.Zepto),
function (t) {
    var e = {
        init: function (t, n) {
            return function () {
                e.fillHtml(t, n), e.bindEvent(t, n)
            }()
        },
        fillHtml: function (t, e) {
            return function () {
                t.empty(), e.current > 1 ? t.append('<a title="上一页" href="javascript:;" class="prevPage">ᐸ</a>') : (t.remove(
                    ".prevPage"), t.append('<span class="disabled">ᐸ</span>')), 1 != e.current && e.current >= 4 && 4 !=
                    e.pageCount && t.append('<a href="javascript:;" class="tcdNumber">1</a>'), e.current - 2 > 2 && e.current <=
                    e.pageCount && e.pageCount > 5 && t.append('<a class="jump-prev"></a>');
                var n = e.current - 2,
                    i = e.current + 2;
                for ((n > 1 && e.current < 4 || 1 == e.current) && i++, e.current > e.pageCount - 4 && e.current >= e.pageCount &&
                    n--; n <= i; n++) n <= e.pageCount && n >= 1 && (n != e.current ? t.append(
                        '<a href="javascript:;" class="tcdNumber">' + n + "</a>") : t.append('<span class="current">' +
                        n + "</span>"));
                e.current + 2 < e.pageCount - 1 && e.current >= 1 && e.pageCount > 5 && t.append(
                    '<a class="jump-next"></a>'), e.current != e.pageCount && e.current < e.pageCount - 2 && 4 != e.pageCount &&
                    t.append('<a href="javascript:;" class="tcdNumber">' + e.pageCount + "</a>"), e.current < e.pageCount ?
                    t.append('<a title="下一页" href="javascript:;" class="nextPage">ᐳ</a>') : (t.remove(".nextPage"), t.append(
                    '<span class="disabled">ᐳ</span>'))
            }()
        },
        bindEvent: function (n, i) {
            n.unbind("click");
            var r = function (t) {
                var r = parseInt(n.children("span.current").text()),
                    a = r + t;
                a < 1 && (a = 1), a > i.pageCount && (a = i.pageCount), e.fillHtml(n, {
                    current: a,
                    pageCount: i.pageCount
                }), "function" == typeof i.backFn && i.backFn(a)
            };
            return function () {
                n.on("click", "a.tcdNumber", function () {
                    var r = parseInt(t(this).text());
                    e.fillHtml(n, {
                        current: r,
                        pageCount: i.pageCount
                    }), "function" == typeof i.backFn && i.backFn(r)
                }), n.on("click", "a.jump-prev", function () {
                    r(-4)
                }), n.on("click", "a.prevPage", function () {
                    r(-1)
                }), n.on("click", "a.nextPage", function () {
                    r(1)
                }), n.on("click", "a.jump-next", function () {
                    r(4)
                })
            }()
        }
    };
    t.fn.createPage = function (n) {
        var i = t.extend({
            pageCount: 10,
            current: 1,
            backFn: function () {}
        }, n),
            r = this;
        return e.init(r, i),
        function (t, n) {
            i.current = t, i.pageCount = n, e.fillHtml(r, i)
        }
    }
}(window.jQuery || window.Zepto),
function (t) {
    Hi.Page = function (e, n, i, r) {
        4 != arguments.length && console.warn("参数不够,参数列表为(dom,dc,url,fn)"), e[0] || (e = t(e));
        var a = e,
            o = null,
            s = n.data.pageIndex,
            u = n.data.pageSize;
        s || (s = 1), u || (u = 10);
        var c = function (t, e) {
            var s = Hi.Loading();
            n.page(t, e).post(i, function (t, n) {
                if (t) return r && r(t), void setTimeout(s, 200);
                var i = n.totalPages,
                    u = n.pageIndex;
                o ? o(u, i) : o = a.createPage({
                    pageCount: i,
                    current: u,
                    backFn: function (t) {
                        c(t, e)
                    }
                }), r && r(t, n), setTimeout(s, 200)
            })
        };
        return c(s, u), {
            reload: function () {
                c(s, u)
            }
        }
    }
}(window.jQuery || window.Zepto), Hi.Loading = function () {
    var t = layer.load(0, {
        shade: [.7, "#6C6C6C"]
    });
    return function () {
        layer.close(t)
    }
},
function (t) {
    Hi.Upload = function (e, n) {
        2 != arguments.length && console.warn("参数不够,参数列表为(dom,fn)"), e[0] || (e = t(e));
        var i = e,
            r = "/admin/common/upload/ajax.html",
            a = t('<input type="file">'),
            o = i.outerWidth(),
            s = i.outerHeight();
        a.css({
            position: "absolute",
            cursor: "pointer",
            opacity: 0,
            overflow: "hidden",
            top: 0,
            left: 0,
            width: o + "px",
            height: s + "px"
        }), i.append(a), a.change(function () {
            for (var t = ( !! i.attr("multiple"), this.files), a = new FormData, o = 0, s = t.length; o < s; o++) a.append(
                    "uploadFiles[]", t[o]);
            var u = new XMLHttpRequest;
            u.open("post", r, !0), u.timeout = 1e4, u.ontimeout = function () {
                console.log(arguments), n && n.bind(e)("超时")
            }, u.onload = function () {
                var t = JSON.parse(this.response);
                n && n.bind(e)(t.systemContent.msg, t.dataContent)
            }, u.upload.addEventListener("progress", function (t) {}, !1), u.send(a)
        })
    }
}(window.jQuery || window.Zepto), Hi.SaveAs = function () {
    var t = function () {
        var t = 0;
        return {
            reset: function () {
                t = 0
            },
            next: function () {
                return ++t
            }
        }
    }(),
        e = function (e, n, i) {
            var r = function () {
                var e = $.Deferred();
                !n instanceof jQuery && (n = $(n)), t.reset();
                var i = [];
                return n.each(function () {
                    var e = {
                        worksheetName: "",
                        rowArr: []
                    }, n = $(this);
                    e.worksheetName = n.attr("data-sheetname") || "Sheet" + t.next();
                    var r = e.rowArr;
                    n.find("tr").each(function () {
                        var t = {
                            cellArr: []
                        }, e = $(this),
                            n = e.attr("data-height");
                        n && function () {
                            t.height = n
                        }();
                        var i = t.cellArr;
                        e.find("td").each(function () {
                            var t = {
                                type: "String",
                                content: ""
                            }, e = $(this),
                                n = e.attr("data-type");
                            n && function () {
                                t.type = n
                            }();
                            var r = e.html();
                            r && function () {
                                var e = r.replace(/<br>|<\/br>/g, "");
                                e = e.replace(/<[^>]+>|\t|\n/g, ""), t.content = e
                            }(), i.push(t)
                        }), i.length && r.push(t)
                    }), r.length && i.push(e)
                }), e.resolve(i), e.promise()
            };
            "function" === $.type(n) && (r = function () {
                var t = $.Deferred();
                return t.resolve(n()), t.promise()
            });
            var a = function () {
                var t = $.Deferred();
                return $("#excelTemp").length ? t.resolve() : $.get("/js/utils/excel-template.htm", function (e) {
                    $("body").append(e), t.resolve()
                }, "html"), t.promise()
            };
            a().then(r).then(function (t) {
                template.config("compress", !0);
                var n = template("excelTemp", {
                    list: t
                });
                Hi.SaveAs.save(e, n)
            }, function () {
                consol.error("导出发生错误")
            })
        }, n = function (t, e, n) {
            var n = n || "application/vnd.ms-excel";
            if ("undefined" != typeof msie && msie > 0 || navigator.userAgent.match(/Trident.*rv\:11\./)) if (
                    "undefined" != typeof Blob) {
                    var i = new Blob([e], {
                        type: n
                    });
                    window.navigator.msSaveBlob(i, t)
                } else {
                    var r = $("iframe.savefile");
                    r.length && r.remove(), r = $('<iframe class="savefile" style="display: none;"></iframe>'), $(
                        "body").append(r), r[0].document.open(n, "replace"), r[0].document.write(e), r[0].document.close(),
                        r[0].focus(), r[0].document.execCommand("SaveAs", !0, t)
                } else {
                    var a = "data:" + n + ";base64," + window.btoa(unescape(encodeURIComponent(e))),
                        o = document.createElement("a");
                    o.download = t, o.href = a, document.body.appendChild(o), o.click(), document.body.removeChild(o)
                }
        };
    return {
        save: n,
        excel: e
    }
}(), Hi.Throttle = function () {
    var t = function (t, e, n) {
        var i, r, a, o, s, u = function () {
                var c = +new Date - o;
                c < e && c >= 0 ? i = setTimeout(u, e - c) : (i = null, n || (s = t.apply(a, r), i || (a = r = null)))
            };
        return function () {
            a = this, r = arguments, o = +new Date;
            var c = n && !i;
            return i || (i = setTimeout(u, e)), c && (s = t.apply(a, r), a = r = null), s
        }
    }, e = function (t, e, n) {
            var i, r, a, o = null,
                s = 0;
            n || (n = {});
            var u = function () {
                s = n.leading === !1 ? 0 : +new Date, o = null, a = t.apply(i, r), o || (i = r = null)
            };
            return function () {
                var c = +new Date;
                s || n.leading !== !1 || (s = c);
                var l = e - (c - s);
                return i = this, r = arguments, l <= 0 || l > e ? (o && (clearTimeout(o), o = null), s = c, a = t.apply(
                    i, r), o || (i = r = null)) : o || n.trailing === !1 || (o = setTimeout(u, l)), a
            }
        };
    return {
        debounce: t,
        throttle: e
    }
}(), Math.accAdd = function (t, e) {
    var n, i, r;
    try {
        n = t.toString().split(".")[1].length
    } catch (t) {
        n = 0
    }
    try {
        i = e.toString().split(".")[1].length
    } catch (t) {
        i = 0
    }
    return r = Math.pow(10, Math.max(n, i)), (t * r + e * r) / r
}, Math.accSub = function (t, e) {
    var n, i, r, a;
    try {
        n = t.toString().split(".")[1].length
    } catch (t) {
        n = 0
    }
    try {
        i = e.toString().split(".")[1].length
    } catch (t) {
        i = 0
    }
    return r = Math.pow(10, Math.max(n, i)), a = n >= i ? n : i, parseFloat(((t * r - e * r) / r).toFixed(a))
}, Math.accMul = function (t, e) {
    var n = 0,
        i = t.toString(),
        r = e.toString();
    try {
        n += i.split(".")[1].length
    } catch (t) {}
    try {
        n += r.split(".")[1].length
    } catch (t) {}
    return Number(i.replace(".", "")) * Number(r.replace(".", "")) / Math.pow(10, n)
}, Math.accDiv = function (t, e) {
    var n, i, r = 0,
        a = 0;
    try {
        r = t.toString().split(".")[1].length
    } catch (t) {}
    try {
        a = e.toString().split(".")[1].length
    } catch (t) {}
    return n = Number(t.toString().replace(".", "")), i = Number(e.toString().replace(".", "")), n / i * Math.pow(10, a -
        r)
};
function empty (mixedVar) {
  //  discuss at: http://locutus.io/php/empty/
  // original by: Philippe Baumann
  //    input by: Onno Marsman (https://twitter.com/onnomarsman)
  //    input by: LH
  //    input by: Stoyan Kyosev (http://www.svest.org/)
  // bugfixed by: Kevin van Zonneveld (http://kvz.io)
  // improved by: Onno Marsman (https://twitter.com/onnomarsman)
  // improved by: Francesco
  // improved by: Marc Jansen
  // improved by: Rafał Kukawski (http://blog.kukawski.pl)
  //   example 1: empty(null)
  //   returns 1: true
  //   example 2: empty(undefined)
  //   returns 2: true
  //   example 3: empty([])
  //   returns 3: true
  //   example 4: empty({})
  //   returns 4: true
  //   example 5: empty({'aFunc' : function () { alert('humpty'); } })
  //   returns 5: false

  var undef
  var key
  var i
  var len
  var emptyValues = [undef, null, false, 0, '', '0']

  for (i = 0, len = emptyValues.length; i < len; i++) {
    if (mixedVar === emptyValues[i]) {
      return true
    }
  }

  if (typeof mixedVar === 'object') {
    for (key in mixedVar) {
      if (mixedVar.hasOwnProperty(key)) {
        return false
      }
    }
    return true
  }

  return false
}
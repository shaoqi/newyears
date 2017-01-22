/*
 * Author: Anser
 * License: MIT license
 */
;
(function($) {
    'use strict';
    var dmWidth = 0,
        dmHeight = 0;

    function DanMuMsg(setting) {
        this.conf = jQuery.extend({
            danMu: null,
            msgData: {},
            lineNum: 1, // 行号
            time: 5000, // 几秒中运动完成
            defaultHead: '',
        }, setting || {});
        this.danMuJquery = this.conf.danMu.conf.danMuJquery;
        this.lineObj = this.danMuJquery.find('div[data-i="' + this.conf.lineNum + '"]');
        this.msgObj = null;
        this.msgWidth = 0; // 用于存储消息的宽度

        this.speed = 7; // 每毫秒移动的位移
    }
    DanMuMsg.prototype = {
        loadImg: function(url, fn) {
            if (null == url || '' == $.trim(url)) {
                fn && fn(img);
                return;
            }
            if (fn) {
                var img = new Image();
                try {
                    img.onload = function() {
                        img.onload = null;
                        fn && fn(img);
                    };
                    img.onerror = function(e) {
                        fn && fn(img, e);
                    };
                    img.src = url;
                } catch (e) {
                    fn && fn(img, e);
                }
            }
        },
        getHtml: function() {
            // 获取单条消息的html
            if (this.conf.danMu.conf.getMsgHtml) {
                return $(this.conf.danMu.conf.getMsgHtml(this.conf.msgData));
            }
            var arr = [];
            arr.push('<div class="msg">');
            arr.push(this.conf.msgData.text);
            arr.push('</div>');
            return $(arr.join(''));
        },
        appendToHtml: function() {
            var msg = this.getHtml();
            this.msgObj = msg;
            msg.css('transform', 'matrix(1, 0, 0, 1,' + dmWidth + ', 0)');
            this.lineObj.append(msg);
            this.msgWidth = msg.outerWidth(true);

            this.speed = (dmWidth + this.msgWidth) / this.conf.time;
        },
        init: function(fn) {
            // 消息初始化
            var _this = this;
            if (_this.conf.msgData.imgpath) { // 弹幕显示若头像进行图片预加载
                // 预加载用户头像
                _this.loadImg(_this.conf.msgData.imgpath, function(img, e) {
                    if (e) {
                        // 加载失败
                        _this.conf.msgData.imgpath = _this.conf.defaultHead;
                    }
                    // 消息初始化
                    _this.appendToHtml();
                    fn && fn(_this);
                });
            } else {
                _this.appendToHtml();
                fn && fn(_this);
            }
        },
        play: function() {
            var _this = this;
            var time = _this.conf.time;
            var transition = 'transform ' + (time / 1000).toFixed(2) + 's linear';
            _this.msgObj.css({
                'transition': transition,
                '-moz-transition': transition,
                '-webkit-transition': transition,
                '-o-transition': transition,
            }).css('transform', 'matrix(1, 0, 0, 1, ' + -_this.msgWidth + ', 0)');
            return { time: time, msgObj: _this.msgObj };
        },
        stop: function() {
            this.msgObj.css('transform', '');
            return this;
        }
    };

    // 弹幕单行对象
    function DanMuLine(setting) {
        this.conf = jQuery.extend({
            danMu: null,
            lineHeight: setting.danMu.conf.lineHeight,
        }, setting || {});
        if (!this.conf.lineNum) {
            throw new Error('lineNum is not allow empty!');
        }
        this.lineObj = null;
        this.magList = []; // 保存所有的消息对象

    }
    DanMuLine.prototype = {
        checkLine: function(msgData, startFn, finishFn, fn) {
            var _this = this;
            // 不支持就直接返回null如果支持了就直接放入行进行后续操作
            var flag = true;
            // 获取该行最后面的消息剩余运动时间
            // 在配置的最小和最大时间中随机到一个时间然后判断该时间是否会出现消息重叠
            var newTime = Math.random() * (_this.conf.danMu.conf.maxTime - _this.conf.danMu.conf.minTime) + _this.conf.danMu.conf.minTime;
            new DanMuMsg({
                danMu: _this.conf.danMu,
                msgData: msgData,
                time: newTime,
                lineNum: _this.conf.lineNum,
                defaultHead: _this.conf.defaultHead,
            }).init(function(dmmf) {
                // 图片加载完成
                var len = _this.magList.length;
                var lastMsg = null;
                if (len) {
                    lastMsg = _this.magList[len - 1];
                    // 计算旧消息运动结束需要的时间
                    var matrixStr = lastMsg.msgObj.css('transform');
                    var left = 0;
                    try {
                        left = $.trim(matrixStr.split(',')[4]);
                    } catch (e) {}
                    var lastLeft = parseInt(left);
                    // 最后一条还没有完全出来就直接跳过
                    if (dmWidth - lastLeft < lastMsg.msgWidth) {
                        flag = false;
                    } else {
                        var lastTime = (lastLeft + lastMsg.msgWidth) / lastMsg.speed;
                        var newL = dmmf.speed * lastTime;
                        if (newL > dmWidth) {
                            flag = false;
                        }
                    }
                };

                if (flag) {
                    // 创建msg对象并放入行中
                    var returnObj = dmmf.play();
                    setTimeout(function() {
                        returnObj.msgObj.fadeOut(300, function() {
                            returnObj.msgObj.remove();
                            _this.magList.shift();
                            // 结束隐藏回调
                            finishFn && finishFn(msgData);
                        });
                    }, returnObj.time + 5000);

                    _this.magList.push(dmmf);

                    startFn && startFn(msgData);
                    fn && fn(dmmf);
                } else {
                    dmmf.msgObj.remove();
                    fn && fn(null);
                }
            });
        },
        getMaxLineNum: function() {
            var lineNum = 0;
            $('div[data-i]').each(function(i, ele) {
                var num = parseInt($(ele).attr('data-i'));
                if (lineNum < num) {
                    lineNum = num;
                }
            });
            return lineNum;
        },
        getHtml: function() {
            var arr = [];
            arr.push('<div style="height:' + this.conf.lineHeight + 'px;" class="line" data-i="');
            arr.push(this.conf.lineNum);
            arr.push('"></div>');
            return $(arr.join(''));
        },
        appendToHtml: function() {
            var lineObj = this.getHtml();
            this.conf.danMu.conf.danMuJquery.append(lineObj);
            this.lineObj = lineObj;
        },
        init: function() {
            this.appendToHtml();
            return this;
        },
    };
    // 弹幕对象
    function DanMu(setting) {
        this.conf = jQuery.extend({
            lineHeight: 64,
            danMuJquery: $('.danMu'),
            minTime: 5000, // 最少时间
            maxTime: 10000, // 最多时间

            position: ['top', 'middle', 'bottom'],

            getMsgHtml: null,
        }, setting || {});
        this.conf.danMuJquery.empty();
        this.lines = [];

        var danMuHeight = this.conf.danMuJquery.height();
        var lineHeight = this.conf.lineHeight || $('.line').outerHeight(true);
        this.lineCount = this.conf.lineCount || parseInt(danMuHeight / lineHeight);
    }
    DanMu.prototype = {
        init: function() {
            var _this = this;
            _this.conf.danMuJquery.empty();
            var createLine = function(num) {
                var dml = new DanMuLine({
                    danMu: _this,
                    lineNum: num + 1,
                    defaultHead: _this.conf.defaultHead,
                });
                dml.init();
                _this.lines.push(dml);
                return dml;
            };
            createLine(0); // 用于自动计算行数如果没定义
            for (var i = 1; i < _this.lineCount; i++) {
                createLine(i);
            }
            return _this;
        },
        push: function(msgObj, startFn, finishFn) {
            if (!msgObj) {
                startFn && startFn(msgObj);
                finishFn && finishFn(msgObj);
                return;
            }
            var _this = this;
            var pushObj = function(msgObj) {
                var position = _this.conf.position,
                    lineCount = _this.conf.lineCount || _this.lineCount,
                    displayArr = [], //显示的行号组成的数组
                    t = Math.round(lineCount * 0.27), //各区域所占百分比  top 27%  middle 52%  bottom  21%
                    m = Math.round(lineCount * 0.52),
                    b = Math.round(lineCount * 0.21);
                for (var i = lineCount - 1; i >= 0; i--) {
                    displayArr.push(i);
                }
                displayArr.reverse();
                //生成显示的行号组成的数组
                switch (position) {
                    case '["top"]':
                        displayArr = displayArr.splice(0, t);
                        break;
                    case '["middle"]':
                        displayArr = displayArr.splice(t, m);
                        break;
                    case '["bottom"]':
                        displayArr = displayArr.splice(-b);
                        break;
                    case '["top","bottom"]':
                        displayArr.splice(t, m);
                        break;
                    case '["middle","bottom"]':
                        displayArr.splice(0, t);
                        break;
                    case '["top","middle"]':
                        displayArr.splice(-b);
                        break;
                }
                var random = displayArr[parseInt(Math.random() * displayArr.length)];
                _this.lines[random].checkLine(msgObj, startFn, finishFn, function(obj) {
                    if (!obj) {
                        setTimeout(function() {
                            pushObj(msgObj);
                        }, 500);
                    }
                });
            };
            pushObj(msgObj);
            return this;
        },
    };

    $.fn.danMu = function(setting) {
        var _this = $(this);

        dmWidth = _this.outerWidth(true);
        dmHeight = _this.outerHeight(true);
        setting = $.extend({
            danMuJquery: _this
        }, setting || {});
        var dm = new DanMu(setting);
        return dm;
    };
})(jQuery);


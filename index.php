<?php
include __DIR__ . DIRECTORY_SEPARATOR . 'common.php';
$sql = 'SELECT count(`id`) as tal,`tid` FROM  `wx_top` GROUP BY `tid`';
$db_total = $dbh->query($sql)->fetchAll(PDO::FETCH_ASSOC);
$total = [];
foreach ($db_total as $v) {
    $total[$v['tid']] = $v['tal'];
}
$voteSubject = [];
foreach ($options as $k => $v) {
    $voteSubject[] = [
        "id" => $k,
        "createDate" => "2016-11-28T13:32:33.000+0800",
        "updateDate" => "2016-11-28T13:32:33.000+0800",
        "deleteTag" => "N",
        "userId" => 6,
        "wallId" => 58683076,
        "subjectId" => 5532354,
        "optionName" => $v,
        "optionImg" => null,
        "count" => isset($total[$k]) ? $total[$k] : 0,
        "seq" => $k,
        "offCount" => 0
    ];
}
$loatty = $dbh->query('SELECT `id`, `awardname`, `prizename`, `prizenum`, `status` FROM `wx_lottery`')->fetchAll(PDO::FETCH_ASSOC);
// 生成config
$walllotteryAwardsList=[];
foreach($loatty as $vale){
    $walllotteryAwardsList[]=['id'=>$vale['id'],'awardName'=>$vale['awardname'],'prizeName'=>$vale['prizename'],''];
}
?>
<!DOCTYPE html>
<html lang="zh">
<head>
    <meta charset="UTF-8">
    <meta name="keywords" content="飞友科技2016年年会,微信墙,微信大屏幕,微信上墙,微现场,微信互动,年会策划,年会节目,年会抽奖,婚礼互动,酒吧互动,摇一摇,摇红包,3D签到">
    <meta name="description" content="飞友科技2016年年会 - 微信墙 - 微信大屏幕">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,10,11">
    <meta name="renderer" content="webkit"/>
    <link rel="shortcut icon" href="//www.variflight.com/_newstatic/dest/img/favicon.ico"/>
    <link rel="stylesheet" href="/font-ico/style.css?v=201612313"/>
    <link rel="stylesheet" href="/css/common.css?v=201612313"/>
    <link rel="stylesheet" href="/css/emoji.css">
    <link rel="stylesheet" href="/css/defaultwall.css?v=201612313"/>
    <link rel="stylesheet" href="//cdn.bootcss.com/tooltipster/3.3.0/css/tooltipster.min.css"/>
    <link rel="stylesheet" href="//cdn.bootcss.com/layer/3.0.1/skin/default/layer.min.css"/>
    <title>飞友科技 - 青春无限，全新蜕变</title>
</head>
<body>
<style>
    * {
        margin: 0;
        padding: 0;
    }

    html {
        -webkit-text-size-adjust: 100%;
        -ms-text-size-adjust: 100%;
        -webkit-font-smoothing: antialiased;
        font-family: 'Roboto Slab', 'Microsoft YaHei';
    }

    div, p, h1, h2, h3, h4, h5, h6, strong, span, em, pre, ul, ol, li, dl, dt, dd, nav, footer {
        padding: 0;
        margin: 0;
    }

    ul, ol, li {
        list-style: none;
        padding: 0;
        margin: 0;
    }

    img, a img {
        border: 0;
    }

    #chromeTip {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 10000;
        padding-top: 30px;
        width: 100%;
        background-color: #ff9000;
        color: #FFF;
        text-align: center;
        display: none;
    }

    .chrm-word1 {
        font-weight: lighter;
        font-size: 12px;
    }

    .chrm-word2 {
        padding: 30px 0;
        line-height: 42px;
    }

    .chrm-word2 a {
        display: inline-block;
        overflow: hidden;
        margin: 0 18px;
        width: 42px;
        height: 42px;
        background: url(/images/index/browser.png) no-repeat center;
        color: #FFF;
        text-indent: 70px;
        background-origin: content-box;
        vertical-align: middle;
    }

    a.browser-chrome {
        background-position: 0 0;
    }

    a.browser-chrome:hover {
        background-position: 0 -60px;
    }

    a.btntips-close, a.btntips-close:link, a.btntips-close:visited, a.btntips-close:hover {
        position: absolute;
        top: 10px;
        right: 6%;
        color: #FFF;
        text-align: center;
        text-decoration: none;
        font-size: 28px;
    }
</style>
<div id="chromeTip">
    <a id="chromeTipCloseBtn" class="btntips-close" href="javascript:void(0);">×</a>
    <p class="chrm-word1">由于您正在使用非谷歌内核的浏览器，Hi现场将无法为您提供最佳体验，建议您更换浏览器，以获得最佳体验。</p>
    <p class="chrm-word2">我们推荐您使用：
        <a target="_blank" class="browser-chrome" href="http://rj.baidu.com/soft/detail/14744.html?ald">chrome</a>谷歌浏览器
        或者 切换到极速模式下浏览
    </p>
</div>
<script>

    var tipObj = document.getElementById('chromeTip');
    if (tipObj) {
        if (navigator.userAgent.indexOf('Chrome') == -1 || navigator.userAgent.indexOf('Edge') != -1) {
            tipObj.style.display = 'block';
            setTimeout(function () {
                tipObj.style.display = 'none';
            }, 10000);
        }
        document.getElementById('chromeTipCloseBtn').onclick = function () {
            tipObj.style.display = 'none';
        }
    }
</script>
<div id="wall" data-modle="wall-html-body"></div>
<div class="m-progress">
    <div class="m-prog-box">
        <div class="progress-line">
            <div class="prog-groove">
                <div class="run-way">
                    <div class="motion-obj"><span class="mo-line one"></span><span class="mo-line two"></span><span
                            class="mo-line three"></span></div>
                    <div id="load-runing" class="load-groove"></div>
                </div>
            </div>
        </div>
        <div class="progress-fulled">
            <img src="/images/wall/loops.gif">
            <div class="loaded-animate">
                <div class="loaded-tag">
                    <div class="loaded-tag-shadow"></div>
                    <i class="hi-check"></i>
                </div>
            </div>
        </div>
    </div>
</div>
<div id="danmu-wall" class="danmuwall"></div>
<div class="holdscreen-wall-mask"></div>
<div id="holdscreen-wall" class="holdscreen-wall clearfix"></div>
<div id="wallcontrol" class="" data-modle="wall-modle-control"></div>
<div id="allTemplate" data-modle="wall-modle-template"></div>
<script src="//cdn.bootcss.com/jquery/2.2.3/jquery.min.js"></script>
<script src="//cdn.bootcss.com/jquery-easing/1.4.1/jquery.easing.min.js"></script>
<script src="/pcwall/jquery.indexeddb.min.js"></script>
<script src="/pcwall/jquery.hotkeys.min.js"></script>
<script src="/pcwall/jquery.base64.min.js"></script>
<script src="//cdn.bootcss.com/tooltipster/3.3.0/js/jquery.tooltipster.min.js"></script>
<script src="//cdn.bootcss.com/layer/3.0.1/layer.min.js"></script>
<script src="/pcwall/layer.ext.js?v=1"></script>
<script src="/pcwall/template.js"></script>
<script src="/pcwall/jquery-danmu.js"></script>
<script src="//cdn.bootcss.com/randomcolor/0.4.4/randomColor.min.js"></script>
<script src="//cdn.bootcss.com/snabbt.js/0.6.4/snabbt.min.js"></script>
<script type="text/javascript">
    var v = '201612313',
        wallJson = {
            "id": 58683076,
            "createDate": "2016-11-28T13:32:33.000+0800",
            "updateDate": "2016-11-28T13:39:58.000+0800",
            "deleteTag": "N",
            "userId": 6,
            "theme": "青春无限，全新蜕变",
            "title": "<p style=\"text-align: center;\"><strong><span style=\"color: rgb(255, 192, 0); font-size: 48px; font-family: 隶书, SimLi;\"><span style=\"color: rgb(255, 192, 0); font-size: 48px; font-family: 楷体, 楷体_GB2312, SimKai;\"><span style=\"color: rgb(255, 192, 0); font-family: 微软雅黑, 'Microsoft YaHei'; font-size: 36px;\">青春无限，全新蜕变</span></span></span></strong></p>",
            "startDate": "2016-11-28T00:00:00.000+0800",
            "endDate": "2017-06-30T00:00:00.000+0800",
            "backgroundImg": null,
            "word": null,
            "logo": "http://www.variflight.com/_newstatic/dest/img/logo.png",
            "qrCode": "http://img.wkey.cn/group3/M00/17/26/yq0KZVWoYoeAFWmYAACbJTedZzc957.jpg",
            "ruleDes": "PHAgc3R5bGU9InRleHQtYWxpZ246IGNlbnRlcjsiPjxzcGFuIHN0eWxlPSJmb250LWZhbWlseTog5b6u6L2v6ZuF6buRLCAnTWljcm9zb2Z0IFlhSGVpJzsgY29sb3I6IHJnYigwLCAwLCAwKTsiPuaJq+aPj+S6jOe7tOeggeKAnDwvc3Bhbj48c3Ryb25nPjxzcGFuIHN0eWxlPSJmb250LWZhbWlseTog5b6u6L2v6ZuF6buRLCAnTWljcm9zb2Z0IFlhSGVpJzsgY29sb3I6IHJnYigwLCAwLCAwKTsiPuetvuWIsDwvc3Bhbj48L3N0cm9uZz48c3BhbiBzdHlsZT0iZm9udC1mYW1pbHk6IOW+rui9r+mbhem7kSwgJ01pY3Jvc29mdCBZYUhlaSc7IGNvbG9yOiByZ2IoMCwgMCwgMCk7Ij7igJ3ljbPlj6/lj4LkuI7kupLliqjlpKflsY/luZU8L3NwYW4+PC9wPg==",
            "sponsor": "[{\"img\":\"http://www.variflight.com/_newstatic/dest/img/logo.png\",\"cont\":\"<p>青春无限，全新蜕变</p>\"},{\"img\":\"http://img.wkey.cn/group4/M00/A3/2B/yq0KYFcDmG6AOg8NAAFNHd7u39k218.png\",\"cont\":\"<p>关注飞常准招聘签到即可上墙</p>\"}]",
            "activeState": "In",
            "examine": "N",
            "filterWords": "Y",
            "useMode": "Y",
            "outTime": 2,
            "styleName": "systemBlueLeft",
            "flag": "ecb20fd4acc94bdcbc1d6a3a5cea6777",
            "onWallMsgNum": 0,
            "partakeNum": 0,
            "pendingNum": 0,
            "type": "NoBound",
            "tempStyle": "{\"userHeadShape\":\"0\",\"messageShape\":\"0\",\"flipEffect\":\"simplified\",\"sponerAlign\":\"center\",\"msgOpacity\":\"3\",\"fontColor\":\"#fff\",\"customBg\":\"#fff\",\"msglength\":\"4\"}",
            "qrText": "PHA+5omr5o+P5LqM57u056CB5YWz5rOo4oCcPHN0cm9uZz7po57luLjlh4bmi5vogZg8L3N0cm9uZz7igJ3lhazkvJflj7fvvIznrb7liLDlj4LkuI7kupLliqjlpKflsY/luZU8L3A+",
            "encodeFlag": "Y",
            "comeFrom": "normal",
            "wallapplysignDesign": null,
            "enterprise": "N"
        },
        flag = wallJson.flag,
        allConfig = {
            "wallvoteConfig": {
                "id": 5532349,
                "createDate": "2016-11-28T13:32:33.000+0800",
                "updateDate": "2016-12-31T10:59:08.000+0800",
                "deleteTag": "N",
                "userId": 6,
                "openState": "Y",
                "subjectId": 5532354,
                "word": "投票",
                "voteState": "Y",
                "wallId": 58683076,
                "wallvoteSubject": {
                    "id": 5532354,
                    "createDate": "2016-11-28T13:32:33.000+0800",
                    "updateDate": "2016-11-28T13:32:33.000+0800",
                    "deleteTag": "N",
                    "userId": 6,
                    "voteConfigId": 5532349,
                    "name": "我喜爱的节目",
                    "type": "Checkbox",
                    "wallId": 58683076,
                    "items": <?php echo json_encode($voteSubject);?>,
                    "use": null,
                    "multipleNumber": 0,
                    "minNumber": 0,
                    "screenShow": null,
                    "textImage": null,
                    "joinCount": <?php echo array_sum($total);?>
                }
            },
            "wallpicConfig": {
                "id": 608856,
                "createDate": "2016-11-28T13:32:33.000+0800",
                "updateDate": "2016-11-28T13:32:33.000+0800",
                "deleteTag": "N",
                "userId": 6,
                "openState": "Y",
                "source": "WallPic",
                "wallId": 58683076
            },
            "walllotteryConfig": {
                "id": 1517599,
                "deleteTag": "N",
                "userId": 6,
                "openState": "Y",
                "word": "兑奖",
                "password": "888888",
                "lotteryId": 1669454,
                "walllotteryAwards": {
                    "id": 1669454,
                    "userId": 6,
                    "prizeImg": "http://img.wkey.cn/group1/M00/FF/56/yq0KA1U_fp-AI5ndAAEabt3Pc8I425.png",
                    "awardName": "青春无限，全新蜕变",
                    "prizeName": "现场大奖",
                    "prizeNum": 200,
                    "singleNum": 1,
                    "use": null,
                },
                "walllotteryAwardsList": [{
                    "id": 1669403,
                    "userId": 6,
                    "prizeImg": "http://img.wkey.cn/group1/M00/FF/56/yq0KA1U_fp-AI5ndAAEabt3Pc8I425.png",
                    "awardName": "青春无限，全新蜕变",
                    "prizeName": "现场大奖",
                    "prizeNum": 200,
                    "singleNum": 2,
                    "use": null,
                }, {
                    "id": 1669454,
                    "createDate": "2016-12-23T16:33:32.000+0800",
                    "updateDate": "2016-12-23T16:33:32.000+0800",
                    "deleteTag": "N",
                    "userId": 6,
                    "lotteryConfigId": 1517599,
                    "prizeImg": "http://img.wkey.cn/group1/M00/FF/56/yq0KA1U_fp-AI5ndAAEabt3Pc8I425.png",
                    "awardName": "青春无限，全新蜕变",
                    "prizeName": "现场大奖",
                    "prizeNum": 200,
                    "singleNum": 3,
                    "use": null,
                    "conditionTag": "N",
                    "config": null,
                    "wallId": 58683076
                }],
                "flash": "Y",
                "wallId": 58683076
            },
            "wallrewardConfig": {
                "id": 59347,
                "createDate": "2016-11-28T13:32:50.000+0800",
                "updateDate": "2017-01-02T13:49:43.000+0800",
                "deleteTag": "N",
                "userId": 6,
                "wallId": 58683076,
                "openState": "N",
                "rewardId": 59348,
                "keyword": "打赏",
                "vipLimit": null,
                "wallreward": null
            },
            "wallshakeprizeConfig": {
                "id": 2990767,
                "createDate": "2016-11-28T13:32:34.000+0800",
                "updateDate": "2017-01-03T14:23:17.000+0800",
                "deleteTag": "N",
                "userId": 6,
                "wallId": 58683076,
                "openState": "N",
                "shakeprizeId": 2990765,
                "wallshakeprize": {
                    "id": 2990765,
                    "createDate": "2016-11-28T13:32:34.000+0800",
                    "updateDate": "2016-11-29T15:35:26.000+0800",
                    "deleteTag": "N",
                    "userId": 6,
                    "wallId": 58683076,
                    "title": "大奖摇出来",
                    "shakeTime": 30,
                    "state": "End",
                    "shakePrizeState": null,
                    "awardsNumber": 0,
                    "type": null,
                    "awardsList": [{
                        "id": 2990766,
                        "createDate": "2016-11-28T13:32:34.000+0800",
                        "updateDate": "2016-11-28T13:32:34.000+0800",
                        "deleteTag": "N",
                        "userId": 6,
                        "wallId": 58683076,
                        "prizeId": 2990765,
                        "prizeType": "kind",
                        "prizeImg": null,
                        "prizeName": "现场奖品",
                        "prizeCount": 10,
                        "prizeRemark": "恭喜中奖！                                                                     请尽快联系主办方领奖吧\n\t\t\t\t\t\t\t\t\t",
                        "prizeAction": null
                    }]
                },
                "keyword": "摇大奖",
                "repeatSwitch": "N"
            },
            "wallmstchingConfig": {
                "id": 569556,
                "createDate": "2016-11-28T13:32:34.000+0800",
                "updateDate": "2016-11-28T13:32:34.000+0800",
                "deleteTag": "N",
                "userId": 6,
                "wallId": 58683076,
                "leftName": "幸福队",
                "rightName": "开心队",
                "crowd": "registed",
                "dispalyType": "vs",
                "openState": "N",
                "keyword": null,
                "mstchType": "custom",
                "flash": null,
                "leftNumber": 0,
                "rightNumber": 0,
                "inited": "Y"
            },
            "wallmsgConfig": {
                "id": 504249,
                "createDate": "2016-11-28T13:32:33.000+0800",
                "updateDate": "2016-11-28T13:32:33.000+0800",
                "deleteTag": "N",
                "userId": 6,
                "openState": "Y",
                "turnTime": 3,
                "showCount": "Y",
                "wallId": 58683076
            },
            "walldanmuConfig": {
                "id": 425563,
                "createDate": "2016-11-28T13:32:34.000+0800",
                "updateDate": "2016-11-28T13:32:34.000+0800",
                "deleteTag": "N",
                "userId": 6,
                "wallId": 58683076,
                "style": "simple",
                "position": "[\"top\",\"middle\",\"bottom\"]",
                "fontsize": "48px",
                "speed": "0.3",
                "loop": "Y"
            },
            "wallredpackConfig": {
                "id": 327308,
                "createDate": "2016-11-28T13:39:24.000+0800",
                "updateDate": "2017-01-03T09:40:11.000+0800",
                "deleteTag": "N",
                "userId": 6,
                "wallId": 58683076,
                "openState": "Y",
                "redpackId": 629720,
                "keyword": "摇红包",
                "repeatSwitch": "N",
                "vipLimit": null,
                "wallredpack": null
            },
            "wallsignthreedConfig": {
                "id": 13533,
                "createDate": "2016-11-28T13:32:57.000+0800",
                "updateDate": "2016-11-28T13:32:57.000+0800",
                "deleteTag": "N",
                "userId": 6,
                "wallId": 58683076,
                "openState": "Y",
                "virtualHeadimg": "Y",
                "vipLimit": null
            },
            "wallguestConfig": {
                "id": 213900,
                "createDate": "2016-11-28T13:32:33.000+0800",
                "updateDate": "2016-11-28T13:32:33.000+0800",
                "deleteTag": "N",
                "openState": "Y",
                "userId": 6,
                "wallId": 58683076
            },
            "wallholdscreenConfig": {
                "id": 22956,
                "createDate": "2016-11-28T13:32:50.000+0800",
                "updateDate": "2016-11-28T13:32:50.000+0800",
                "deleteTag": "N",
                "userId": 6,
                "wallId": 58683076,
                "openState": "N",
                "isAudit": "N",
                "price": 10,
                "vipLimit": null
            },
            "wallapplysignConfig": {
                "id": 3290331,
                "createDate": "2016-11-28T13:32:50.000+0800",
                "updateDate": "2016-11-28T13:32:50.000+0800",
                "deleteTag": "N",
                "userId": 6,
                "wallId": 58683076,
                "openState": "Y",
                "type": "verify",
                "startDate": null,
                "endDate": null,
                "signCheck": "Y",
                "applyCheck": "Y",
                "displayType": "nickname",
                "timeCheck": "N",
                "logoDesign": "eyJjb2wiOjIwLCJyb3ciOjE1LCJsb2dvcGljIjoiL2ltYWdlcy9zZXQvaGVhcnQtZGVmYXVsdC5qcGciLCJzcXVyZUNvbG9yIjoiI2U1MDE1MCIsImNlbGxOdW0iOjQwLCJzaG93Q2VsbCI6WyIxMyoxMCIsIjEzKjkiLCIxMioxMSIsIjEyKjEwIiwiMTIqOSIsIjEyKjgiLCIxMSoxMiIsIjExKjExIiwiMTEqMTAiLCIxMSo5IiwiMTEqOCIsIjExKjciLCIxMCoxMyIsIjEwKjEyIiwiMTAqMTEiLCIxMCoxMCIsIjEwKjkiLCIxMCo4IiwiMTAqNyIsIjEwKjYiLCI5KjE1IiwiOSoxNCIsIjkqMTMiLCI5KjEyIiwiOSoxMSIsIjkqMTAiLCI5KjkiLCI5KjgiLCI5KjciLCI5KjYiLCI5KjUiLCI5KjQiLCI4KjE2IiwiOCoxNSIsIjgqMTQiLCI4KjEzIiwiOCoxMiIsIjgqMTEiLCI4KjEwIiwiOCo5IiwiOCo4IiwiOCo3IiwiOCo2IiwiOCo1IiwiOCo0IiwiOCozIiwiNyoxNyIsIjcqMTYiLCI3KjE1IiwiNyoxNCIsIjcqMTMiLCI3KjEyIiwiNyoxMSIsIjcqMTAiLCI3KjkiLCI3KjgiLCI3KjciLCI3KjYiLCI3KjUiLCI3KjQiLCI3KjMiLCI3KjIiLCI2KjE4IiwiNioxNyIsIjYqMTYiLCI2KjE1IiwiNioxNCIsIjYqMTMiLCI2KjEyIiwiNioxMSIsIjYqMTAiLCI2KjkiLCI2KjgiLCI2KjciLCI2KjYiLCI2KjUiLCI2KjQiLCI2KjMiLCI2KjIiLCI2KjEiLCI1KjE4IiwiNSoxNyIsIjUqMTYiLCI1KjE1IiwiNSoxNCIsIjUqMTMiLCI1KjEyIiwiNSoxMSIsIjUqMTAiLCI1KjkiLCI1KjgiLCI1KjciLCI1KjYiLCI1KjUiLCI1KjQiLCI1KjMiLCI1KjIiLCI1KjEiLCI0KjE4IiwiNCoxNyIsIjQqMTYiLCI0KjE1IiwiNCoxNCIsIjQqMTMiLCI0KjEyIiwiNCoxMSIsIjQqMTAiLCI0KjkiLCI0KjgiLCI0KjciLCI0KjYiLCI0KjUiLCI0KjQiLCI0KjMiLCI0KjIiLCI0KjEiLCIzKjE4IiwiMyoxNyIsIjMqMTYiLCIzKjE1IiwiMyoxNCIsIjMqMTMiLCIzKjEyIiwiMyoxMSIsIjMqMTAiLCIzKjkiLCIzKjgiLCIzKjciLCIzKjYiLCIzKjUiLCIzKjQiLCIzKjMiLCIzKjIiLCIzKjEiLCIyKjE3IiwiMioxNiIsIjIqMTUiLCIyKjE0IiwiMioxMyIsIjIqMTIiLCIyKjExIiwiMio4IiwiMio3IiwiMio2IiwiMio1IiwiMio0IiwiMiozIiwiMioyIiwiMSoxNiIsIjEqMTUiLCIxKjE0IiwiMSoxMyIsIjEqMTIiLCIxKjciLCIxKjYiLCIxKjUiLCIxKjQiLCIxKjMiLCIwKjE1IiwiMCoxNCIsIjAqMTMiLCIwKjYiLCIwKjUiLCIwKjQiXX0=",
                "forceSign": "N",
                "applyFormtype": "hixianchang",
                "eqxiuScene": null
            },
            "wallshakeConfig": {
                "id": 14232755,
                "createDate": "2016-11-28T13:32:34.000+0800",
                "updateDate": "2017-01-03T14:38:00.000+0800",
                "deleteTag": "N",
                "openState": "N",
                "userId": 6,
                "shakeId": 17531263,
                "keyword": "摇一摇",
                "wallshake": {
                    "id": 17531263,
                    "createDate": "2017-01-03T14:38:00.000+0800",
                    "updateDate": "2017-01-03T14:38:00.000+0800",
                    "deleteTag": "N",
                    "userId": 6,
                    "title": "Hi现场摇一摇！（第一百八十二轮）",
                    "shakeTime": 30,
                    "rank": 10,
                    "wallId": 58683076,
                    "shakeState": null,
                    "configId": 14232755,
                    "comeFrom": "System",
                    "sourceId": 14233079,
                    "type": "jd"
                },
                "blackSwitch": "N",
                "blackRank": 0,
                "blackRound": 0,
                "wallId": 58683076,
                "vipLimit": null
            },
            "wallmoneyConfig": {
                "id": 2643179,
                "createDate": "2016-11-28T13:32:34.000+0800",
                "updateDate": "2017-01-03T12:01:40.000+0800",
                "deleteTag": "N",
                "openState": "N",
                "userId": 6,
                "wallId": 58683076,
                "moneyId": 3166618,
                "keyword": "数钱",
                "joinNumber": 0,
                "blackSwitch": "N",
                "blackRank": 1,
                "blackRound": 1
            }
        },
        wwwdomain = 'http://www.hixianchang.com/',
        imgdomain = 'http://res3.hixianchang.com/',
        wsdomain = 'ws://ws.hixianchang.com/',
        env = 'test';
</script>
<script src="/pcwall/nu.js?v=201612313"></script>
<script src="/pcwall/config.js?v=201612313"></script>
<script src="/pcwall/wall.js"></script>
</body>
</html>
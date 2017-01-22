<?php
/**
 * Created by PhpStorm.
 * User: phpboy
 * Date: 2017/1/19
 * Time: 1:16
 */
//include __DIR__.DIRECTORY_SEPARATOR.'manage.php';
?>
<!doctype html>
<html class="no-js">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="description" content="">
    <meta name="keywords" content="">
    <meta name="viewport"
          content="width=device-width, initial-scale=1">
    <title>年会控制台</title>
    <!-- Set render engine for 360 browser -->
    <meta name="renderer" content="webkit">
    <!-- No Baidu Siteapp-->
    <meta http-equiv="Cache-Control" content="no-siteapp"/>
    <!-- Add to homescreen for Chrome on Android -->
    <meta name="mobile-web-app-capable" content="yes">
    <!-- Add to homescreen for Safari on iOS -->
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <meta name="apple-mobile-web-app-title" content="Amaze UI"/>
    <!-- Tile icon for Win8 (144x144 + tile color) -->
    <meta name="msapplication-TileColor" content="#0e90d2">
    <link rel="stylesheet" href="http://cdn.amazeui.org/amazeui/2.7.2/css/amazeui.min.css">
</head>
<body>
<div class="am-g">
    <div class="am-u-sm-4">
        <section class="am-panel am-panel-default">
            <header class="am-panel-hd">
                <h3 class="am-panel-title">抽奖管理</h3>
            </header>
            <div class="am-panel-bd">
                面板内容
            </div>
        </section>
    </div>
    <div class="am-u-sm-4">
        <section class="am-panel am-panel-default">
            <header class="am-panel-hd">
                <h3 class="am-panel-title">投票时间设置</h3>
            </header>
            <div class="am-panel-bd">
                <form action="" class="am-form am-form-inline">
                    <div class="am-form-group am-form-icon">
                        <i class="am-icon-clock-o"></i>
                        <input type="text" class="am-form-field" placeholder="开始时间">
                    </div>
                    <div class="am-form-group am-form-icon">
                        <i class="am-icon-clock-o"></i>
                        <input type="text" class="am-form-field" placeholder="结束时间">
                    </div>
                    <p><button type="button" class="am-btn am-btn-default">提交</button></p>
                </form>
            </div>
        </section>
    </div>
    <div class="am-u-sm-4">
        <section class="am-panel am-panel-default">
            <header class="am-panel-hd">
                <h3 class="am-panel-title">直播消息</h3>
            </header>
            <div class="am-panel-bd">
                <form class="am-form">
                <div class="am-form-group">
                    <textarea class="" rows="5" id="doc-ta-1"></textarea>
                </div>
                <p><button type="button" class="am-btn am-btn-default">发送</button></p>
                </form>
            </div>
        </section>
    </div>
</div>
<section class="am-panel am-panel-default">
    <header class="am-panel-hd">
        <h3 class="am-panel-title">直播消息-已发送</h3>
    </header>
    <div class="am-panel-bd">
        面板内容
    </div>
</section>
<section class="am-panel am-panel-default">
    <header class="am-panel-hd">
        <h3 class="am-panel-title">中奖人员名单</h3>
    </header>
    <div class="am-panel-bd">
        面板内容
    </div>
</section>
<!--在这里编写你的代码-->

<!--[if (gte IE 9)|!(IE)]><!-->
<script src="http://libs.baidu.com/jquery/1.11.3/jquery.min.js"></script>
<!--<![endif]-->
<!--[if lte IE 8 ]>
<script src="http://libs.baidu.com/jquery/1.11.3/jquery.min.js"></script>
<script src="http://cdn.staticfile.org/modernizr/2.8.3/modernizr.js"></script>
<script src="http://cdn.amazeui.org/amazeui/2.7.2/js/amazeui.ie8polyfill.min.js"></script>
<![endif]-->
<script src="http://cdn.amazeui.org/amazeui/2.7.2/js/amazeui.min.js"></script>
</body>
</html>

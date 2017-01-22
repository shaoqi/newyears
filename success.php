<?php
/**
 * Created by PhpStorm.
 * User: phpboy
 * Date: 2017/1/17
 * Time: 15:31
 */
include __DIR__.DIRECTORY_SEPARATOR.'common.php';
if(empty($_COOKIE['auth'])){
    $auth = &load_wechat('Oauth');
    if(empty($_GET['state'])){
        $url = $auth->getOauthRedirect('http://newyearp.feeyo.com/top.php?test=1', 'newyear','snsapi_userinfo');
        header('Location:'.$url);
        exit;
    }else{
        $token = $auth->getOauthAccessToken();
        if(empty($token)){
            exit('程序错误请重试');
        }
        $useinfo = $auth->getOauthUserInfo($token['access_token'], $token['openid']);
        if(empty($useinfo)){
            exit('授权失败请重新授权');
        }
        $open_id = $token['openid'];
        // 写入cookie
        setcookie('auth',$token['openid'],time()+3600,'/','newyearp.feeyo.com',false,true);
    }
}else{
    $open_id = $_COOKIE['auth'];
}
$wxjs = &load_wechat('Script');
$token = $wxjs->getAccessToken();
$jsapi=$wxjs->getJsSign('http://newyearp.feeyo.com/success.php',time(),'',$wxjs->appid,$token);
?>
<!doctype html>
<html lang="en" class="bg bg-success">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>投票成功</title>
    <link rel="stylesheet" href="css/screen.css">
</head>
<body>
<div id="layer">
    <img src="images/erweima.jpg" alt="">
</div>
<div class="logo-header">
    <img src="images/logo-header.png" alt="">
</div>
<div class="suc-tip">
    <h1><img src="images/suc-pic.png" alt=""></h1>
    <p>投票成功!<br>
        感谢您的参与<br></p>
</div>
<div class="infor">
    <div class="infor-wrap">
        <p class="indent2em">“飞常准”是一款用于航班信息的跟踪整合，为飞行旅客提供及时有效的航班信息智能预报的APP。“飞常准招聘”微信公众号是“飞常准”唯一官方认证微信招聘宣传渠道。</p>
        <br>
        <table>
            <tr>
                <td>我们期待——</td>
                <td>富有创造力和执行力的你加入我们团队；</td>
            </tr>
            <tr>
                <td>我们提供——</td>
                <td>
                    行业内中上水平的竞争力薪酬；完善的福利体系；<br>
                    人性化的弹性工作时间；<br>
                    舒适的工作环境；<br>
                    轻松的工作氛围；
                </td>
            </tr>
            <tr>
                <td>我们追求——</td>
                <td>让每一位成员收获自我价值实现的喜悦，<br>
                    感受与飞常准的共同发展。</td>
            </tr>
        </table>
        <br>
        <p class="textcenter">岗位详情请关注<a href="javascript:;" id="joinus">“飞常准招聘”</a></p>
    </div>
</div>
<div class="logo-footer">
    <img src="images/logo-footer.png" alt="">
</div>
<script src="js/zepto.min.js"></script>
<script src="https://res.wx.qq.com/open/js/jweixin-1.2.0.js"></script>
<script>
    wx.config(<?php echo json_encode($jsapi);?>);
    wx.ready(function() {
        wx.onMenuShareTimeline({
            title: '2017飞常准&民航资源网年会之我最喜爱的节目', // 分享标题
            link: 'http://newyearp.feeyo.com/top.php?reffer=<?php echo base64_encode(json_encode([
                $open_id,
                'wxq'
            ]));?>', // 分享链接
            imgUrl: 'http://newyearp.feeyo.com/images/newyear.jpg', // 分享图标
            success: function () {
                // 用户确认分享后执行的回调函数
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });
        wx.onMenuShareAppMessage({
            title: '2017飞常准&民航资源网年会之我最喜爱的节目', // 分享标题
            desc: '2017飞常准&民航资源网年会之我最喜爱的节目评选好友助力', // 分享描述
            link: 'http://newyearp.feeyo.com/top.php?reffer=<?php echo base64_encode(json_encode([
                $open_id,
                'wxs'
            ]));?>', // 分享链接
            imgUrl: 'http://newyearp.feeyo.com/images/newyear.jpg', // 分享图标
            type: 'link', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            success: function () {
                // 用户确认分享后执行的回调函数
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });
        wx.onMenuShareQQ({
            title: '2017飞常准&民航资源网年会之我最喜爱的节目', // 分享标题
            desc: '2017飞常准&民航资源网年会之我最喜爱的节目评选好友助力', // 分享描述
            link: 'http://newyearp.feeyo.com/top.php?reffer=<?php echo base64_encode(json_encode([$open_id, 'qq']));?>', // 分享链接
            imgUrl: 'http://newyearp.feeyo.com/images/newyear.jpg', // 分享图标
            success: function () {
                // 用户确认分享后执行的回调函数
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });
        wx.onMenuShareWeibo({
            title: '2017飞常准&民航资源网年会之我最喜爱的节目', // 分享标题
            desc: '2017飞常准&民航资源网年会之我最喜爱的节目评选好友助力', // 分享描述
            link: 'http://newyearp.feeyo.com/top.php?reffer=<?php echo base64_encode(json_encode([
                $open_id,
                'qwb'
            ]));?>', // 分享链接
            imgUrl: 'http://newyearp.feeyo.com/images/newyear.jpg', // 分享图标
            success: function () {
                // 用户确认分享后执行的回调函数
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });
        wx.onMenuShareQZone({
            title: '2017飞常准&民航资源网年会之我最喜爱的节目', // 分享标题
            desc: '2017飞常准&民航资源网年会之我最喜爱的节目评选好友助力', // 分享描述
            link: 'http://newyearp.feeyo.com/top.php?reffer=<?php echo base64_encode(json_encode([$open_id, 'qz']));?>', // 分享链接
            imgUrl: 'http://newyearp.feeyo.com/images/newyear.jpg', // 分享图标
            success: function () {
                // 用户确认分享后执行的回调函数
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });
    });
    Zepto(function(){
        $('#joinus').on('click',function () {
            $('#layer').show()
        })
        $('#layer').on('click',function () {
            $(this).hide()
        })
    })
</script>
</body>
</html>

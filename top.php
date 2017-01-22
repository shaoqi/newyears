<?php
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
$jsapi=$wxjs->getJsSign('http://newyearp.feeyo.com/top.php',time(),'',$wxjs->appid,$token);
$redis = new \Redis();
try {
    $redis->connect(getenv('REDIS_HOST_IP'), getenv('REDIS_HOST_PORT'));
    $redis->auth(getenv('REDIS_HOST_AUTH'));
}catch (RedisException $exception){
    $redis->connect(getenv('REDIS_HOST_IP'), getenv('REDIS_HOST_PORT'));
    $redis->auth(getenv('REDIS_HOST_AUTH'));
}
$min = $redis->get('new_year_top_start');
$max = $redis->get('new_year_top_end');
$now = time();
$min = strtotime('2017-01-20 17:10:00');
$max = time()+20;
if(!empty($_POST['tops'])){
    // 判断时间
    if($now<$min || $now>$max){
        echo json_encode(['code'=>__LINE__,'msg'=>'投票时间尚未开始,请耐心等待']);
        exit;
    }
    // 写入投票项目
    if(!isset($options[$_POST['tops']])){
        echo json_encode(['code'=>__LINE__,'msg'=>'选项不可用']);
        exit;
    }
    $id = md5($_POST['tops'].'_'.$open_id);
    // 如果已经投票 则提示已经投票成功 否则投票
    $sql = 'select id from `wx_top` where openid=:id';
    $pre=$dbh->prepare($sql);
    $pre->bindValue(':id',$open_id,PDO::PARAM_STR);
    $pre->execute();
    $data=$pre->fetch(PDO::FETCH_ASSOC);
    if(empty($data)){
        $sql = 'INSERT INTO `wx_top`(`id`, `tid`, `openid`, `intime`) VALUES (:v1,:v2,:v3,:v4)';
        $pre=$dbh->prepare($sql);
        $pre->execute([':v1'=>$id,':v2'=>$_POST['tops'],':v3'=>$open_id,':v4'=>time()]);
        echo json_encode(['code'=>0,'msg'=>'你成功投票,此时可以分享你的投票结果给朋友,让他们协助投票']);
        exit;
    }else{
        echo json_encode(['code'=>0,'msg'=>'你已经投过票,可以分享你的投票结果给朋友,让他们协助投票']);
        exit;
    }
}
$sql = 'select `id`,`tid` from `wx_top` where openid=:id';
    $pre=$dbh->prepare($sql);
    $pre->bindValue(':id',$open_id,PDO::PARAM_STR);
    $pre->execute();
    $data=$pre->fetch(PDO::FETCH_ASSOC);
$useinfo = $dbh->query('select `id` from `wx_user` WHERE `id`=\''.md5($open_id).'\'')->fetch(PDO::FETCH_ASSOC);
?>
<!doctype html>
<html lang="en" class="bg" style="background: url('images/bg-2.jpg') no-repeat center;-webkit-background-size: cover;background-size: cover;">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta name="renderer" content="webkit">
    <meta http-equiv="Cache-Control" content="no-siteapp"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
    <meta name="HandheldFriendly" content="true">
    <meta name="MobileOptimized" content="320">
    <meta name="screen-orientation" content="portrait">
    <meta name="x5-orientation" content="portrait">
    <meta name="full-screen" content="yes">
    <meta name="x5-fullscreen" content="true">
    <meta name="browsermode" content="application">
    <meta name="x5-page-mode" content="app">
    <meta name="msapplication-tap-highlight" content="no">
    <title>投票</title>
    <link rel="stylesheet" href="css/screen.css">
</head>
<body>
<div id="layer">
    <img src="images/erweima.jpg" alt="">
</div>
<div class="logo-header">
    <img src="images/logo-header.png" alt="">
</div>
<div class="vote-tit">
    <em></em>
    <span>我最喜爱的节目评选</span>
    <em></em>
</div>
<form method="post" action="top.php">
    <div class="vote-form" id="vote-form">
        <div class="vote-form-wrap">
            <?php foreach ($options as $k=>$v){?>
            <p <?php echo  (empty($data['tid'])?(($k==1)?'class="cur"':''):($data['tid']==$k?'class="cur"':''));?>><input <?php echo (empty($data['tid'])?($k==1?'checked="checked"':''):($data['tid']==$k?'checked="checked"':''));?> type="radio" name="tops" id="vote-list-<?= $k;?>" value="<?= $k;?>"><span></span><label for="vote-list-<?= $k;?>"><?= $v;?></label></p>
            <?php }?>
        </div>
    </div>
    <?php if($now>=$min && $now<=$max){
        if(empty($data)){
    ?>
    <div class="vote-form-button"><input type="button" value="立即投票" id="push"></div>
    <?php }}?>
</form>
<?php
// 如果没有关注 则显示下面的内容
if(empty($useinfo['subscribe'])){ ?>
<div class="infor">
    <div class="infor-wrap" style="border-top: 1px solid #ffd38f;">
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
<?php
}
?>
<div class="logo-footer">
    <img src="images/logo-footer.png" alt="">
</div>
<script src="js/zepto.min.js"></script>
<script src="js/layer_mobile/layer.js"></script>
<script src="//res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
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
    window.loading = '';
    Zepto(function(){
        $('#joinus').on('click',function () {
            $('#layer').show()
        });
        $('#layer').on('click',function () {
            $(this).hide()
        });
        $('#vote-form').find('p').on('click',function(){
            $(this).addClass('cur').siblings().removeClass('cur');
            $(this).find('input').prop('checked',true);
            $(this).siblings().find('input').prop('checked',false);
        });
        $('#push').on('click',function () {
            window.loading=layer.open({type: 2,shadeClose:false});
            var val = $('input[type=radio]:checked').val();
            $.post('/top.php',{tops:val},function (ref) {
                layer.close(window.loading);
                if(ref.code){
                    alertMsg(jsons.msg);
                    return false;
                }else{
                    location.href='success.php';
                    return false;
                }
            },'json');
        });
    });
    function alertMsg(msg){
        layer.open({
            content: msg
            , skin: 'msg'
            , time: 2 //2秒后自动关闭
        })
    }
</script>
</body>
</html>
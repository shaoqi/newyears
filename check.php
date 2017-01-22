<?php
include __DIR__.DIRECTORY_SEPARATOR.'common.php';
if(empty($_COOKIE['auth'])){
    $auth = &load_wechat('Oauth');
    if(empty($_GET['state'])){
        $url = $auth->getOauthRedirect('http://newyearp.feeyo.com/check.php?test=1', 'newyear','snsapi_userinfo');
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
        setcookie('auth',$token['openid'],time()+3600*8,'/','newyearp.feeyo.com',false,true);
    }
}
if(!empty($_POST)){
    $tel = trim(filter_input(INPUT_POST,'tel',FILTER_SANITIZE_SPECIAL_CHARS));
    $uname = trim(filter_input(INPUT_POST,'uname',FILTER_SANITIZE_SPECIAL_CHARS));
    if(empty($tel) || empty($uname)) {
        echo json_encode(['code'=>__LINE__,'msg'=>'用户名不能为空']);
        exit;
    }
    $open_id = $_COOKIE['auth'];
    $sql = 'select `id`,`binduid` from `wx_user` WHERE `id`=\''.md5($open_id).'\'';
    $data=$dbh->query($sql)->fetch(PDO::FETCH_ASSOC);
    if(empty($data)){
        echo json_encode(['code'=>__LINE__,'msg'=>'尚未关注公众号请先关注才能签到']);
        exit;
    }
    if(!empty($data['binduid'])){
        echo json_encode(['code'=>__LINE__,'msg'=>'此微信号已经绑定了OA账号信息']);
        exit;
    }
    // 检查输入的内容是否有误
    if(!preg_match('/^(1((3[0-9])|47|5[0-9]|7[0-9]|8[0-9]))\d{8}$/',$tel)){
        echo json_encode(['code'=>__LINE__,'msg'=>'手机号码格式错误']);
        exit;
    }
    $sql = 'select `id` from `wx_true_user` WHERE `loginname`=:v1 AND `phone`=:v2';
    $pre=$dbh->prepare($sql);
    $pre->bindValue(':v1',$uname,PDO::PARAM_STR);
    $pre->bindValue(':v2',$tel,PDO::PARAM_STR);
    $pre->execute();
    $info = $pre->fetch(PDO::FETCH_ASSOC);
    if(empty($info)){
        echo json_encode(['code'=>__LINE__,'msg'=>'OA信息中登陆账号或者手机号不正确']);
        exit;
    }
    // 判断是否已经签到
    $sql = 'select `id`,`nickname` from `wx_user` WHERE `binduid`=:v1';
    $pre=$dbh->prepare($sql);
    $pre->bindValue(':v1',$info['id'],PDO::PARAM_STR);
    $pre->execute();
    $wxuser = $pre->fetch(PDO::FETCH_ASSOC);
    if(!empty($wxuser)){
        echo json_encode(['code'=>__LINE__,'msg'=>'OA信息已经被昵称为['.$wxuser['nickname'].']的用户绑定']);
        exit;
    }
    $sql = 'UPDATE `wx_user` SET `binduid`=:v1,`bindtime`=:v2 WHERE `id`=:id';
    $pre=$dbh->prepare($sql);
    $pre->bindValue(':v1',$info['id'],PDO::PARAM_INT);
    $pre->bindValue(':v2',time(),PDO::PARAM_INT);
    $pre->bindValue(':id',$data['id'],PDO::PARAM_STR);
    $ref=$pre->execute();
    if($ref){
        echo json_encode(['code'=>0,'msg'=>'账号签到成功']);
        exit;
    }
}else{
    $open_id = empty($_COOKIE['auth'])?$open_id:$_COOKIE['auth'];
    $sql = 'select `id`,`binduid` from `wx_user` WHERE `id`=\''.md5($open_id).'\'';
    $data=$dbh->query($sql)->fetch(PDO::FETCH_ASSOC);
    if(!empty($data['binduid'])){
        header('Location:http://newyearp.feeyo.com/top.php');
        exit;
    }
}
?>
<!doctype html>
<html lang="en" class="bg">
<head>
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
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<title>签到</title>
	<link rel="stylesheet" href="css/screen.css">
</head>
<body>
	<div class="logo-header">
		<img src="images/logo-header.png" alt="">
	</div>
	<div class="text-header">
		<div class="text-header-wrap">
			<img src="images/text-header.png" alt="" class="text-header-1">
			<img src="images/text-header-2.png" alt="" class="text-header-2">
		</div>
	</div>
	<form action="" class="index-form">
		<div class="index-form-div index-form-inp"><label for="uname">用户名</label><input type="text" name="uname" id="uname" placeholder="请输入用户名"></div>
		<div class="index-form-div index-form-inp"><label for="tel">手机号</label><input type="tel" name="tel" id="tel" placeholder="请输入手机号"></div>
		<div class="index-form-div index-form-button"><input type="button" value="立即签到"></div>
	</form>
	<div class="logo-footer">
		<img src="images/logo-footer.png" alt="">
	</div>
	<script src="js/zepto.min.js"></script>
	<script src="js/layer_mobile/layer.js"></script>
	<script>
        window.loading = '';
		Zepto(function(){
			$('.index-form-button').on('click',function(){
				var input = $('.index-form-inp');
				input.each(function(i){
					var label = input.eq(i).find('label').text();
					var value = input.eq(i).find('input').val();
					console.log("label:"+label+',phoneNum:'+value);
					if (value == '') {
						alertMsg(label + '不能为空');
						return false;
					} else {
						var reg = /^(1((3[0-9])|47|5[0-9]|7[0-9]|8[0-9]))\d{8}$/;
						if(i == 1){
							if (!reg.test(value)) {
								alertMsg('您输入的手机号码不正确');
								return false;
							} else {
                                // 像后端发送请求
                                window.loading=layer.open({type: 2,shadeClose:false});
                                $.post('/check.php',{tel:input.eq(1).find('input').val(),uname:input.eq(0).find('input').val()},function (jsons) {
                                    layer.close(window.loading);
                                    if(jsons.code){
                                        alertMsg(jsons.msg);
                                        return false;
                                    }else{
                                        alertMsg('签到成功');
                                        window.location.href='/top.php';
                                        return true;
                                    }
                                },'json');
							}
						}
					}
				})
			})
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
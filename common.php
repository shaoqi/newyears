<?php
ini_set('default_socket_timeout', -1);
require __DIR__.DIRECTORY_SEPARATOR.'vendor'.DIRECTORY_SEPARATOR.'autoload.php';
$dotenv= new \Dotenv\Dotenv(__DIR__.DIRECTORY_SEPARATOR);
$dotenv->load();
\Wechat\Loader::register("CacheSet",function($name, $value, $expired){
    $redis = new \Redis();
    try {
        $redis->connect(getenv('REDIS_HOST_IP'), getenv('REDIS_HOST_PORT'));
        $redis->auth(getenv('REDIS_HOST_AUTH'));
    }catch (\RedisException $exception){
        $redis->connect(getenv('REDIS_HOST_IP'), getenv('REDIS_HOST_PORT'));
        $redis->auth(getenv('REDIS_HOST_AUTH'));
    }
    return $redis->setex($name,$expired,$value);
});
\Wechat\Loader::register("CacheGet",function($name){
    $redis = new \Redis();
    try {
        $redis->connect(getenv('REDIS_HOST_IP'), getenv('REDIS_HOST_PORT'));
        $redis->auth(getenv('REDIS_HOST_AUTH'));
    }catch (\RedisException $exception){
        $redis->connect(getenv('REDIS_HOST_IP'), getenv('REDIS_HOST_PORT'));
        $redis->auth(getenv('REDIS_HOST_AUTH'));
    }
    return $redis->get($name);
});
\Wechat\Loader::register("CacheDel",function($name){
    $redis = new \Redis();
    try {
        $redis->connect(getenv('REDIS_HOST_IP'), getenv('REDIS_HOST_PORT'));
        $redis->auth(getenv('REDIS_HOST_AUTH'));
    }catch (\RedisException $exception){
        $redis->connect(getenv('REDIS_HOST_IP'), getenv('REDIS_HOST_PORT'));
        $redis->auth(getenv('REDIS_HOST_AUTH'));
    }
    return $redis->del($name);
});
\Wechat\Loader::register("CachePut",function($line,$filename=''){
    return false;
});
/**
 * 获取微信操作对象（单例模式）
 * @staticvar array $wechat 静态对象缓存对象
 * @param type $type 接口名称 ( Card|Custom|Device|Extend|Media|Oauth|Pay|Receive|Script|User )
 * @return WechatReceive 返回接口对接
 */
function & load_wechat($type = '') {
    static $wechat = [];
    $index = md5(strtolower($type));
    if (!isset($wechat[$index])) {
        // 定义微信公众号配置参数（这里是可以从数据库读取的哦）
        $options = [
            'token'             =>  getenv('WEIXIN_APP_TOKEN'), // 填写你设定的key
            'appid'             =>  getenv('WEIXIN_APP_ID'), // 填写高级调用功能的app id, 请在微信开发模式后台查询
            'appsecret'         =>  getenv('WEIXIN_APP_KEY'), // 填写高级调用功能的密钥
            'encodingaeskey'    =>  getenv('WEIXIN_APP_ENCODING_AES_KEY'), // 填写加密用的EncodingAESKey（可选，接口传输选择加密时必需）
        ];
        \Wechat\Loader::config($options);
        $wechat[$index] = & \Wechat\Loader::get($type);
    }
    return $wechat[$index];
}
$dbh = new PDO('mysql:host=127.0.0.1;port=3306;dbname=newyear;charset=utf8','root','feeyo#1234');
$options = [1=>'舞蹈《worth it》',2=>'CARNOC\'s Secret',3=>'不能说的Magic',4=>'荧光舞',5=>'舞剑',6=>'舞蹈《你干嘛》',7=>'吉他弹唱《青春》',8=>'歌曲串烧',9=>'大合唱《感觉身体被掏空》',10=>'舞蹈《shake it》'];
<?php
/*include __DIR__ . DIRECTORY_SEPARATOR . 'common.php';
$receive = &load_wechat('Receive');
$check = $receive->valid();
function filterEmoji($str)
{
    $str = preg_replace_callback(
        '/./u',
        function (array $match) {
            return strlen($match[0]) >= 4 ? '' : $match[0];
        },
        $str);

    return $str;
}
if (!empty($check)) {
    $redis = new \Redis();
    $redis->connect(getenv('REDIS_HOST_IP'), getenv('REDIS_HOST_PORT'));
    $redis->auth(getenv('REDIS_HOST_AUTH'));
    $receive->getRev();
    $type = $receive->getRevType();
    if (in_array($type, ['text', 'image'])) {
        if ($type == 'image') {
            $pic = $receive->getRevPic();
            $content = empty($pic['picurl']) ? '' : $pic['picurl'];
        } else {
            //$content = emoji_unified_to_html(json_decode(preg_replace("#(\\ue[0-9a-f]{3})#ie","addslashes('\1')",json_encode($receive->getRevContent()))));
            $content = filterEmoji($receive->getRevContent());
        }
        if (!empty($content)) {
            $sql = 'select `id` from `wx_msg` WHERE `id`=:id';
            $pre = $dbh->prepare($sql);
            $pre->bindValue(':id', md5($receive->getRevID()), PDO::PARAM_STR);
            $pre->execute();
            $info = $pre->fetch(PDO::FETCH_ASSOC);
            if (empty($info)) {
                // 消息入库
                $sql = 'INSERT INTO `wx_msg` (`id`, `open_id`,`msgtype`,`contents`,`intime`) VALUES (:v1,:v2,:v3,:v4,:v5)';
                $pre = $dbh->prepare($sql);
                $pre->bindValue(':v1', md5($receive->getRevID()), PDO::PARAM_STR);
                $pre->bindValue(':v2', $receive->getRevFrom(), PDO::PARAM_STR);
                $pre->bindValue(':v3', $type, PDO::PARAM_STR);
                $pre->bindValue(':v4', $content, PDO::PARAM_STR);
                $pre->bindValue(':v5', $receive->getRevCtime(), PDO::PARAM_INT);
                $pre->execute();
                $index_data = $dbh->lastInsertId('req');
                $sql = 'select * from `wx_user` WHERE `id`=:id';
                $pre = $dbh->prepare($sql);
                $pre->bindValue(':id', md5($receive->getRevFrom()), PDO::PARAM_STR);
                $pre->execute();
                $user_info = $pre->fetch(PDO::FETCH_ASSOC);
                // 获取req
                //$reqs = $dbh->query('select `req` from `wx_msg` WHERE `id`=\''.md5($receive->getRevID()).'\'')->fetch(PDO::FETCH_ASSOC);
                // 创建队列值
                $cmdinfo = [
                    "system" => [
                        "cmd" => "newmsg",
                        "secondCmd" => null,
                        "flag" => null,
                        "userFlag" => null,
                        "no" => 1,
                        "sendOne" => false
                    ],
                    "data" => [
                        "operType" => "add",
                        "data" => [
                            "seq" => intval($index_data),
                            "id" => intval($index_data),
                            "nickName" => $user_info['nickname'],
                            "fullName" => "",
                            "imgPath" => $user_info['avatar'],
                            "msgType" => $type,
                            "content" => $content,
                            "noteName" => "",
                            "hide" => "N",
                            "wxUserId" => $receive->getRevFrom(),
                            "msgId" => md5($receive->getRevID())
                        ]
                    ]
                ];
                $redis->rPush('new_year_cmd', base64_encode(json_encode($cmdinfo)));
            }
        }
    } elseif ($type == 'event') {
        $enent = $receive->getRevEvent();
        if ($enent['event'] == 'subscribe' || $enent['event'] == 'SCAN') {
            // 关注微信公众号后 数据入库
            $sql = 'select `id` from `wx_user` WHERE `id`=:id';
            $pre = $dbh->prepare($sql);
            $pre->bindValue(':id', md5($receive->getRevFrom()), PDO::PARAM_STR);
            $pre->execute();
            $info = $pre->fetch(PDO::FETCH_ASSOC);
            if (empty($info)) {
                // 获取用户基本信息
                $sql = 'INSERT INTO `wx_user` (`id`, `open_id`) VALUES (:v1,:v2)';
                $indata = [':v1' => md5($receive->getRevFrom()), ':v2' => $receive->getRevFrom()];
                $user_obj = &load_wechat('User');
                $userinfo = $user_obj->getUserInfo($receive->getRevFrom());
                if (!empty($userinfo)) {
                    $sql = 'INSERT INTO `wx_user` (`id`, `open_id`, `nickname`, `avatar`) VALUES (:v1,:v2,:v3,:v4)';
                    $indata[':v3'] = emoji_unified_to_html($userinfo['nickname']);
                    $indata[':v4'] = $userinfo['headimgurl'];
                }
                $pre = $dbh->prepare($sql, [PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY]);
                $pre->execute($indata);
            }
        }
        if ($enent['event'] == 'subscribe') {
            $receive->text('你好,欢迎关注飞常准招聘');
            $receive->reply();
            exit;
        }
        if ($enent['key'] == 'bulid') {
            $receive->text('此项目正在建设中');
            $receive->reply();
            exit;
        }
    }
    echo 'success';
}*/
echo 'success';
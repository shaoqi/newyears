<?php
/**
 * Created by PhpStorm.
 * User: phpboy
 * Date: 2017/1/10
 * Time: 19:02
 */
include __DIR__ . DIRECTORY_SEPARATOR . 'common.php';
$m = $_GET['m'];
$a = $_GET['a'];
$data = empty($_POST['dataContent']) ? '' : json_decode($_POST['dataContent'], true);
$mintime = empty($data['where']['v']) ? '' : $data['where']['v'];
$return = ['systemContent' => ["state" => "Right", "msg" => ""], 'dataContent' => []];
$page_size = empty($data['pageSize']) ? 0 : $data['pageSize'];
function getradom($min, $max, $len)
{
    $url = 'https://www.random.org/integers/?num=' . $len . '&min=' . $min . '&max=' . $max . '&col=1&base=10&format=plain&rnd=new';
    try {
        $curl = curl_init();
        curl_setopt($curl, CURLOPT_URL, $url);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($curl, CURLOPT_FOLLOWLOCATION, true);
        curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);
        curl_setopt($curl, CURLOPT_USERAGENT,
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36');
        $data = trim(curl_exec($curl));
        curl_close($curl);
    } catch (Exception $e) {
        return getradom($min, $max, $len);
    }
    return array_unique(explode("\n", $data));
}

if ($a == 'cmd') {
    // 读取全部的内容
    // 取出最近五千条的内容
    if ($m == 'sign') {
        // 读取签到的数量
        $sql = 'SELECT `seq`,`id`, `open_id`, `nickname`, `binduid`, `gender`, `avatar` FROM `wx_user` WHERE `binduid`!=0';
        $data = $dbh->query($sql)->fetchAll(PDO::FETCH_ASSOC);
        foreach ($data as $k => $v) {
            $return['dataContent']['data'][] = [
                'operType' => 'add',
                'data' => [
                    'seq' => intval($v['id']),
                    'id' => intval($v['id']),
                    'nickName' => $v['truename'].'<br/>部门:'.$v['department'],
                    'fullName' => '',
                    'imgPath' => $v['avatar'],
                    'gender' => $v['gender'],
                    'noteName' => ''
                ]
            ];
        }
    } elseif ($m == 'msg') {
        $sql = 'SELECT `wx_msg`.`seq`,`wx_msg`.`id` as `msgid`, `wx_msg`.`open_id`, `wx_msg`.`msgtype`, `wx_msg`.`contents`,`wx_user`.`nickname`,`wx_user`.`gender`, `wx_user`.`avatar`  FROM `wx_msg` LEFT JOIN `wx_user` ON `wx_user`.`open_id`=`wx_msg`.`open_id` where `wx_user`.`binduid`!=0 ORDER BY `wx_msg`.`intime` DESC';
        $data = $dbh->query($sql)->fetchAll(PDO::FETCH_ASSOC);
        foreach ($data as $k => $v) {
            $return['dataContent']['data'][] = [
                'operType' => 'add',
                'data' => [
                    'seq' => intval($v['seq']),
                    "id" => intval($v['seq']),
                    "nickName" => $v['nickname'],
                    "fullName" => "",
                    "imgPath" => $v['avatar'],
                    "msgType" => $v['msgtype'],
                    "content" => ($v['msgtype'] == 'image' ? substr($v['contents'], 0, -1) : $v['contents']),
                    "noteName" => "",
                    "hide" => "N",
                    "wxUserId" => $v['open_id'],
                    "msgId" => $v['msgid']
                ]
            ];
        }
    } elseif ($m == 'pic') {
        $sql = 'SELECT `wx_msg`.`seq`,`wx_msg`.`id` as `msgid`, `wx_msg`.`open_id`, `wx_msg`.`msgtype`, `wx_msg`.`contents`,`wx_user`.`nickname`,`wx_user`.`gender`, `wx_user`.`avatar`  FROM `wx_msg` LEFT JOIN `wx_user` ON `wx_user`.`open_id`=`wx_msg`.`open_id` WHERE `wx_msg`.`msgtype`=\'image\' and `wx_user`.`binduid`!=0 ORDER BY `wx_msg`.`intime` DESC';
        $data = $dbh->query($sql)->fetchAll(PDO::FETCH_ASSOC);
        foreach ($data as $k => $v) {
            $return['dataContent']['data'][] = [
                'operType' => 'add',
                'data' => [
                    'seq' => intval($v['seq']),
                    "id" => intval($v['seq']),
                    "nickName" => emoji_unified_to_html(emoji_html_to_unified($v['nickname'])),
                    "fullName" => "",
                    "imgPath" => $v['avatar'],
                    "msgType" => $v['msgtype'],
                    "content" => substr($v['contents'], 0, -1),
                    "noteName" => "",
                    "hide" => "N",
                    "wxUserId" => $v['open_id'],
                    "msgId" => $v['msgid']
                ]
            ];
        }
    } elseif ($m == 'remain') {
        // 读取奖品配置信息
        $c = $_GET['c'];
        switch ($c) {
            case 'count':
                // todo：周五上午修改数据
                $sql = 'SELECT count(`wx_true_user`.`id`) as tal FROM `wx_user` LEFT JOIN  `wx_true_user` ON `wx_true_user`.`id`=`wx_user`.`binduid` WHERE `wx_true_user`.`lotteryId`=0 AND `wx_true_user`.`pic`=1 AND `wx_user`.`binduid`>0';
                $counts = $dbh->query($sql)->fetch(PDO::FETCH_ASSOC);
                $return['dataContent']['notWinNum'] = $counts['tal'];
                break;
            case 'awards':
                if(!empty($data['where']['awardsId'])) {
                    $sql = 'SELECT `id`,`truename`,`position`, `department` FROM `wx_true_user` WHERE `lotteryId`='.intval($data['where']['awardsId']);
                    $data = $dbh->query($sql)->fetchAll(PDO::FETCH_ASSOC);
                    foreach ($data as $v) {
                        $return['dataContent'][] = [
                            "id" => $v['id'],
                            "createDate" => date('Y-m-d H:i:s'),
                            "updateDate" => date('Y-m-d H:i:s'),
                            "deleteTag" => "N",
                            "userId" => 6,
                            "wallId" => 0,
                            "openId" => $v['id'],
                            "nickName" => $v['truename'].$v['department'],
                            "imgpath" => 'http://oa.feeyo.com/photo/' . $v['id'] . '_s.jpg',
                            "gender" => 1,
                            "winId" => $v['id'],
                            "sort" => 0
                        ];
                    }
                }else{
                    $return['dataContent']=[];
                }
                break;
            case 'lottery':
                $lottery_config = $dbh->query('SELECT `id`, `awardname`, `prizename`, `prizenum`, `singlenum`, `status` FROM `wx_lottery` WHERE `status`=1')->fetch(PDO::FETCH_ASSOC);
                // 抽奖人员名单随机抽出
                // 读取已经中奖的人员信息
                $lottery_wins_total = $dbh->query('SELECT count(`id`) as tal FROM `wx_true_user` WHERE `lotteryId`=' . $lottery_config['id'])->fetch(PDO::FETCH_ASSOC);
                $minszie = min($lottery_config['singlenum'],
                    ($lottery_config['prizenum'] - $lottery_wins_total['tal']));
                if (!empty($minszie)) {
                    // 读取尚未中奖的人员名单
                    $lottery_not_wins = $dbh->query('SELECT `wx_true_user`.`id`,`wx_true_user`.`truename`,`wx_true_user`.`position`, `wx_true_user`.`department` FROM `wx_true_user` LEFT JOIN `wx_user` ON `wx_true_user`.`id`=`wx_user`.`binduid` WHERE `wx_true_user`.`lotteryId`=0 AND `wx_true_user`.`pic`=1 AND `wx_user`.`binduid`>0')->fetchAll(PDO::FETCH_ASSOC);
                    $ids = [];
                    $return['dataContent']=[];
                    if(count($lottery_not_wins)>$minszie && count($lottery_not_wins)>1) {
                        $keys = getradom(0, count($lottery_not_wins) - 1, $minszie);
                        foreach ($keys as $v) {
                            $return['dataContent'][] = [
                                'id' => intval($lottery_not_wins[$v]['id']),
                                'userId' => 6,
                                'openId' => intval($lottery_not_wins[$v]['id']),
                                'nickName' => $lottery_not_wins[$v]['truename'] . '<br/>部门:' . $lottery_not_wins[$v]['department'],
                                'imgpath' => 'http://oa.feeyo.com/photo/' . intval($lottery_not_wins[$v]['id']) . '_s.jpg',
                                'gender' => 1,
                                'sort' => 0
                            ];
                            $ids[] = $lottery_not_wins[$v]['id'];
                        }
                    }else{
                        $return['dataContent']=[];
                        foreach($lottery_not_wins as $val){
                            $return['dataContent'][] = [
                            'id' => intval($val['id']),
                            'userId' => 6,
                            'openId' => intval($val['id']),
                            'nickName' => $val['truename'] . '<br/>部门:' . $val['department'],
                            'imgpath' => 'http://oa.feeyo.com/photo/' . intval($val['id']) . '_s.jpg',
                            'gender' => 1,
                            'sort' => 0
                        ];
                        $ids[] = $val['id'];
                        }
                    }
                    // 更新数据库内容
                    $sql = 'UPDATE `wx_true_user` SET `lotteryId`=' . $lottery_config['id'] . ' WHERE `id` IN (\'' . implode('\',\'',
                            $ids) . '\')';
                    $dbh->exec($sql);
                } else {
                    $return['systemContent']['msg'] = '本轮抽奖已经结束,请等待下轮';
                    $return['dataContent'] = [];
                }
                break;
            case
                'winers':
                $sql = 'SELECT `id`, `awardname`, `prizename`, `prizenum`, `singlenum`, `status` FROM `wx_lottery` WHERE `status`=1';
                $lottery_config = $dbh->query($sql)->fetch(PDO::FETCH_ASSOC);
                $sql = 'SELECT `id`,`truename`,`position`, `department` FROM `wx_true_user` WHERE `lotteryId`>0';
                $data = $dbh->query($sql)->fetchAll(PDO::FETCH_ASSOC);
                foreach ($data as $v) {
                    array_push($return['dataContent'], [
                        "id" => $v['id'],
                        "userId" => 6,
                        "wallId" => 0,
                        "openId" => $v['id'],
                        "nickName" => $v['truename'],
                        "imgpath" => 'http://oa.feeyo.com/photo/' . $v['id'] . '_s.jpg',
                        "gender" => 1,
                        "winId" => $v['id'],
                        "sort" => 0
                    ]);
                }
                break;
        }
    } elseif ($m == 'img') {
        //获取参与人员的头像
        $sql = 'SELECT `id`,`truename`,`position`, `department` FROM `wx_true_user` WHERE `wx_true_user`.`pic`=1';
        $data = $dbh->query($sql)->fetchAll(PDO::FETCH_ASSOC);
        $return['dataContent']['totalRows'] = count($data);
        $return['dataContent']['totalPages'] = count($data);
        $return['dataContent']['pageIndex'] = 1;
        foreach ($data as $v) {
            $return['dataContent']['dataList'][] = 'http://oa.feeyo.com/photo/' . $v['id'] . '_s.jpg';
        }
    }
} else {
    // 读取内容
    // 取出最近五千条的内容
    if ($m == 'sign') {
        // 读取签到的数量
        $where = [];
        $where[]='`binduid`!=0';
        if (!empty($mintime)) {
            $where[] = '`bindtime`>' . strtotime($mintime);
        }
        if (!empty($data['where']['seqList'])) {
            $where[] = '`seq` in (\'' . implode('\',\'', $data['where']['seqList']) . '\')';
        }
        $sql = 'SELECT `seq`,`id`, `open_id`, `nickname`, `binduid`, `gender`, `avatar` FROM `wx_user` ' . (empty($where) ? '' : ('where ' . implode(' and ',
                    $where)));
        $data = $dbh->query($sql)->fetchAll(PDO::FETCH_ASSOC);
        foreach ($data as $k => $v) {
            $return['dataContent']['data'][] = [
                'operType' => 'add',
                'data' => [
                    'seq' => intval($v['seq']),
                    'id' => intval($v['seq']),
                    'nickName' => $v['nickname'],
                    'fullName' => '',
                    'imgPath' => $v['avatar'],
                    'gender' => $v['gender'],
                    'noteName' => ''
                ]
            ];
        }
    } elseif ($m == 'msg') {
        $where = [];
        if (!empty($mintime)) {
            $where[] = '`wx_msg`.`intime`>' . strtotime($mintime);
        }
        if (!empty($data['where']['seqList'])) {
            $where[] = '`wx_msg`.`seq` in (\'' . implode('\',\'', $data['where']['seqList']) . '\')';
        }
        $sql = 'SELECT `wx_msg`.`seq`,`wx_msg`.`id` as `msgid`, `wx_msg`.`open_id`, `wx_msg`.`msgtype`, `wx_msg`.`contents`,`wx_user`.`nickname`,`wx_user`.`gender`, `wx_user`.`avatar`  FROM `wx_msg` LEFT JOIN `wx_user` ON `wx_user`.`open_id`=`wx_msg`.`open_id` ' . (empty($where) ? '' : ('where ' . implode(' and ',
                    $where))) . '  ORDER BY `wx_msg`.`intime` DESC';
        $data = $dbh->query($sql)->fetchAll(PDO::FETCH_ASSOC);
        foreach ($data as $k => $v) {
            $return['dataContent']['data'][] = [
                'operType' => 'add',
                'data' => [
                    'seq' => intval($v['seq']),
                    "id" => intval($v['seq']),
                    "nickName" => $v['nickname'],
                    "fullName" => "",
                    "imgPath" => $v['avatar'],
                    "msgType" => $v['msgtype'],
                    "content" => $v['contents'],
                    "noteName" => "",
                    "hide" => "N",
                    "wxUserId" => $v['open_id'],
                    "msgId" => $v['msgid']
                ]
            ];
        }
    } elseif ($m == 'pic') {
        $where = [];
        if (!empty($mintime)) {
            $where[] = '`wx_msg`.`intime`>' . strtotime($mintime);
        }
        if (!empty($data['where']['seqList'])) {
            $where[] = '`wx_msg`.`seq` in (\'' . implode('\',\'', $data['where']['seqList']) . '\')';
        }
        $sql = 'SELECT `wx_msg`.`seq`,`wx_msg`.`id` as `msgid`, `wx_msg`.`open_id`, `wx_msg`.`msgtype`, `wx_msg`.`contents`,`wx_user`.`nickname`,`wx_user`.`gender`, `wx_user`.`avatar`  FROM `wx_msg` LEFT JOIN `wx_user` ON `wx_user`.`open_id`=`wx_msg`.`open_id` WHERE `wx_msg`.`msgtype`=\'image\' ' . (empty($where) ? '' : (' AND ' . implode(' and ',
                    $where))) . ' ORDER BY `wx_msg`.`intime` DESC';
        $data = $dbh->query($sql)->fetchAll(PDO::FETCH_ASSOC);
        foreach ($data as $k => $v) {
            $return['dataContent']['data'][] = [
                'operType' => 'add',
                'data' => [
                    'seq' => intval($v['seq']),
                    "id" => intval($v['seq']),
                    "nickName" => $v['nickname'],
                    "fullName" => "",
                    "imgPath" => $v['avatar'],
                    "msgType" => $v['msgtype'],
                    "content" => $v['contents'],
                    "noteName" => "",
                    "hide" => "N",
                    "wxUserId" => $v['open_id'],
                    "msgId" => $v['msgid']
                ]
            ];
        }
    }
}
if (!empty($return['dataContent']['data'])) {
    $return['dataContent']['v'] = date('Y-m-d H:i:s');
}
echo json_encode($return);
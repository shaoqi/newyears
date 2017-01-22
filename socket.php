<?php
include __DIR__ . DIRECTORY_SEPARATOR . 'common.php';
$cmd = json_decode(base64_decode($_POST['cmd']), true);
$return = ['system' =>[
    "cmd"=>$cmd['system']['cmd'],"secondCmd"=>null,"flag"=>"feeyonewyear","userFlag"=>"RlF2hs80+kgp1BdWFkOLKQ==","no"=>0,"sendOne"=>false],"data"=>[]];
if (!empty($cmd)) {
    switch ($cmd['system']['cmd']) {
        case 'syncVote':
            $sql = 'SELECT count(`id`) as tal,`tid` FROM  `wx_top` GROUP BY `tid`';
            $db_total = $dbh->query($sql)->fetchAll(PDO::FETCH_ASSOC);
            $total = [];
            foreach ($db_total as $v) {
                $total[$v['tid']] = intval($v['tal']);
            }
            foreach ($options as $key=>$v){
                $return['data']['list'][]=["id"=>$key,"createDate"=>null,"updateDate"=>null,"deleteTag"=>null,"count"=>(isset($total[$key])?$total[$key]:0),"subjectId"=>$cmd['data']['where']['subjectId'],"suboptionId"=>$key];
            }
            $return['data']['joinCount']=intval(array_sum($total));
            break;
        case 'globalNote':
            if($cmd['system']['secondCmd']=='wallLotteryStopEvent'){
                // 抽奖
                $return['system']['cmd']='wallLotteryStopEvent';
                $return['system']['secondCmd']='wallLotteryStopEvent';
            }
            if($cmd['system']['secondCmd']=='wallLotteryStartEvent'){
                $return['system']['cmd']='wallLotteryStartEvent';
                $return['system']['secondCmd']='wallLotteryStartEvent';
            }
            if($cmd['system']['secondCmd']=='wallLotteryFadeOutEvent'){
                $return['system']['cmd']='wallLotteryFadeOutEvent';
                $return['system']['secondCmd']='wallLotteryFadeOutEvent';
            }
            if($cmd['system']['secondCmd']=='wallLotteryDelete'){
                $return['system']['cmd']='wallLotteryDelete';
                $return['system']['secondCmd']='wallLotteryDelete';
            }
            break;
        case 'wallLotteryStopEvent':
            $return['system']['secondCmd']='wallLotteryStopEvent';
            break;
    }
    echo json_encode(['code'=>1,'data'=>base64_encode(json_encode($return))]);
}else{
    $cmd = $_POST['cmd'];
    if(empty($cmd)){
        echo json_encode(['code'=>2,'data'=>null]);
    }else {
        $redis = new \Redis();
        try {
            $redis->connect(getenv('REDIS_HOST_IP'), getenv('REDIS_HOST_PORT'));
            $redis->auth(getenv('REDIS_HOST_AUTH'));
        }catch (RedisException $exception){
            $redis->connect(getenv('REDIS_HOST_IP'), getenv('REDIS_HOST_PORT'));
            $redis->auth(getenv('REDIS_HOST_AUTH'));
        }
        $llen = $redis->lLen('new_year_cmd');
        $redata = [];
        for ($i = 0; $i < $llen; $i++) {
            $cmd = $redis->lPop('new_year_cmd');
            if (!empty($cmd)) {
                $redata[] = $cmd;
            }
        }
        if (empty($redata)) {
            echo json_encode(['code' => 2, 'data' => null]);
        } else {
            echo json_encode(['code' => 2, 'data' => $redata]);
        }
    }
}
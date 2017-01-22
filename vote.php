<?php
/**
 * Created by PhpStorm.
 * User: phpboy
 * Date: 2017/1/18
 * Time: 15:32
 */
include __DIR__.DIRECTORY_SEPARATOR.'common.php';
$m = $_GET['m'];
if(!empty($m)){
    $return = ['systemContent'=>["state"=>"Right", "msg"=>""],'dataContent'=>[]];
    $sql = 'SELECT count(`id`) as tal,`tid` FROM  `wx_top` GROUP BY `tid`';
    $db_total = $dbh->query($sql)->fetchAll(PDO::FETCH_ASSOC);
    $total = [];
    foreach ($db_total as $v) {
        $total[$v['tid']] = $v['tal'];
    }
    foreach ($options as $key=>$v){
        $total[$key]=isset($total[$key])?$total[$key]:0;
    }
    arsort($total);
    $i=0;
    foreach ($total as $k=>$v){
        $return['dataContent']['list'][]=["id" => $k,
            "createDate" => "2016-11-28T13:32:33.000+0800",
            "updateDate" => "2016-11-28T13:32:33.000+0800",
            "deleteTag" => "N",
            "userId" => 6,
            "wallId" => 58683076,
            "subjectId" => 5532354,
            "optionName" => $options[$k],
            "optionImg" => null,
            "count" => $v,
            "seq" => $i++,
            "offCount" => 0];
    }
    $return['dataContent']['joinCount']=array_sum($total);
}
echo json_encode($return);
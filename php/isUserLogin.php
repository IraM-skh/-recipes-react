<?php
require "./sessionСheck.php";
$data=[];
$data['isLogin'] = $result;
$data['login'] = $login;
$obj = (object) $data;
echo json_encode($obj, JSON_UNESCAPED_UNICODE);
$mysql->close();
?>

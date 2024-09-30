<?php
require './dbData.php';
$mysql = new mysqli($dbDataHost, $dbDataUser, $dbDataPassword, $dbDataName);
header("Content-Type: application/json; charset=UTF-8");
$json = json_decode(file_get_contents("php://input"));
$login = $json->login;
$password = md5($json->password);
$remember = $json->remember;
$userDB = $mysql->query("SELECT * FROM `users` WHERE `login`='$login' AND `password`='$password'");
$row_cnt = mysqli_num_rows($userDB);
$result = false;
if ($row_cnt != 0){
    $result = true;
    $user;
    $user_id;
    $time = 3600*24*30;
    while($row = mysqli_fetch_array($userDB)){
        $user["name"] = $row["login"];
        $user_id["id"]= $row["id_hash"];
     };
     if($remember){setcookie('user', $user['name'], time()+$time, "/");
        setcookie('user_id', $user_id["id"], time()+$time, "/");
    } else{
        setcookie('user', $user['name'], time()+3600*24, "/");
        setcookie('user_id', $user_id["id"], time()+3600*24,"/");
    }
    
    session_start();
};
    echo json_encode($result, JSON_UNESCAPED_UNICODE);

  $mysql->close();
 ?>
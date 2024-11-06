<?php
require './dbData.php';
$mysql = new mysqli($dbDataHost, $dbDataUser, $dbDataPassword, $dbDataName);
$json = json_decode(file_get_contents("php://input"));
$login= $json->login;
$password = md5($json->password);
$e_mail= $json->eMail;
$remember = $json->remember;
$id_hash ='';
$time = 3600*24*30;
$userLoginDB = $mysql->query("SELECT * FROM `users_recipes` WHERE `login`='$login'");
$userMailDB = $mysql->query("SELECT * FROM `users_recipes` WHERE `e_mail`='$e_mail'");
$row_login_cnt = mysqli_num_rows($userLoginDB);
$row_mail_cnt = mysqli_num_rows($userMailDB);
$error['login'] = '';
$error['eMail'] = '';
if($row_login_cnt != 0){
    $error['login'] = 'Такой пользователь уже есть. Укажите другой логин.';
}elseif($row_mail_cnt!= 0){
    $error['eMail'] = 'Такой пользователь уже есть. Укажите другой e-mail.';
}else {
    $mysql->query("INSERT INTO `users_recipes`(`login`, `password`, `e_mail`) VALUES ('$login','$password', '$e_mail')");
    $idNewUser = $mysql->query("SELECT `id` FROM `users_recipes` WHERE `login`='$login'");
    while($row = mysqli_fetch_array($idNewUser)){
        $id_hash = md5($row["id"]);
    };
    $mysql->query("UPDATE `users_recipes` SET `id_hash`='$id_hash' WHERE `login`='$login'");
    $mysql->query("INSERT INTO `users_data`(`login`, `id_own_recipes`, `id_favorite_recipes`, `id_own_comments`) VALUES ('$login','','','')");
    
    if($remember){
        setcookie('user', $login, time()+$time, "/");
        setcookie('user_id', $id_hash, time()+$time, "/");
    } else{
        setcookie('user', $login, time()+3600*24, "/");
        setcookie('user_id', $id_hash, time()+3600*24,"/");
    }
    
    session_start();

}
$data = (object) $error;

echo json_encode($data, JSON_UNESCAPED_UNICODE);
$mysql->close();
?>
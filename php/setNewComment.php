<?php
require './dbData.php';
require "./sessionСheck.php";
$mysql = new mysqli($dbDataHost, $dbDataUser, $dbDataPassword, $dbDataName);
$json = json_decode(file_get_contents("php://input"));

//если пользователь залогинен
$sendingNewComment = false;
if($result){
    $date = $json->date;
    $idRecipe = $json->idRecipe;
    $text = $json->text;
    $author = $_COOKIE['user'];

    //добавляем новый коммент в comments
    $mysql->query("INSERT INTO `comments`(`author`, `date`, `id_recipe`, `text`, `userIsLogin`) VALUES ('$author','$date','$idRecipe','$text','1')");

    $idNewComment = $mysql->insert_id;

    //добавляем коммент в user data
    $userDataDB = $mysql->query("SELECT `id_own_comments` FROM `users_data` WHERE `login` = '$author'");
    $id_own_comments = '';
    while($row = mysqli_fetch_array($userDataDB)){
        $row["id_own_comments"] != '' ?
        $id_own_comments = $row["id_own_comments"] . ",$idNewComment" : $id_own_comments = $row["id_own_comments"] . $idNewComment;
    };
    $mysql->query("UPDATE `users_data` SET `id_own_comments`='$id_own_comments' WHERE `login` = '$author'");

    $sendingNewComment = true;
}else{
    $date = $json->date;
    $idRecipe = $json->idRecipe;
    $text = $json->text;
    $author = $json->author;

    //добавляем новый коммент в comments
    $mysql->query("INSERT INTO `comments`(`author`, `date`, `id_recipe`, `text`) VALUES ('$author','$date','$idRecipe','$text')");

    $sendingNewComment = true;
}


echo json_encode($sendingNewComment, JSON_UNESCAPED_UNICODE);
$mysql->close();
?>

<?php
require './dbData.php';
$mysql = new mysqli($dbDataHost, $dbDataUser, $dbDataPassword, $dbDataName);
$idRecipe = json_decode(file_get_contents("php://input"));

$commentsDB = $mysql->query("SELECT * FROM `comments` WHERE `id_recipe` = $idRecipe");
$commentsArrForObj =[];
$comments =[];


while($row = mysqli_fetch_array($commentsDB)){
    $commentsArrForObj["author"] = $row["author"];
    $commentsArrForObj["id"] = $row["id"];
    $commentsArrForObj["idRecipe"] = $row["id_recipe"];
    $commentsArrForObj["date"] = $row["date"];
    $commentsArrForObj["text"] = $row["text"];
    $isLogged = false;
    if($row["userIsLogin"] === '1'){
        $isLogged = true;
    }
    $commentsArrForObj["isLogged"] = $isLogged;
    $obj = (object) $commentsArrForObj;
    array_push($comments, $obj);
    $commentsArrForObj = array();
};

echo json_encode($comments, JSON_UNESCAPED_UNICODE);
$mysql->close();
?>
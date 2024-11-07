<?php
require './dbData.php';
require "./sessionСheck.php";
$mysql = new mysqli($dbDataHost, $dbDataUser, $dbDataPassword, $dbDataName);
$id = json_decode(file_get_contents("php://input"));

$mysql->query("DELETE FROM `recipes` WHERE `id`='$id'");

$userDataDB = $mysql->query("SELECT * FROM `users_data`");

    while($row = mysqli_fetch_array($userDataDB)){
        $login = $row["login"];
        $id_own_recipes = $row["id_own_recipes"];
        if($id_own_recipes !== ''){
            $ids =explode(",", $id_own_recipes);
            unset($ids[array_search($id, $ids)]);
            $newResult = implode(",", $ids);
            $mysql->query("UPDATE `users_data` SET `id_own_recipes`='$newResult' WHERE `login` = '$login'");
        }
        
    };

$mysql->close();
?>
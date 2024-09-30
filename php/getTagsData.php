<?php
require './dbData.php';
$mysql = new mysqli($dbDataHost, $dbDataUser, $dbDataPassword, $dbDataName);
$tags_dietDB = $mysql->query("SELECT * FROM `tags_diet`");
$tags_typeDB = $mysql->query("SELECT * FROM `tags_type`");
$diets = [];
$types = [];

while($row = mysqli_fetch_array($tags_dietDB)){
    array_push($diets, $row["tag"]);
}
while($row = mysqli_fetch_array($tags_typeDB)){
    array_push($types, $row["tag"]);
}
$tagsArrForObj = [];
$tagsArrForObj['type'] = $types;
$tagsArrForObj['diet'] = $diets;
$obj = (object) $tagsArrForObj;

echo json_encode($obj, JSON_UNESCAPED_UNICODE);
$mysql->close();
?>
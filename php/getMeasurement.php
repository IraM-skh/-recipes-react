<?php
require './dbData.php';
$mysql = new mysqli($dbDataHost, $dbDataUser, $dbDataPassword, $dbDataName);
$measurementDB = $mysql->query("SELECT * FROM `measurement` WHERE 1");
$measurements =[];
while($row = mysqli_fetch_array($measurementDB)){
    array_push($measurements, $row["value"]);
};

echo json_encode($measurements, JSON_UNESCAPED_UNICODE);
$mysql->close();
?>
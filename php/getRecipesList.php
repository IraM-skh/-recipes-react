<?php
require './dbData.php';
$mysql = new mysqli($dbDataHost, $dbDataUser, $dbDataPassword, $dbDataName);
$recipesDB = $mysql->query("SELECT * FROM `recipes`");
$recipesArrForObj =[];
$recipes =[];

while($row = mysqli_fetch_array($recipesDB)){
   $recipesArrForObj["title"] = $row["title"];
   $recipesArrForObj["imgUrl"] = $row["img_url"];
   $recipesArrForObj["id"] = $row["id"];
   $recipesArrForObj["description"] = $row["description"];
   
    //    $recipesArrForObj["tags_diet"] = $row["tags_diet"];
    //    $recipesArrForObj["tag_type"] = $row["tag_type"];
    $idTagsDiet = explode(",", $row["tags_diet"]);
    $idTagsType = explode(",", $row["tags_type"]);
   
   $id_recipe = $row["id"];
   $tagsDiet =[];
   $tagsType =[];
   //разделяем ид тегов 
    
    foreach ($idTagsDiet as &$value) {
        $tagsDietDB = $mysql->query("SELECT * FROM `tags_diet` WHERE `id` = $value");
        while ($rowStep = mysqli_fetch_array($tagsDietDB)) {
        array_push($tagsDiet, $rowStep["tag"]);
        }
    };
    foreach ($idTagsType as &$value) {
        $tagsTypeDB = $mysql->query("SELECT * FROM `tags_type` WHERE `id` = $value");
        while ($rowStep = mysqli_fetch_array($tagsTypeDB)) {
        array_push($tagsType, $rowStep["tag"]);
        }
    };

    //шаги рецепта
    $steps = [];
    $stepsArrForObj = [];

    $recipe_stepsDB = $mysql->query("SELECT * FROM `recipe_steps`");
    while ($rowStep = mysqli_fetch_array($recipe_stepsDB)) {
        $stepsArrForObj["src"] = $rowStep["img_src"];
        $stepsArrForObj["stepsDescription"] = $rowStep["step_description"];
        $stepObj = (object) $stepsArrForObj;
        array_push($steps, $stepObj);
        $stepsArrForObj = array();
    }

    //ингредиенты
    $ingredients = [];
    
    $recipe_ingredientsDB = $mysql->query("SELECT * FROM `ingredients` WHERE `id_recipe` = '$id_recipe'");
    while ($row = mysqli_fetch_array($recipe_ingredientsDB)) {
        $ingredientsArrForObj = [];
        $key = $row["name"];
        $quantity = $row["quantity"];
        $measurement = $row["measurement"];
        $arr = [];
        $arr[0] = $quantity;
        if($measurement != ''){
            $arr[1] = $measurement;
        }
        $ingredientsArrForObj[$key] = $arr;
        $obj = (object) $ingredientsArrForObj;
        array_push($ingredients, $obj);

    }

    $tags = [];
    $tags["type"] = $tagsType;
    $tags["diet"] = $tagsDiet;
    $recipesArrForObj["tags"] = (object) $tags;
    $recipesArrForObj["steps"] =$steps;
    $recipesArrForObj["ingredients"] =$ingredients;

    
   $obj = (object) $recipesArrForObj;
    array_push($recipes, $obj);
    $recipesArrForObj = array();
};

echo json_encode($recipes, JSON_UNESCAPED_UNICODE);
$mysql->close();
?>
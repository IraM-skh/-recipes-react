<?php
require './dbData.php';
require "./sessionСheck.php";
$mysql = new mysqli($dbDataHost, $dbDataUser, $dbDataPassword, $dbDataName);
$json = json_decode(file_get_contents("php://input"));


$sendingNewRecipeResult= [];

$sendingNewRecipeResult["result"] = false;

// //если пользователь залогинен
if($result){
    $title = $json->title;
    $tags = $json->tags;
    $ingredients = $json->ingredients;
    $steps = $json->steps;
    $description = $json->description;

    $authorLogin = $_COOKIE['user'];

    //сначала переводим шаги в ид шагов, переводим ид в строку
    $tagsDiet = $tags->diet;
    $tagsType = $tags->type;

    $idTagsDiet = [];
    $idTagsType = [];

    foreach ($tagsDiet as &$value) {
        $tagsDietDB = $mysql->query("SELECT * FROM `tags_diet` WHERE `tag` = '$value'");
        while ($rowStep = mysqli_fetch_array($tagsDietDB)) {
            array_push($idTagsDiet, $rowStep["id"]);
        }
    }

    foreach ($tagsType as &$value) {
        $tagsTypeDB = $mysql->query("SELECT * FROM `tags_type` WHERE `tag` = '$value'");
        while ($rowStep = mysqli_fetch_array($tagsTypeDB)) {
            array_push($idTagsType, $rowStep["id"]);
        }
    }
    $idTagsDiet = join(',', $idTagsDiet);
    $idTagsType = join(',', $idTagsType);

    
    //вставляем новый рецепт и узнаем его сгенеренный ид
    $mysql->query("INSERT INTO `recipes`(`img_url`, `tags_diet`, `title`, `description`, `tags_type`, `author_login`) VALUES ('','$idTagsDiet','$title','$description','$idTagsType','$authorLogin')");

    $idNewRecipe = $mysql->insert_id;

    //добавляем шаги рецепта 
    foreach ($steps as &$valueObj){
        $number_of_step = $valueObj->id;
        $step_description =$valueObj->stepText;
        $mysql->query( "INSERT INTO `recipe_steps`(`id`, `id_recipe`, `number_of_step`, `img_src`, `step_description`) VALUES (NULL,'$idNewRecipe','$number_of_step','','$step_description')");
    }

    //добавляем ингредиенты рецепта 
    foreach ($ingredients as &$valueObj){
        $ingredient = $valueObj->ingredient;
        $quantitie = $valueObj->ingredientQuantitie;
        $measurement = $valueObj->ingredientMeasurement;
        $mysql->query("INSERT INTO `ingredients`(`id_recipe`, `name`, `quantity`, `measurement`) VALUES ('$idNewRecipe','$ingredient','$quantitie','$measurement')");
    }


    //добавляем рецепт в юзер дата
    $userDataDB = $mysql->query("SELECT `id_own_recipes` FROM `users_data` WHERE `login` = '$authorLogin'");
    $id_own_recipes = '';
    while($row = mysqli_fetch_array($userDataDB)){
        $row["id_own_recipes"] != '' ?
        $id_own_recipes = $row["id_own_recipes"] . ",$idNewRecipe" : $id_own_recipes = $row["id_own_recipes"] . $idNewRecipe;
    };
    $mysql->query("UPDATE `users_data` SET `id_own_recipes`='$id_own_recipes' WHERE `login` = '$authorLogin'");
    
    $sendingNewRecipeResult["result"] = true;
    $sendingNewRecipeResult["id"] = $idNewRecipe;
}


echo json_encode($sendingNewRecipeResult, JSON_UNESCAPED_UNICODE);
$mysql->close();
?>
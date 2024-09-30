<?php
require './dbData.php';
require "./sessionСheck.php";
$mysql = new mysqli($dbDataHost, $dbDataUser, $dbDataPassword, $dbDataName);

$data =[];

if($result != false && $login != ''){
    $users_dataDB = $mysql->query("SELECT * FROM `users_data` WHERE `login` = '$login'");
    $dataArrForObj =[];
    
    while($row = mysqli_fetch_array($users_dataDB)){
    
        $id_own_recipes = explode(",", $row["id_own_recipes"]);
        $id_favorite_recipes = explode(",", $row["id_favorite_recipes"]);
        $id_own_comments = explode(",", $row["id_own_comments"]);
        // соственные рецепты title, imgUrl, id, description
        
        $recipesArrForObj =[];
        $own_recipes =[];
    
    
        foreach ($id_own_recipes as &$value) {
            $own_recipesDB = $mysql->query("SELECT * FROM `recipes` WHERE `id` = '$value'");
            while ($row = mysqli_fetch_array($own_recipesDB)) {
            
            $recipesArrForObj["title"] = $row["title"];
            $recipesArrForObj["imgUrl"] = $row["img_url"];
            $recipesArrForObj["id"] = $row["id"];
            $recipesArrForObj["description"] = $row["description"];
            
            $obj = (object) $recipesArrForObj;
            array_push($own_recipes, $obj);
            }
        };
      
        //понравившиеся рецепты
        
        $favoriteArrForObj =[];
        $favorite_recipes =[];
    
        foreach ($id_favorite_recipes as &$value) {
            $favorite_recipesDB = $mysql->query("SELECT * FROM `recipes` WHERE `id` = '$value'");
            while ($row = mysqli_fetch_array($favorite_recipesDB)) {
            
            $favoriteArrForObj["title"] = $row["title"];
            $favoriteArrForObj["imgUrl"] = $row["img_url"];
            $favoriteArrForObj["id"] = $row["id"];
            $favoriteArrForObj["description"] = $row["description"];
    
            $obj = (object) $favoriteArrForObj;
            array_push($favorite_recipes, $obj);
            }
        };
    
        //комменты
        $commentsArrForObj =[];
        $comments =[];
        foreach ($id_own_comments as &$value) {
            $commentsDB = $mysql->query("SELECT * FROM `comments` WHERE `id` = '$value'");
            while ($row = mysqli_fetch_array($commentsDB)) {
            
                $commentsArrForObj["id"] = $row["id"];
                $commentsArrForObj["date"] = $row["date"];
                $commentsArrForObj["text"] = $row["text"];
                $commentsArrForObj["idRecipe"] = $row["id_recipe"];
                $commentsArrForObj["author"] = $row["author"];
                $obj = (object) $commentsArrForObj;
                array_push($comments, $obj);
            }
        }
        $dataArrForObj["ownRecipes"] = $own_recipes;
        $dataArrForObj["favoriteRecipes"] = $favorite_recipes;
        $dataArrForObj["ownComments"] = $comments;
    
        $data = (object) $dataArrForObj;
        $commentsArrForObj = array();
    };
}else{
    require "./logout.php";
    $data["error"] = "Войдите в профиль";
    $data = (object) $data;
}


echo json_encode($data, JSON_UNESCAPED_UNICODE);
$mysql->close();
?>
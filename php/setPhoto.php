<?php
require './dbData.php';
require "./sessionСheck.php";
$mysql = new mysqli($dbDataHost, $dbDataUser, $dbDataPassword, $dbDataName);

//prev_main_picture_input
//recipe_step_img

$rec_id = $_POST["id"];
$folderDir = "../img/";
$sendingNewRecipeResult = [];


    if(isset($_FILES)){
        $main = $_FILES['prev_main_picture_input'];
        $error = $main['error'];
        if ($error == UPLOAD_ERR_OK){
            $name =mt_rand(0, 100000) . $main["name"];
            $img_src = $folderDir . $name;
            



            array_push($sendingNewRecipeResult,move_uploaded_file($main["tmp_name"], $img_src));

            $mysql->query("UPDATE `recipes` SET `img_url`='$img_src' WHERE `id`='$rec_id'");
        }
        
        

        foreach ($_FILES['recipe_step_img']["error"] as $key => $error){
            if ($error == UPLOAD_ERR_OK) {
                $tmp_name = $_FILES["recipe_step_img"]["tmp_name"][$key];
                $name =mt_rand(0, 100000) . $_FILES["recipe_step_img"]["name"][$key];
                $img_src = $folderDir . $name;
                
                

                array_push($sendingNewRecipeResult,move_uploaded_file($tmp_name, $img_src));
                $mysql->query("UPDATE `recipe_steps` SET `img_src`='$img_src' WHERE `id_recipe`='$rec_id' AND `number_of_step`='$key'");
            }

        }


    }

    echo json_encode($sendingNewRecipeResult, JSON_UNESCAPED_UNICODE);
    $mysql->close();
    ?>
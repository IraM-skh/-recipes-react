<?php
    setcookie('user', $user['name'], time()-3600*24*30,"/");
    setcookie('user_id', $user_id["id"], time()-3600*24*30,"/");
    session_destroy();
?>
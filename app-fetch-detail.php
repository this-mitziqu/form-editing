<?php
    require __DIR__ . '/../../../sec/pass.php';

//    $fromUrl="https://www.veritaschina.org/private/shudong/";

// if($_SERVER['HTTP_REFERER'] == $fromUrl) {
    $_POST = json_decode(file_get_contents("php://input"),true);
    $query = $_POST["query"];
    $conn = new mysqli($host, $user, $pass, $db) or die("连接失败");
    // $search = mysqli_real_escape_string($conn, $_POST["query"]);
    
    $conn->set_charset("utf8mb4");
    $select = "SELECT t.submission FROM people as p inner JOIN track as t on p.id = t.user_id WHERE t.id=?";

    $stmt = $conn->prepare($select);
    $stmt->bind_param('s', $query);
    $stmt->execute();
    $result = $stmt->get_result();
    $stmt->fetch();
    $stmt->close();

    $conn->close();

    // $result = mysqli_query($conn, $select) or die(mysqli_error());

    $array = array();

    while($row = $result->fetch_assoc()) {
        $array[] = $row;
    };

    $array[0]["submission"] = stripslashes($array[0]["submission"]);
    $array[0]["submission"] = str_replace('\"', '"', $array[0]["submission"]);
//    $array = array_reverse($array);
    $json_data = json_encode($array, JSON_UNESCAPED_UNICODE);
    echo $json_data;
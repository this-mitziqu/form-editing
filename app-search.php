<?php
    require __DIR__ . '/../../../sec/pass.php';

//    $fromUrl="https://www.veritaschina.org/private/shudong/";

// if($_SERVER['HTTP_REFERER'] == $fromUrl) {
    $_POST = json_decode(file_get_contents("php://input"),true);
    $type = $_POST["type"];
    $query = $_POST["query"];
    $conn = new mysqli($host, $user, $pass, $db) or die("连接失败");
    // $search = mysqli_real_escape_string($conn, $_POST["query"]);
    
    $conn->set_charset("utf8mb4");
    $select = "SELECT t.user_id, t.id, t.appName, t.trackInfo, p.name, p.school FROM people as p inner JOIN track as t on p.id = t.user_id WHERE ";
    if($type == '姓名') {
        $select .= "p.name=?";
    }
    else if($type == '个人id') {
        $select .= "p.id=?";
    }
    else if($type == '报名id') {
        $select .= "t.id=?";
    }
    else if($type == '类别') {
        $select .= "t.appName LIKE CONCAT('%',?,'%')";
    }

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

    $array['trackinfo'] = json_decode($array['trackinfo']);
//    $array = array_reverse($array);
    $json_data = json_encode($array, JSON_UNESCAPED_UNICODE, JSON_PRETTY_PRINT);
    echo $json_data;
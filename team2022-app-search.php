<?php
    require __DIR__ . '/../../../sec/pass.php';

//    $fromUrl="https://www.veritaschina.org/private/shudong/";

// if($_SERVER['HTTP_REFERER'] == $fromUrl) {
    $_POST = json_decode(file_get_contents("php://input"),true);
    $type = $_POST["type"];
    $query = $_POST["query"];
    $db = "team2022";
    $conn = new mysqli($host, $user, $pass, $db) or die("连接失败");
    // $search = mysqli_real_escape_string($conn, $_POST["query"]);
    
    $conn->set_charset("utf8mb4");
    $select = "SELECT a.user_id, a.id, a.app_name, u.name, u.school FROM user as u inner JOIN app as a on u.id = a.user_id WHERE ";
    if($type == '姓名') {
        $select .= "u.name=?";
    }
    else if($type == '个人id') {
        $select .= "u.id=?";
    }
    else if($type == '报名id') {
        $select .= "a.id=?";
    }
    else if($type == '类别') {
        $select .= "a.app_name LIKE CONCAT('%',?,'%')";
    } else {
        $select .= "u.name=? or u.id=? or a.id=? or a.app_name LIKE CONCAT('%',?,'%')";
    }

    $stmt = $conn->prepare($select);
    $stmt->bind_param('ssss', $query, $query, $query, $query);
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

//    $array = array_reverse($array);
    $json_data = json_encode($array, JSON_UNESCAPED_UNICODE, JSON_PRETTY_PRINT);
    echo $json_data;
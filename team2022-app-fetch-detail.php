<?php
    require __DIR__ . '/../../../sec/pass.php';

//    $fromUrl="https://www.veritaschina.org/private/shudong/";

// if($_SERVER['HTTP_REFERER'] == $fromUrl) {
    $_POST = json_decode(file_get_contents("php://input"),true);
    $query = $_POST["query"];
    $db = "team2022";
    $conn = new mysqli($host, $user, $pass, $db) or die("连接失败");
    // $search = mysqli_real_escape_string($conn, $_POST["query"]);
    
    $conn->set_charset("utf8mb4");
    // $select = "SELECT * FROM app as a inner JOIN detail_team2022 as detail on a.id = detail.app_id WHERE a.id=?";
    $select = "SELECT * FROM detail_team2022 WHERE app_id=?";

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

    $json_data = json_encode($array, JSON_UNESCAPED_UNICODE);
    echo $json_data;
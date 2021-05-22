<?php
    require __DIR__ . '/../../../sec/pass.php';

//    $fromUrl="https://www.veritaschina.org/private/shudong/";

// if($_SERVER['HTTP_REFERER'] == $fromUrl) {
    $_POST = json_decode(file_get_contents("php://input"),true);
    $trackInfo = json_encode($_POST["trackInfo"]);
    $id = $_POST["id"];

    $conn = new mysqli($host, $user, $pass, $db) or die("连接失败");
    // $search = mysqli_real_escape_string($conn, $_POST["query"]);
    
    $conn->set_charset("utf8mb4");
    $sql = "UPDATE track SET trackInfo=? WHERE id=?";

    $stmt = $conn->prepare($sql);
    $stmt->bind_param('ss', $trackInfo, $id);
    $stmt->execute();
    printf("Error: %s.\n", $stmt->error);
    echo $stmt->affected_rows;
    $stmt->close();

    $conn->close();


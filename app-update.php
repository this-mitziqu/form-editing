<?php
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;
    require_once __DIR__ . '/../libs/vendor/autoload.php';
    require __DIR__ . '/../../../sec/pass.php';
    require __DIR__ . '/../../../sec/email_adm.php';

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
    // printf("Error: %s.\n", $stmt->error);
    $affected_rows = $stmt->affected_rows;
    echo $affected_rows;
    $stmt->close();

    if ($affected_rows == 0) {
        $conn->close();
    } else {
        $sql = "SELECT t.user_id, t.id, t.appName, p.name, p.email FROM people as p inner JOIN track as t on p.id = t.user_id WHERE t.id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param('s', $id);
        $stmt->execute();
        $stmt->bind_result($user_id, $app_id, $appName, $user_name, $user_email);
        $stmt->fetch();
        $stmt->close();

        $conn->close();


        $info = "
        <p>
        {$user_name}你好，
        </p>
        <p>
        你所申请/报名的<b>{$appName}</b>状态有更新，请通过下方ID<a href='https://apply.veritaschina.org/tracking/' target='_blank'>查询</a>最新状态。
        </p>
        <p>
        谢谢，<br>
        唯理中国
        <p>
        <h4>用户ID：".$user_id."<br/>
        本份报名ID：".$app_id."</h4>
        ";

        $mail = new PHPMailer();
        $mail->isSMTP();
    //		$mail->SMTPDebug  = 2; 
        $mail->SMTPAuth = true;
        $mail->Host = 'smtp.zoho.com';
        $mail->SMTPSecure = 'ssl';
        $mail->Port = 465;
        $mail->CharSet = 'UTF-8';
        $mail->Username = $email_name;
        $mail->Password = $email_pass;
        $mail->From      = $email_name;
        $mail->FromName  = "唯理中国";
        $mail->Subject   = "唯理中国 | 你所申请/报名的{$appName}状态有更新";
        $mail->Body      = $info;
        $mail->AddAddress($user_email);
        $mail->IsHTML(true);
        $mail->send();
    }

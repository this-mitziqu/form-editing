<!DOCTYPE html>
<html>
<head>
  <title>Display all application info from Database</title>
</head>
<body>

<h2>Employee Details</h2>

<table border="2">
  <tr>
    <td>姓名.</td>
    <td>学校</td>
    <td>所属申请</td>
    <td>状态</td>
   
  </tr>



<?php

$connection = mysqli_connect($host, $user, $pass, $db);

if(!$db)
{
    die("Connection failed: " . mysqli_connect_error());
   
}

$sql = "SELECT * FROM track
(`appName`, `trackInfo`, `submission`,`user_id`)
VALUES
('$appName', '$trackInfo', '$submission', '$user_id')"; 

mysqli_query($connection, $sql);
$connection ->close()

?>
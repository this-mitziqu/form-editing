<!DOCTYPE html>
<html>
<head>
  <title>Display all application info from Database</title>
</head>
<body>

<h2>Employee Details</h2>

<table border="2">
  <tr>
    <td>姓名</td>
    <td>id</td>
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
( `trackInfo`, `submission`,`user_id`)
VALUES
('$trackInfo', '$submission', '$user_id')"; 

$records = mysqli_query($connection, $sql);
$connection ->close()



while($data = mysqli_fetch_array($records))
{
    $json_string = data['submision'];
    $json = json_decode($json_string);
    $name = $json["q1"];
    $school = $json["q3"]
    $apps = $json["q10"]


    foreach($apps as $app){
    ?>
    
  <tr>
    <td><?php echo $name;?></td>
    <td><?php echo $data['id']; ?></td>
    <td><?php echo $school; ?></td>
    <td><?php echo $app; ?></td>    
    <td><?php echo $data['trackInfo']; ?></td> 
  </tr>	
    }

<?php
}
?>

</table>

</body>
</html>
<?php
$to = $_POST['to'];
$subject = $_POST['subject'];
$message = $_POST['body'];
$from = $_POST['from'];
$headers  = "From:".$from."\r\n";
$headers .= "Content-type: text/html\r\n";
mail($to,$subject,$message,$headers);
?>
<?php

include 'db_connection.php';

$orderId = $_POST['orderId'];
$status = $_POST['status'];

$db = getDatabaseConnection();

$stmt = $db->prepare("UPDATE `order` SET `status`=? WHERE seq_id=?");
$stmt->bind_param("si", $status, $orderId);

$stmt->execute();
echo 0;

closeDatabaseConnection($db);

?>

<?php

include 'db_connection.php';

$orderId = $_POST['orderId'];

$db = getDatabaseConnection();

$stmt = $db->prepare("DELETE FROM `order` WHERE seq_id = ?");
$stmt->bind_param("s", $orderId);

$stmt->execute();
echo 0;

closeDatabaseConnection($db);

?>

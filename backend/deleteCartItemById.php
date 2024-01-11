<?php

include 'db_connection.php';

$orderId = $_POST['orderId'];
$status = $_POST['status'];

$db = getDatabaseConnection();

if ($status == "R") {
    $stmt = $db->prepare("UPDATE `order` SET username='admin' WHERE seq_id=?");
} else {
    $stmt = $db->prepare("DELETE FROM `order` WHERE seq_id = ?");
}
$stmt->bind_param("s", $orderId);

$stmt->execute();
echo 0;

closeDatabaseConnection($db);

?>

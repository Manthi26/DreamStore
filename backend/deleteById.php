<?php

include 'db_connection.php';

$productId = $_POST['product_id'];

$db = getDatabaseConnection();

$stmt = $db->prepare("DELETE FROM product WHERE id = ?");
$stmt->bind_param("s", $productId);

$stmt->execute();

echo 0;

closeDatabaseConnection($db);

?>

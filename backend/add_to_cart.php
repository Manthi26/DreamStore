<?php

include 'db_connection.php';
include 'Product.php';

$db = getDatabaseConnection();


$username = $_POST['username'];
$productId = $_POST['product_id'];
$quantity = $_POST['quantity'];
$shoulders = $_POST['shoulders'];
$chest = $_POST['chest'];
$sleeve = $_POST['sleeve'];
$waist = $_POST['waist'];
$centerBack = $_POST['centerBack'];
$status = "C";

$stmt = $db->prepare("INSERT INTO `order`
	(username, product_id, quantity, `status`, shoulders, chest, sleeve, waist, center_back)
	VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");

$stmt->bind_param("siisddddd", $username, $productId, $quantity, $status, $shoulders, $chest, $sleeve, $waist, $centerBack);
$stmt->execute();
echo 0;

closeDatabaseConnection($db);

?>

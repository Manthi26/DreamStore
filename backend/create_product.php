<?php

include 'db_connection.php';
include 'Product.php';

$db = getDatabaseConnection();


$name = $_POST['name'];
$price = $_POST['price'];
$imagePath = $_POST['imagePath'];
$description = $_POST['description'];

$stmt = $db->prepare("INSERT INTO product(name, price, image_path, description) VALUES (?, ?, ?, ?)");
$stmt->bind_param("siss", $name, $price, $imagePath, $description);
$stmt->execute();
echo 0;

closeDatabaseConnection($db);

?>

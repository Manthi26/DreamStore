<?php

include 'db_connection.php';
include 'model/Product.php';

$db = getDatabaseConnection();

$stmt = $db->prepare("SELECT * FROM product");
$stmt->execute();

$result = $stmt->get_result();
$resultSize = mysqli_num_rows($result);

$dataArray = array();

foreach ($result as $value) {
    $product = new Product();
    $product->setId($value['id']);
    $product->setName($value['name']);
    $product->setPrice($value['price']);
    $product->setImagePath($value['image_path']);
    $product->setDescription($value['description']);
    array_push($dataArray, $product);
}

header('Content-type:application/json;charset=utf-8');
echo json_encode($dataArray);

closeDatabaseConnection($db);

?>

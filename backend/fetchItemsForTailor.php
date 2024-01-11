<?php

include 'db_connection.php';
include 'model/Order.php';

$db = getDatabaseConnection();

$stmt = $db->prepare("SELECT `order`.*, product.name, product.image_path FROM `order` 
    JOIN product ON `order`.product_id = product.id WHERE status != 'C'");

$stmt->execute();

$result = $stmt->get_result();
$resultSize = mysqli_num_rows($result);

$dataArray = array();

foreach ($result as $value) {
    $order = new Order();
    $order->setSeqId($value['seq_id']);
    $order->setUsername($value['username']);
    $order->setProductId($value['product_id']);
    $order->setProductName($value['name']);
    $order->setProductImage($value['image_path']);
    $order->setQuantity($value['quantity']);
    $order->setStatus($value['status']);
    $order->setShoulders($value['shoulders']);
    $order->setChest($value['chest']);
    $order->setSleeve($value['sleeve']);
    $order->setWaist($value['waist']);
    $order->setCenterBack($value['center_back']);
    array_push($dataArray, $order);
}

header('Content-type:application/json;charset=utf-8');
echo json_encode($dataArray);

closeDatabaseConnection($db);

?>

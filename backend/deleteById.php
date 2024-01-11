<?php

include 'db_connection.php';

$productId = $_POST['product_id'];

$db = getDatabaseConnection();

$stmt = $db->prepare("DELETE FROM product WHERE id = ?");
$stmt->bind_param("s", $productId);


try {
    $stmt->execute();
    echo 0;
} catch (Exception $e) {
    // foreign key constaint error
    if ($e->getCode() == 1451) {
        echo 1;
    } else {
        echo 2;
    }
}

closeDatabaseConnection($db);

?>

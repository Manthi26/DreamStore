<?php

include 'db_connection.php';

$username = $_POST['username'];

$db = getDatabaseConnection();

$stmt = $db->prepare("UPDATE `order` SET `status`='P' WHERE username=? AND `status`='C'");
$stmt->bind_param("s", $username);

try {
    $stmt->execute();
    echo 0;
} catch (Exception $e) {
    echo 1;
}

closeDatabaseConnection($db);

?>

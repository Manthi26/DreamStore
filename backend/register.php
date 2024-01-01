<?php

include 'db_connection.php';
include 'User.php';

$db = getDatabaseConnection();

$stmt = $db->prepare("SELECT * FROM user WHERE username = ?");
$stmt->bind_param("s", $username);

$username = $_POST['username'];
$password = $_POST['password'];

$stmt->execute();
$result = $stmt->get_result();
$resultSize = mysqli_num_rows($result);

if ($resultSize > 0) {
    echo 1;
} else {
    $stmt = $db->prepare("INSERT INTO user (username, password, user_type) VALUES (?, ?, 'U')");
    $hashedPass = password_hash($password, PASSWORD_DEFAULT);
    $stmt->bind_param("ss", $username, $hashedPass);
    $stmt->execute();
    echo 0;
}

closeDatabaseConnection($db);

?>

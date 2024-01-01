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

if ($resultSize > 0 && $resultSize < 2) {
    $row = $result->fetch_assoc();
    $user = new User();
    $user->setUsername($row["username"]);
    $user->setType($row["user_type"]);
    if (password_verify($password, $row["password"])) {
        echo json_encode($user);
    } else {
        echo -1;
    }
} else {
    echo -1;
}

closeDatabaseConnection($db);

?>

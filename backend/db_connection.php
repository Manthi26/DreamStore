<?php

    function getDatabaseConnection() {
        $dbHost = "localhost";
        $dbUser = "root";
        $dbPass = "root";
        $db = "dream_store";
        $conn = new mysqli($dbHost, $dbUser, $dbPass, $db) or die("Connect failed: " . $conn->error . "\n");

        return $conn;
    }

    function closeDatabaseConnection($conn) {
        $conn->close();
    }

?>

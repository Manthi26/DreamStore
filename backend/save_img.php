<?php


// Reference https://stackoverflow.com/a/23981045
if ( 0 < $_FILES['file']['error'] ) {
    echo 'Error: ' . $_FILES['file']['error'] . '<br>';
    header('Content-type:application/json;charset=utf-8');
    echo json_encode([ 'code' => 1, 'description' => 'Error: ' . $_FILES['file']['error'] ]);
} else {
    move_uploaded_file($_FILES['file']['tmp_name'], 'uploads/' . $_FILES['file']['name']);
    header('Content-type:application/json;charset=utf-8');
    echo json_encode([ 'code' => 0, 'description' => $_FILES['file']['name']]);
}

?>

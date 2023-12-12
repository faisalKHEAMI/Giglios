<?php

$dsn = "mysql:host=132.148.214.231;dbname=Order";
$dbusername = "Faisalffpp";
$dbuserpassword = "Giglios1967@";

try {
    $pdo = new PDO($dsn, $dbusername, $dbuserpassword);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);


    // Fetch and output the updated order information
$stmt2 = $pdo->prepare("SELECT * FROM Order_info WHERE OrderId = :orderID");
$stmt2->bindParam(':orderID', $_GET['orderID'], PDO::PARAM_INT);
$stmt2->execute();
$updatedOrder = $stmt2->fetch(PDO::FETCH_ASSOC);


    header('Content-Type: application/json');
    echo json_encode($updatedOrder);

} catch (PDOException $e) {

    // Return an error response
    header('HTTP/1.1 500 Internal Server Error');
    echo json_encode(['error' => $e->getMessage()]);
}
?>

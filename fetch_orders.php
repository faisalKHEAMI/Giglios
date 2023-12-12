<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: *");

error_reporting(E_ALL);
ini_set('display_errors', 1);

$dsn = "mysql:host=132.148.214.231;dbname=Order";
$dbusername = "Faisalffpp";
$dbuserpassword = "Giglios1967@";

try {
    $pdo = new PDO($dsn, $dbusername, $dbuserpassword);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $tableName = 'Order_info';

    // Fetch all orders, ordered by OrderId in descending order
    $stmt = $pdo->prepare("SELECT * FROM $tableName ORDER BY OrderId DESC");
    $stmt->execute();
    $orders = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Output orders as JSON
    header('Content-Type: application/json');
    echo json_encode($orders);

    if (isset($_GET['orderID']) && $_GET['orderID']) {
        // Update the payment status
        $stmt1 = $pdo->prepare("UPDATE `$tableName` SET payStat='paid, at kitchen' WHERE OrderId = :orderID");
        $stmt1->execute(['orderID' => $_GET['orderID']]);

        // Fetch and output the updated order information
        $stmt2 = $pdo->prepare("SELECT * FROM $tableName WHERE OrderId = :orderID");
        $stmt2->execute(['orderID' => $_GET['orderID']]);
        $updatedOrder = $stmt2->fetch(PDO::FETCH_ASSOC);

        header('Content-Type: application/json');
        echo json_encode($updatedOrder);
    }
} catch (PDOException $e) {
    // Log the error to a file
    error_log("Error in fetch_orders.php: " . $e->getMessage(), 3, "/path/to/error.log");

    // Return an error response
    header('HTTP/1.1 500 Internal Server Error');
    echo json_encode(['error' => 'Internal Server Error']);
}
?>

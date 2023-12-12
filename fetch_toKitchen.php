<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

$dsn = "mysql:host=132.148.214.231;dbname=Order";
$dbusername = "Faisalffpp";
$dbuserpassword = "Giglios1967@";

try {
    $pdo = new PDO($dsn, $dbusername, $dbuserpassword);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Check if an order ID is provided in the request
 
$stmt = $pdo->prepare("SELECT * FROM Order_info WHERE paystat = 'paid, at kitchen'");
$stmt->execute();
$order = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Output the result as JSON
header('Content-Type: application/json');
echo json_encode($order);

} catch (PDOException $e) {
    // Log the error to a file
    error_log("Error in fetch_orders.php: " . $e->getMessage(), 3);

    // Return an error response
    header('HTTP/1.1 500 Internal Server Error');
    echo json_encode(['error' => 'Internal Server Error']);
}
?>

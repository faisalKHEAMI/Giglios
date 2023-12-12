<?php
// Establish a connection to the database
$dsn = "mysql:host=132.148.214.231;dbname=Order";
$dbusername = "Faisalffpp";
$dbuserpassword = "Giglios1967@";

try {
    $pdo = new PDO($dsn, $dbusername, $dbuserpassword);
} catch (PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
    exit();
}

// Check if the OrderID is provided in the request
if (isset($_GET['orderID'])) {
    $orderID = $_GET['orderID'];

    // Prepare and execute the SQL query to delete the order
    $sql = "DELETE FROM Order_info WHERE OrderID = :orderID";
    $stmt = $pdo->prepare($sql);

    // Bind parameters
    $stmt->bindParam(':orderID', $orderID, PDO::PARAM_INT);

    // Execute the statement
    try {
        $stmt->execute();
        echo "Order deleted successfully";
    } catch (PDOException $e) {
        echo "Error deleting order: " . $e->getMessage();
    }
} else {
    echo "OrderID not provided";
}
?>

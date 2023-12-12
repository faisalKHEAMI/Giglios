<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: *");

error_reporting(E_ALL);
ini_set('display_errors', 1);

$dsn = "mysql:host=132.148.214.231;dbname=Order";
$dbusername = "Faisalffpp";
$dbuserpassword = "Giglios1967@";

try {
    $pdo = new PDO($dsn, $dbusername, $dbuserpassword);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Check if an order ID is provided in the request
    if (isset($_POST['orderID']) && $_POST['orderID']) {
        $orderID = $_POST['orderID'];

        //  Update Full Name
        if (isset($_POST['fullName']) && $_POST['fullName']) {
            $stmt = $pdo->prepare("UPDATE Order_info SET FullName = :fullName WHERE OrderID = :orderID");
            $stmt->execute(['fullName' => $_POST['fullName'], 'orderID' => $orderID]);
        }

        //  Update PickUpTime
        if (isset($_POST['pickUpTime']) && $_POST['pickUpTime']) {
            $stmt = $pdo->prepare("UPDATE Order_info SET PickUpTime = :pickUpTime WHERE OrderID = :orderID");
            $stmt->execute(['pickUpTime' => $_POST['pickUpTime'], 'orderID' => $orderID]);
        }
        if (isset($_POST['PhoneNumber']) && $_POST['PhoneNumber']) {
            $stmt = $pdo->prepare("UPDATE Order_info SET PhoneNumber = :phoneNumber WHERE OrderID = :orderID");
            $stmt->execute(['PhoneNumber' => $_POST['PhoneNumber'], 'orderID' => $orderID]);
        }
        if (isset($_POST['BreadType']) && $_POST['BreadType']) {
            $stmt = $pdo->prepare("UPDATE Order_info SET BreadType = :breadType WHERE OrderID = :orderID");
            $stmt->execute(['BreadType' => $_POST['BreadType'], 'orderID' => $orderID]);
        }
        if (isset($_POST['BreadSize']) && $_POST['BreadSize']) {
            $stmt = $pdo->prepare("UPDATE Order_info SET BreadSize = :breadSize WHERE OrderID = :orderID");
            $stmt->execute(['BreadSize' => $_POST['BreadSize'], 'orderID' => $orderID]);
        }

        if (isset($_POST['Meat']) && $_POST['Meat']) {
            $stmt = $pdo->prepare("UPDATE Order_info SET Meat = :meat WHERE OrderID = :orderID");
            $stmt->execute(['Meat' => $_POST['Meat'], 'orderID' => $orderID]);
        }
        if (isset($_POST['Cheese']) && $_POST['Cheese']) {
            $stmt = $pdo->prepare("UPDATE Order_info SET Cheese = :cheese WHERE OrderID = :orderID");
            $stmt->execute(['Cheese' => $_POST['Cheese'], 'orderID' => $orderID]);
        }
        if (isset($_POST['Sauces']) && $_POST['Sauces']) {
            $stmt = $pdo->prepare("UPDATE Order_info SET Sauces = :sauces WHERE OrderID = :orderID");
            $stmt->execute(['Sauces' => $_POST['Sauces'], 'orderID' => $orderID]);
        }
        if (isset($_POST['Toppings']) && $_POST['Toppings']) {
            $stmt = $pdo->prepare("UPDATE Order_info SET Toppings = :toppings WHERE OrderID = :orderID");
            $stmt->execute(['Toppings' => $_POST['Toppings'], 'orderID' => $orderID]);
        }
        if (isset($_POST['Extras']) && $_POST['Extras']) {
            $stmt = $pdo->prepare("UPDATE Order_info SET Extras = :extras WHERE OrderID = :orderID");
            $stmt->execute(['Extras' => $_POST['Extras'], 'orderID' => $orderID]);
        }
        if (isset($_POST['payStat']) && $_POST['payStat']) {
            $stmt = $pdo->prepare("UPDATE Order_info SET payStat = :payStat WHERE OrderID = :orderID");
            $stmt->execute(['payStat' => $_POST['payStat'], 'orderID' => $orderID]);
        }

        // Fetch and output the updated order information
        $stmt = $pdo->prepare("SELECT * FROM Order_info WHERE OrderID = :orderID");
        $stmt->execute(['orderID' => $orderID]);
        $updatedOrder = $stmt->fetch(PDO::FETCH_ASSOC);

        // Output the result as JSON
        header('Content-Type: application/json');
        echo json_encode($updatedOrder);
    } else {
        // Return an error response if order ID is not provided
        header('HTTP/1.1 400 Bad Request');
        echo json_encode(['error' => 'Order ID not provided']);
    }
} catch (PDOException $e) {
    // Log the error to a file
    error_log("Error in update_Order.php: " . $e->getMessage(), 3);

    // Return an error response
    header('HTTP/1.1 500 Internal Server Error');
    echo json_encode(['error' => 'Internal Server Error']);
}
?>

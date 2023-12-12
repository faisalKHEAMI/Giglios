<?php
$dsn = "mysql:host=132.148.214.231;dbname=Order";
$dbusername = "Faisalffpp";
$dbuserpassword = "Giglios1967@";

try {
    $pdo = new PDO($dsn, $dbusername, $dbuserpassword);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $tableName = 'Order_info';

    // Collect data from the POST request
    $data = json_decode(file_get_contents("php://input"), true);
    $fullName = $data['fullName'] ?? '';
    $time = $data['time'] ?? '';
    $phone = $data['phone'] ?? '';
    $breadSizePreview = $data['breadSizePreview'] ?? '';
    $breadPreview = $data['breadPreview'] ?? '';
    $meatPreview = $data['meatPreview'] ?? '';
    $cheesePreview = $data['cheesePreview'] ?? ''; 
    $saucesPreview = $data['saucesPreview'] ?? '';
    $toppingsPreview = $data['toppingsPreview'] ?? '';
    $extrasPreviews = $data['extrasPreviews'] ?? ''; 
    $total = $data['total'] ?? '';
    
    // Prepare and execute the SQL statement
    $stmt = $pdo->prepare("INSERT INTO $tableName (FullName, PickUpTime, PhoneNumber, BreadSize, BreadType, Meat, Cheese, Sauces, Toppings, Extras, Total, payStat) 
                          VALUES (:fullName, :time, :phone, :breadSizePreview, :breadPreview, :meatPreview, :cheesePreview, :saucesPreview, :toppingsPreview, :extrasPreviews, :total, 'unpaid')");

    $success = $stmt->execute([
        ':fullName' => $fullName,
        ':time' => $time,
        ':phone' => $phone,
        ':breadSizePreview' => $breadSizePreview,
        ':breadPreview' => $breadPreview,
        ':meatPreview' => $meatPreview,
        ':cheesePreview' => $cheesePreview,
        ':saucesPreview' => $saucesPreview,
        ':toppingsPreview' => $toppingsPreview,
        ':extrasPreviews' => $extrasPreviews,
        ':total' => $total,
    ]);

   if ($success) {
    // Get the last inserted ID
    $lastInsertID = $pdo->lastInsertId();
    echo json_encode([ $lastInsertID]);
} else {
    echo json_encode(['error' => 'Error inserting data.']);
}
} catch (PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
}
?>

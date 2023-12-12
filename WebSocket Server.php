<?php
require __DIR__ . '/vendor/autoload.php';

use Ratchet\MessageComponentInterface;
use Ratchet\ConnectionInterface;
use Ratchet\WebSocket\WsServer;
use Ratchet\Http\HttpServer;
use Ratchet\Server\IoServer;
use WebSocketClient\WebSocketClient;
use WebSocketClient\WebSocketClientInterface;

class OrderPusher implements MessageComponentInterface
{
    protected $clients;

    public function __construct()
    {
        $this->clients = new \SplObjectStorage;
    }

    public function onOpen(ConnectionInterface $conn)
    {
        $this->clients->attach($conn);
        echo "New connection! ({$conn->resourceId})\n";
    }

    public function onMessage(ConnectionInterface $from, $msg)
    {
        // Decode the JSON message
        $data = json_decode($msg, true);

        // Check if the message contains a specific command
        if (isset($data['command'])) {
            switch ($data['command']) {
                case 'updateOrderStatus':
                    $this->updateOrderStatus($from, $data['orderId'], $data['newStatus']);
                    break;
                case 'newOrder':
                    // Handle the new order command
                    $this->broadcastNewOrder($from, $data['orderId']);
                    break;
                // Add more cases for other commands if needed
            }
        }
    }

    protected function broadcastNewOrder(ConnectionInterface $from, $orderId)
    {
        // Get the new order information (you may fetch it from the database)
        $newOrderData = [
            // ... (Fetch new order information based on orderId)
        ];

        // Encode the new order data as JSON
        $jsonData = json_encode($newOrderData);

        // Broadcast the new order data to all connected clients except the sender
        foreach ($this->clients as $client) {
            if ($client !== $from) {
                $client->send($jsonData);
            }
        }
    }
    protected function getOrderDataFromDatabase($orderId)
    {
$dsn = "mysql:host=132.148.214.231;dbname=Order";
$dbusername = "Faisalffpp";
$dbuserpassword = "Giglios1967@";

        try {
      $pdo = new PDO($dsn, $dbusername, $dbuserpassword);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            // Execute a query to fetch order information based on orderId
            $stmt = $pdo->prepare("SELECT * FROM orders WHERE id = :orderId");
            $stmt->bindParam(':orderId', $orderId);
            $stmt->execute();

            // Fetch the result as an associative array
            $result = $stmt->fetch(\PDO::FETCH_ASSOC);

            // Close the database connection
            $pdo = null;

            return $result;
        } catch (\PDOException $e) {
            // Handle database connection or query errors
            echo "Database error: " . $e->getMessage();
            return [];
        }
    }
    public function onClose(ConnectionInterface $conn)
    {
        $this->clients->detach($conn);
        echo "Connection {$conn->resourceId} has disconnected\n";
    }

    public function onError(ConnectionInterface $conn, \Exception $e)
    {
        echo "An error occurred: {$e->getMessage()}\n";
        $conn->close();
    }
}

// Run the WebSocket server
$server = IoServer::factory(
    new HttpServer(
        new WsServer(
            new OrderPusher()
        )
    ),
    8084
);

echo "WebSocket server running on port 8084...\n";

// Create a new event loop to run the WebSocket server
$loop = React\EventLoop\Factory::create();
$server->loop->run();

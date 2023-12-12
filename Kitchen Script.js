// Function to fetch orders and update the kitchen display
function addtokitchen() {
    $.ajax({
        type: 'GET',
        url: 'fetch_toKitchen.php',
        success: function (response) {
            console.log('AJAX success kitchen', response);
            // Call the updateOrderList function with the received orders
            updateOrderList1(response);
        },
        error: function (error) {
            console.error('AJAX error', error);
        }
    });
}

// Function to update the kitchen display with fetched orders
function updateOrderList1(orders) {
    // Assuming you have a function to update the kitchen display with orders
    // Modify this function according to your actual implementation
    var kitchenDisplay = $('#kitchen-orders');

    // Clear existing orders
    kitchenDisplay.empty();

    // Loop through the fetched orders and append them to the display
    orders.forEach(function (order) {
        var orderItem = $('<li>').html(
            'Name: ' + order.FullName + '<br>' +
            ' - Time: ' + order.PickUpTime + '<br>' +
            ' - Phone: ' + order.PhoneNumber + '<br>' +
            ' - Bread: ' + order.BreadType + '<br>' +
            ' - Bread Size: ' + order.BreadSize + '<br>' +
            ' - Meat: ' + order.Meat + '<br>' +
            ' - Cheese: ' + order.Cheese + '<br>' +
            ' - Sauces: ' + order.Sauces + '<br>' +
            ' - Toppings: ' + order.Toppings + '<br>' +
            ' - Extras: ' + order.Extras + '<br>' +
            'Order number:' + order.OrderID + '<br>' +
            'Order Status: ' + order.payStat +
            'Order number:' + order.OrderID + '<br>' +
            '<button value="' + order.OrderID + '" id="sendAsDone" onclick="sendDone(' + order.OrderID + ')">Order is done</button>'
        );
        kitchenDisplay.append(orderItem);
    });
}

// Function to handle sending done status
function sendDone(orderID) {
    if (!orderID) {
        console.error('Error: orderID is not provided');
        return;
    }

    $.ajax({
        type: 'GET',
        url: 'fetch_toKitchen.php',
        data: {
            orderID: orderID
        },
        dataType: 'text',  // or 'html' depending on the expected response type
        success: function (response) {
            console.log('AJAX success', response);
            // Handle the response appropriately
        },
        error: function (xhr, status, error) {
            console.error('AJAX error', status, error);
        }
    });
      addtokitchen();
}
    setInterval(addtokitchen,10000);
// Call the function to fetch and display orders when the document is ready
$(document).ready(function () {
    addtokitchen();
    // You can add more functionality or event listeners as needed
});

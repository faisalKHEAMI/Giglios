function getParameterByName(url) {
    // get the link decode everything to human readable string and then removing everything but order number 
    url = decodeURIComponent(url);
    url = url.replace('["', '');
    url = url.replace('"]', '');
    url = url.replace(/http:\/\/giglios.ca\/order_submitted.html\?/g, '');
    return url;
}

// Get the orderId from the query parameters
var orderId = getParameterByName(window.location.href);

//
// Update the content of the order details
function updateOrderDetails(orderData) {
    // Assuming there is an HTML element with the class 'order-details' to display the data
    var orderDetailsElement = document.querySelector('.order-details');

    // Example: Update the content of the 'order-details' element
    orderDetailsElement.innerHTML =
    '<h3>  - Name: ' + orderData.FullName + '</h3> <br>' +
         '<h3>  - Time: ' + orderData.PickUpTime + '</h3> <br>' +
        ' - Phone: ' + orderData.PhoneNumber + '<br>' +
        ' - Bread: ' + orderData.BreadType + '<br>' +
        ' - Bread Size: ' + orderData.BreadSize + '<br>' +
        ' - Meat: ' + orderData.Meat + '<br>' +
        ' - Cheese: ' + orderData.Cheese + '<br>' +
        ' - Sauces: ' + orderData.Sauces + '<br>' +
        ' - Toppings: ' + orderData.Toppings + '<br>' +
        ' - Extras: ' + orderData.Extras + '<br>' +
         '<h3>  - Total: ' + orderData.Total + '</h3> <br>'+
         '<h3> Order number:' + orderData.OrderID + '</h3> <br>';


}


// Fetch order details by ID
function fetchOrderDetails(orderID) {
    $.ajax({
        type: 'GET',
        url: 'preview-order.php',
        data: {
            orderID: orderID
        },
        success: function (response) {
            console.log('AJAX success by id', response);
            // Call the updateOrderDetails function with the received order details
            updateOrderDetails(response);
        },
        error: function (error) {
            console.error('AJAX error', error);
        }
    });
}

// Call the fetchOrderDetails function with the orderId
fetchOrderDetails(orderId);

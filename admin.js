$(document).ready(function () {

    var responseOld = '';

// Function to fetch orders and update the order list
    function fetchOrders() {
        window.fetchOrders = fetchOrders;
        $.ajax({
            type: 'GET',
            url: 'fetch_orders.php',
            success: function (response) {
                if (!arraysAreEqual(response, responseOld)) {
                    // Play the notification sound
                    playNotificationSound();
                    console.log('AJAX success', response);
                    // Call the updateOrderList function with the received orders
                    updateOrderList(reponse);
                    responseOld = response;  // Update responseOld with the current response


                }
            },
            error: function (error) {
                console.error('AJAX error', error);
            }
        });
    }
    setInterval(fetchOrders,10000);
// Function to check if two arrays are equal
    function arraysAreEqual(arr1, arr2) {
        if (arr1.length !== arr2.length) {
            return false;
        }

        for (var i = 0; i < arr1.length; i++) {
            if (arr1[i].OrderID !== arr2[i].OrderID || arr1[i].payStat !== arr2[i].payStat) {
                return false;
            }
        }

        return true;
    }

// Function to play the notification sound
    function playNotificationSound() {
        var audioElement = document.getElementById('notificationSound');

        try {
            audioElement.play();
        } catch (error) {
            console.error('Error playing audio:', error.message);
        }
    }

    document.getElementById('playButton').addEventListener('click', playNotificationSound);



// Function to fetch orders by ID
    console.log('we here');
// updateorderfor kitchen the php has instructions to update the payment status to paid at kitchen if we provide porder id
    function updateOrderForkitchen(orderID) {
        $.ajax({
            type: 'GET',
            url: 'fetch_orders.php',
            data: {
                orderID: orderID
            },
            success: function (response) {
                console.log('AJAX success by id', response);
                // Call the updateOrderList function with the received orders
                updateOrderList(response);
            },
            error: function (error) {
                console.error('AJAX error', error);
            }
        });
    }

    $(document).on('click', '.collapsible1', function () {
        var content = $(this).next();
        var button = $(this);
        if (content.css('display') === 'none') {
            content.css('display', 'block');
        } else {
            content.css('display', 'none');
        }

        $(this).toggleClass('active');
    });



    // Function to update the order list
    function updateOrderList(orders) {

        $('#orders').empty();

        // Iterate through each order in the response
        orders.forEach(function (order) {
            // Construct a string containing all the details
            var orderDetails =
                '<form id="orderForm_' + order.OrderID + '">' +
                '    Name: <input class="input" type="text" id="fullName_' + order.OrderID + '" value="' + order.FullName + '"><br>' +
                '    Time: <input class="input" type="text" id="pickUpTime_' + order.OrderID + '" value="' + order.PickUpTime + '"><br>' +
                '    Phone: <input class="input" type="text" id="phoneNumber_' + order.OrderID + '" value="' + order.PhoneNumber + '"><br>' +
                '    Bread: <input class="input" type="text" id="breadType_' + order.OrderID + '" value="' + order.BreadType + '"><br>' +
                '    Bread Size: <input class="input" type="text" id="breadSize_' + order.OrderID + '" value="' + order.BreadSize + '"><br>' +
                '    Meat: <input class="input" type="text" id="meat_' + order.OrderID + '" value="' + order.Meat + '"><br>' +
                '    Cheese: <input class="input" type="text" id="cheese_' + order.OrderID + '" value="' + order.Cheese + '"><br>' +
                '    Sauces: <input class="input" type="text" id="sauces_' + order.OrderID + '" value="' + order.Sauces + '"><br>' +
                '    Toppings: <input class="input" type="text" id="toppings_' + order.OrderID + '" value="' + order.Toppings + '"><br>' +
                '    Extras: <input class="input" type="text" id="extras_' + order.OrderID + '" value="' + order.Extras + '"><br>' +
                '    Total: <input class="input" type="text" id="total_' + order.OrderID + '" value="' + order.Total + '"><br>' +
                '    Order number: ' + order.OrderID + '<br>' +
                '    Order Status: ' + order.payStat + '<br>' +
                '    <button value="' + order.OrderID + '" class="updateOrderButton">Update Order</button>' +
                '    <button value="' + order.OrderID + '" id="sendToKitchenButton_' + order.OrderID + '">Send to Kitchen</button>' +
                '    <button value="' + order.OrderID + '" id="orderPickedUpButton_' + order.OrderID + '">Order Picked UP</button>' +
                '    <button value="' + order.OrderID + '" class="deleteOrderButton">Delete Order</button>' +
                '</form>';


// Append the details as a list item with a button make it green if it is already marked as paid
            if (order.payStat == 'unpaid') {
                $('#orders').append('<button type="button" class="collapsible1" style=" margin-top:10px; background-color:red; display:flex;"> Full name:' + order.FullName + ' ' + order.PickUpTime + ' ' + order.OrderID + '</button>' +
                    '<li style="background-color:red; display:none;">NEW!<br>' + orderDetails + '</li>');
            } else if (order.payStat == 'paid, at kitchen') {
                $('#orders').append('<button type="button" class="collapsible1" style=" margin-top:10px; background-color:green; display:flex;">  Full name:' + order.FullName + ' ' + order.PickUpTime + ' ' + order.OrderID + '</button>' +
                    '<li style="background-color:green; display:none;">At Kitchen! <br>' + orderDetails + '</li>');
            } else if (order.payStat == 'Done') {
                $('#orders').append('<button type="button" class="collapsible1" style=" margin-top:10px; background-color:blue; display:flex;">  Full name:' + order.FullName + ' ' + order.PickUpTime + ' ' + order.OrderID + '</button>' +
                    '<li style="background-color:blue; display:none;">Done!<br>' + orderDetails + '</li>');
            } else if (order.payStat == 'Picked Up') {
                $('#orders').append('<button type="button" class="collapsible1" style=" margin-top:10px; background-color:black; display:flex;">  Full name:' + order.FullName + ' ' + order.PickUpTime + ' ' + order.OrderID + '</button>' +
                    '<li style="background-color:black; display:none;">Picked UP!<br>' + orderDetails + '</li>');
            }
        });
    }

// Add event listeners for the new buttons
    $(document).on('click', '[id^="sendToKitchenButton_"]', function () {
        var orderID = $(this).val();
        // Update the kitchen display
        updateOrderForkitchen(orderID);
// already delt with
        // Change the background color of the clicked button to green
        $(this).css('background-color', 'green');

        // Change the background color of the corresponding list item to green
        var listItem = $(this).next('li');
        listItem.css('background-color', 'green');

        // Also change the background color of the collapsible button if needed
        listItem.prev('.collapsible1').css('background-color', 'green');
    });


// Event listener for the "Delete Order" button
    $(document).on('click', '.deleteOrderButton', function () {
        var orderID = $(this).val();

        // Ask for confirmation before deleting the order
        if (confirm('Are you sure you want to delete this order?')) {
            // Create a function and PHP script to delete the order
            deleteOrder(orderID);
        }


        // Refresh the order list
        fetchOrders();
    });


// Function to delete the order by making an AJAX request
    function deleteOrder(orderID) {
        // Make an AJAX request to delete the order by ID
        $.ajax({
            type: 'GET',
            url: 'delete_order.php',
            data: {
                orderID: orderID
            },
            success: function (response) {
                console.log('Order deleted successfully');
            },
            error: function (error) {
                console.error('AJAX error', error);
            }
        });
    }







});

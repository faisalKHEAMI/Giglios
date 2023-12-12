$(document).ready(function () {


    // Event listener for the update order button
    $(document).on('submit', 'form', function (event) {
        event.preventDefault();  // Prevent the default form submission

        var orderID = $(this).find('button.updateOrderButton').val();

        // Ask for confirmation before changing the order information
        if (confirm('Are you sure you want to update this order?')) {
            // Call the function to update order information
            updateOrder(orderID);

            // Refresh the order list
            fetchOrders();
        }
    });


    $(document).on('click', '[id^="orderPickedUpButton_"]', function () {
        var orderID = $(this).val();
        // Ask for confirmation before changing the status
        if (confirm('Are you sure you want to mark this order as picked up?')) {
            // Create a function and PHP script to change payStat to 'Picked Up'
            updateOrderPickedUp(orderID, 'Picked Up');
            // Refresh the order list
            fetchOrders();
        }
    });

});

function updateOrderPickedUp(orderID, text) {
    $.ajax({
        type: 'POST',
        url: 'update_Order.php',
        data: {
            orderID: orderID,
            payStat: text
        },
        dataType: 'json',
        success: function (response) {
            console.log('Update success', response);
            // Handle the response appropriately, e.g., show a success message
        },
        error: function (xhr, status, error) {
            console.error('Update error', status, error);
            // Handle errors, e.g., show an error message to the user
        }
    });
}

function updateOrder(orderID) {
    // Extracting the extras value from the formatted string
    var extrasValue = $('#extras_' + orderID).val().replace('Extras:', '').trim();

    $.ajax({
        type: 'POST',
        url: 'update_Order.php',
        data: {
            orderID: orderID,
            fullName: $('#fullName_' + orderID).val(),
            pickUpTime: $('#pickUpTime_' + orderID).val(),
            phoneNumber: $('#phoneNumber_' + orderID).val(),
            breadType: $('#breadType_' + orderID).val(),
            breadSize: $('#breadSize_' + orderID).val(),
            meat: $('#meat_' + orderID).val(),
            cheese: $('#cheese_' + orderID).val(),
            toppings: $('#toppings_' + orderID).val(),
            sauces: $('#sauces_' + orderID).val(),
            extras: extrasValue
        },
        dataType: 'json',
        success: function (response) {

            console.log('Update success', response);
            // Handle the response appropriately, e.g., show a success message
        },
        error: function (xhr, status, error) {
            console.error('Update error', status, error);
            // Handle errors, e.g., show an error message to the user
        }
    });
}

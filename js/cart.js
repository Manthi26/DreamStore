(function () {
    'use strict'

    $('#nav_logout').hide();

    // Hide login and show logout if user is available
    try {
        let user = sessionStorage.getItem("dream_store_user");
        if (user && user.trim() !== "") {
            let userObj = JSON.parse(user);
            if (userObj.username && userObj.username.trim() !== "") {
                $('#nav_logout').show();

                if (userObj.type === "A") {
                    //productsBtn.show();
                } else if (userObj.type === "G") {
                    //ordersBtn.show();
                } else if (userObj.type === "U") {
                    //cartBtn.show();
                }
            }
        } else {
            window.location.href = 'login.html';
        }
    } catch (e) {
        window.location.href = 'login.html';
        console.error(e);
    }

    loadData()
})()

function loadData() {
    let user = sessionStorage.getItem("dream_store_user");
    if (user && user.trim() !== "") {
        let userObj = JSON.parse(user);
        if (userObj.username && userObj.username.trim() !== "") {
            // Load data from backend
            $.ajax({
                url: 'backend/fetchItemsForUser.php',
                type: 'POST',
                data: {'username': userObj.username.trim()},
                success: function (result) {
                    let cartData = [];
                    let orderData = [];
                    $.each(result, (index, item) => {
                        if (item.status == "C") {
                            cartData.push(item);
                        } else {
                            orderData.push(item);
                        }
                    })
                    createCartTable(cartData, userObj.type);
                    createOrderTable(orderData, userObj.type);
                },
                error: function (error) {
                    console.error(error);
                    alert("An error occurred. Please try again later.");
                }
            });
        }
    }
}

function createCartTable(result, userType) {
    let $el = $('#cart-container');
    $el.empty();
    // dynamically create cloth card
    $.each(result, (index, item) => {
        $el.append(
            '<tr>' +
            '            <td class="text-center"><img src="backend/uploads/' + item.product_image + '" alt="" style="height: 100px;" class="rounded-2" /></td>' +
            '            <td class="text-center align-middle"><b>' + item.product_name + '</b></td>' +
            '            <td class="text-center align-middle">x<b>' + item.quantity + '</b></td>' +
            '            <td class="text-center align-middle"><b>' + item.shoulders + '</b> cm</td>' +
            '            <td class="text-center align-middle"><b>' + item.chest + '</b> cm</td>' +
            '            <td class="text-center align-middle"><b>' + item.sleeve + '</b> cm</td>' +
            '            <td class="text-center align-middle"><b>' + item.waist + '</b> cm</td>' +
            '            <td class="text-center align-middle"><b>' + item.center_back + '</b> cm</td>' +
            '            <td class="text-center align-middle">' +
            '                <button class="btn btn-danger btn-sm" type="button" onclick="deleteFromCart(\''+ item.seq_id +'\')">REMOVE</button>' +
            '            </td>' +
            '        </tr>'
        );
    })
}

function createOrderTable(result, userType) {
    let $el = $('#order-container');
    $el.empty();
    // dynamically create cloth card
    $.each(result, (index, item) => {
        $el.append(
            '<tr>' +
            '            <td class="text-center"><img src="backend/uploads/' + item.product_image + '" alt="" style="height: 100px;" class="rounded-2" /></td>' +
            '            <td class="text-center align-middle"><b>' + item.product_name + '</b></td>' +
            '            <td class="text-center align-middle">x<b>' + item.quantity + '</b></td>' +
            '            <td class="text-center align-middle"><b>' + item.shoulders + '</b> cm</td>' +
            '            <td class="text-center align-middle"><b>' + item.chest + '</b> cm</td>' +
            '            <td class="text-center align-middle"><b>' + item.sleeve + '</b> cm</td>' +
            '            <td class="text-center align-middle"><b>' + item.waist + '</b> cm</td>' +
            '            <td class="text-center align-middle"><b>' + item.center_back + '</b> cm</td>' +
            '            <td class="text-center align-middle">' +
            '               <select class="form-control status-dropdown" disabled>' +
            '                   <option value="pending" ' + (index.status === "P" ? "selected" : "") + '>Waiting for Tailor</option>' +
            '                   <option value="processing" ' + (index.status === "T" ? "selected" : "") + '>Processing By Tailor</option>' +
            '                   <option value="completed" ' + (index.status === "S" ? "selected" : "") + '>Waiting to be Shipped</option>' +
            '                   <option value="completed" ' + (index.status === "D" ? "selected" : "") + '>Shipped</option>' +
            '               </select>' +
            '            </td>' +
            '        </tr>'
        );
    })
}

function deleteFromCart(orderId) {
    $.ajax({
        url: 'backend/deleteCartItemById.php',
        type: 'POST',
        data: {'orderId' : orderId},
        success: function (result) {
            loadData();
        },
        error: function (error) {
            console.error(error);
            alert("An error occurred. Please try again later.");
        }
    });
}

function placeOrder() {
    let $el = $('#cart-container');
    if (!$el.html() || $el.html().trim() === "") {
        alert('Please add items to cart first!');
    } else if (confirm('Are you sure to place order?')) {
        let user = sessionStorage.getItem("dream_store_user");
        if (user && user.trim() !== "") {
            let userObj = JSON.parse(user);
            if (userObj.username && userObj.username.trim() !== "") {
                $.ajax({
                    url: 'backend/placeOrder.php',
                    type: 'POST',
                    data: {
                        username: userObj.username
                    },
                    success: function (result) {
                        if (result === '0') {
                            alert('Order placed successfully.');
                        } else {
                            alert('An error occurred. Please try again later.');
                        }
                        loadData();
                    }
                });
            } else {
                alert('An error occurred. Please try again later.');
            }
        }
    }
}

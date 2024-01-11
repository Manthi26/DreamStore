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
                } else if (userObj.type === "G") {
                    alert("You are not allowed to access this page!")
                    window.location.href = 'index.html';
                } else if (userObj.type === "U") {
                    alert("You are not allowed to access this page!")
                    window.location.href = 'index.html';
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
                url: 'backend/fetchItemsForAdmin.php',
                type: 'GET',
                success: function (result) {
                    let pendingOrders = [];
                    let previousOrders = [];
                    $.each(result, (index, item) => {
                        if (item.status === "S") {
                            pendingOrders.push(item);
                        } else {
                            previousOrders.push(item);
                        }
                    })
                    createToBeShippedTable(pendingOrders, userObj.type);
                    createAllOrdersTable(previousOrders, userObj.type);
                },
                error: function (error) {
                    console.error(error);
                    alert("An error occurred. Please try again later.");
                }
            });
        }
    }
}

function createToBeShippedTable(result, userType) {
    let $el = $('#tobe-shipped-container');
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
            '                <button class="btn btn-primary btn-sm" type="button" onclick="markOrderByAdmin(\'' + item.seq_id + '\', \'D\')">Mark as Shipped</button>' +
            '            </td>' +
            '        </tr>'
        );
    })
}

function createAllOrdersTable(result, userType) {
    let $el = $('#all_orders-container');
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
            '                   <option value="pending" ' + (item.status === "P" ? "selected" : "") + '>Waiting for Tailor</option>' +
            '                   <option value="processing" ' + (item.status === "R" ? "selected" : "") + '>Rejected By Tailor</option>' +
            '                   <option value="processing" ' + (item.status === "T" ? "selected" : "") + '>Processing By Tailor</option>' +
            '                   <option value="shipped" ' + (item.status === "S" ? "selected" : "") + '>Waiting to be Shipped</option>' +
            '                   <option value="completed" ' + (item.status === "D" ? "selected" : "") + '>Shipped</option>' +
            '               </select>' +
            '            </td>' +
            '        </tr>'
        );
    })
}

function markOrderByAdmin(orderId, status) {
    if (confirm("Are you sure to mark this as shipped?")) {
        $.ajax({
            url: 'backend/markOrderCompleted.php',
            type: 'POST',
            data: {'status': status, 'orderId': orderId},
            success: function (result) {
                loadData();
            },
            error: function (error) {
                console.error(error);
                alert("An error occurred. Please try again later.");
            }
        });
    }
}

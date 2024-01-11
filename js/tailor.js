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
                    alert("You are not allowed to access this page!")
                    window.location.href = 'index.html';
                } else if (userObj.type === "G") {
                    //ordersBtn.show();
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
                url: 'backend/fetchItemsForTailor.php',
                type: 'GET',
                success: function (result) {
                    let pendingOrders = [];
                    let previousOrders = [];
                    $.each(result, (index, item) => {
                        if (item.status === "P" || item.status === "T") {
                            pendingOrders.push(item);
                        } else {
                            previousOrders.push(item);
                        }
                    })
                    createPendingTable(pendingOrders, userObj.type);
                    createPreviousTable(previousOrders, userObj.type);
                },
                error: function (error) {
                    console.error(error);
                    alert("An error occurred. Please try again later.");
                }
            });
        }
    }
}

function createPendingTable(result, userType) {
    let $el = $('#pending-container');
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
            ((item.status === "P") ?
                '                <button class="btn btn-primary btn-sm" type="button" onclick="markOrderByTailor(\'' + item.seq_id + '\', \'T\')">Accept Order</button>' +
                '                <button class="btn btn-danger btn-sm ms-1" type="button" onclick="markOrderByTailor(\'' + item.seq_id + '\', \'R\')">Reject Order</button>'
                :
                '                <button class="btn btn-primary btn-sm" type="button" onclick="markOrderByTailor(\'' + item.seq_id + '\', \'S\')">Mark as Complete</button>')
                +
            '            </td>' +
            '        </tr>'
        );
    })
}

function createPreviousTable(result, userType) {
    let $el = $('#previous-container');
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

function markOrderByTailor(orderId, status) {
    let message
    if (status === "T") {
        message = "Are you sure to accept this order?"
    } else if (status === "R") {
        message = "Are you sure to reject this order?"
    } else {
        message = "Are you sure to mark this as completed manufacturing?"
    }
    if (confirm(message)) {
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

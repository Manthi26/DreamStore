(function () {
    'use strict'

    $('#nav_logout').hide();

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    let forms = document.querySelectorAll('.needs-validation')
    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
        .forEach(function (form) {
            form.addEventListener('submit', function (event) {
                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                }
                form.classList.add('was-validated')
            }, false)
        })

    // Hide login and show logout if user is available
    try {
        let user = sessionStorage.getItem("dream_store_user");
        if (user && user.trim() !== "") {
            let userObj = JSON.parse(user);
            if (userObj.username && userObj.username.trim() !== "") {
                let cartBtn = $('#cart_btn');
                let ordersBtn = $('#orders_btn');
                let productsBtn = $('#products_btn');
                cartBtn.hide();
                ordersBtn.hide();
                productsBtn.hide();
                $('#nav_logout').show();
                $('#nav_login').hide();

                if (userObj.type === "A") {
                    productsBtn.show();
                } else if (userObj.type === "G") {
                   ordersBtn.show();
                } else if (userObj.type === "U") {
                    cartBtn.show();
                }
            }
        }
    } catch (e) {
        $('#nav_logout').hide();
        $('#nav_login').show();
        console.error(e);
    }

    let user = sessionStorage.getItem("dream_store_user");
    if (user && user.trim() !== "") {
        let userObj = JSON.parse(user);
        if (userObj.username && userObj.username.trim() !== "") {
                // Load data from backend
                $.ajax({
                    url: 'backend/fetchAllProducts.php',
                    type: 'GET',
                    success: function (result) {
                        createItems(result, userObj.type);
                    }
                });
        } else {
            $.ajax({
                url: 'backend/fetchAllProducts.php',
                type: 'GET',
                success: function (result) {
                    createItems(result, "U");
                }
            });
        }
    } else {
        $.ajax({
            url: 'backend/fetchAllProducts.php',
            type: 'GET',
            success: function (result) {
                createItems(result, "U");
            }
        });
    }


})()

function deleteById(id) {
    if (confirm('Are you sure to delete?')) {
        $.ajax({
            url: 'backend/deleteById.php',
            type: 'POST',
            data: {
                product_id: id
            },
            success: function(result) {
                if (result === '0') {
                    alert('Product deleted successfully.');
                    window.location.href = 'index.html';
                } else if (result === '1') {
                    alert('Could not delete this product as there are orders!');
                } else {
                    alert('An error occurred. Please try again later.');
                }
            }
        });
    }
}

function addToCart(id) {
    let user = sessionStorage.getItem("dream_store_user");
    if (user && user.trim() !== "") {
        let userObj = JSON.parse(user);
        if (userObj.username && userObj.username.trim() !== "") {
            window.location.href = 'add_to_cart.html?product_id=' + id;
        } else {
            window.location.href = 'login.html';
        }
    } else {
        window.location.href = 'login.html';
    }
}

function createItems(result, userType) {
    let $el = $('#cloth-container');
    // dynamically create cloth card
    $.each(result, (index, item) => {
        $el.append(
            '<div class="col-3">' +
            '            <div class="card">' +
            '                <div class="card-img">' +
            '                    <img src="backend/uploads/' + item.imagePath + '" alt=""/>' +
            '                </div>' +
            '                <div class="card-body">' +
            '                    <h5 class="card-title" style="margin-bottom: 3px; font-weight: 600;">' + item.name + '</h5>' +
            '                    <p class="m-0" style="margin-bottom: 3px; font-weight: 500;">Rs.' + item.price + '</p>' +
            '                    <div class="card-text">' +
            '                        <div class="text-limit">' + item.description + '</div>' +
            '                        <div class="row px-3 mt-3 mb-0">' +
            ((userType === "A") ?
                    '                            <button class="btn btn-outline-danger btn-sm" onclick="deleteById(\''+ item.id +'\')"> Delete Product' +
                    '                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"' +
                    '                                     class="bi bi-trash" style="margin: -4px 0 0 5px" viewBox="0 0 16 16">' +
                    '                                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>' +
                    '                                    <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>' +
                    '                                </svg>' +
                    '                            </button>'
            :
            (userType === "U") ?
                    '                            <button class="btn btn-outline-primary btn-sm" onclick="addToCart(\''+ item.id +'\')"> Add to Cart' +
                    '                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"' +
                    '                                     class="bi bi-cart3" style="margin: -5px 0 0 5px" viewBox="0 0 16 16">' +
                    '                                    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>' +
                    '                                </svg>' +
                    '                            </button>' : ''
            ) +
            '                        </div>' +
            '                    </div>' +
            '                </div>' +
            '            </div>' +
            '        </div>'
        );
    })
}

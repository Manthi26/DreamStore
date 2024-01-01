let feedbackDiv = $('#error-feedback');
let sizeForm = $('#add-to-cart-form');

feedbackDiv.hide();

const params = new URLSearchParams(document.location.search);
(function () {
    $.ajax({
        url: 'backend/fetchProductForId.php',
        type: 'POST',
        data: {'product_id' : params.get('product_id')},
        success: function (result) {
            document.getElementById("product-img").src = 'backend/uploads/' + result.imagePath;
            document.getElementById('product-title').innerHTML = result.name;
            document.getElementById('product-desc').innerHTML = result.description;
            console.error(result)
        },
        error: function (error) {
            console.error(error);
            feedbackDiv.text("Error occurred.");
            feedbackDiv.show();
        }
    });
})()

sizeForm.submit(function () {
    feedbackDiv.hide();
    let user = sessionStorage.getItem("dream_store_user");
    let userObj = JSON.parse(user);
    $(this).append('<input type="hidden" name="product_id" value="' + params.get('product_id') + '" /> ');
    $(this).append('<input type="hidden" name="username" value="' + userObj.username + '" /> ');
    if (sizeForm[0].checkValidity()) {
        $.ajax({
            url: 'backend/add_to_cart.php',
            type: 'POST',
            data: $('#add-to-cart-form').serialize(),
            success: function (result) {
                if (result === '0') {
                    alert('Product added successfully.');
                    window.location.href = "cart.html";
                } else {
                    console.error(result);
                    feedbackDiv.text("Error occurred.");
                    feedbackDiv.show();
                }
            },
            error: function (error) {
                console.error(error);
                feedbackDiv.text("Error occurred.");
                feedbackDiv.show();
            }
        });
    }
    return false;
});

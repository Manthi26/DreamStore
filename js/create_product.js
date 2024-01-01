let feedbackDiv = $('#error-feedback');
let regForm = $('#product-form');

feedbackDiv.hide();

$("#uploadBtn").on("click", function () {
    $('#upload-image').click();
})

// Reference https://stackoverflow.com/a/26839379
$(document).on("focusin", "#imagePath", function() {
    $(this).prop('readonly', true);
});
$(document).on("focusout", "#imagePath", function() {
    $(this).prop('readonly', false);
});

$("#upload-image").on("change", function() {
    feedbackDiv.hide();
    // reference https://stackoverflow.com/a/23981045
    let file = $('#upload-image').prop('files')[0];
    let fileType = file["type"];
    let validImageTypes = ["image/gif", "image/jpeg", "image/png"];
    console.error($.inArray(fileType, validImageTypes) > 0)
    if ($.inArray(fileType, validImageTypes) > 0) {
        let formData = new FormData();
        formData.append('file', file);
        $.ajax({
            url: 'backend/save_img.php',
            type: 'post',
            cache: false,
            contentType: false,
            processData: false,
            data: formData,
            success: function(response) {
                if (response.code === 0) {
                    $('#imagePath').val(response.description);
                } else {
                    feedbackDiv.text("Image upload failed.");
                    feedbackDiv.show();
                }
            },
            error: function (error) {
                console.error(error);
                feedbackDiv.text("Error occurred.");
                feedbackDiv.show();
            }
        });
    } else {
        feedbackDiv.text("File type is not supported.");
        feedbackDiv.show();
    }
    $('#upload-image').val('');
});

regForm.submit(function () {
    feedbackDiv.hide();
    if (regForm[0].checkValidity()) {
        $.ajax({
            url: 'backend/create_product.php',
            type: 'POST',
            data: $('#product-form').serialize(),
            success: function (result) {
                if (result === '0') {
                    alert('Product created successfully.');
                    window.location.href = "index.html";
                } else {
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

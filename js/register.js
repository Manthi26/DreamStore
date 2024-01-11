let feedbackDiv = $('#error-feedback');
let regForm = $('#register-form');

feedbackDiv.hide();

regForm.submit(function () {

    feedbackDiv.hide();

    if (regForm[0].checkValidity()) {
        let passwordFieldValue = $('#password').val();
        if (!passwordFieldValue || passwordFieldValue.trim() === "" || (passwordFieldValue !== $('#confPassword').val())) {
            feedbackDiv.text("Please make sure that passwords match.");
            feedbackDiv.show();
        } else {
            $.ajax({
                url: 'backend/register.php',
                type: 'POST',
                data:  $('#register-form').serialize(),
                success: function (result) {
                    if (result === '1') {
                        feedbackDiv.text("Username already exist.");
                        feedbackDiv.show();
                    } else if (result === '0') {
                        alert('User created successfully, Please Login.');
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
    }
    return false;
});

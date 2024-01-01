let passwordIncorrect = $('#incorrect-pw');
let loginForm = $('#login-form');

passwordIncorrect.hide();

loginForm.submit(function () {
    passwordIncorrect.hide();
    if (loginForm[0].checkValidity()) {
        $.ajax({
            url: 'backend/login.php',
            type: 'POST',
            data: $('#login-form').serialize(),
            success: function (result) {
                if (result === '-1') {
                    passwordIncorrect.show();
                } else {
                    sessionStorage.setItem("dream_store_user", result);
                    window.location.href = "index.html";
                }
            },
            error: function (error) {
                console.error(error);
                passwordIncorrect.show();
            }
        });
    }
    return false;
});

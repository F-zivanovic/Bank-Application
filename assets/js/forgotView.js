let resetPasswordBtn = forgotPasswordView.querySelector('.reset__btn');
let forgotErrorMsg = forgotPasswordView.querySelector('.error__msg');

resetPasswordBtn.addEventListener('click', collectDataFromForgotPasswordView);

function collectDataFromForgotPasswordView(e) {
    e.prevenetDefault;

    let inputs = forgotPasswordView.querySelectorAll('input');

    let userData = {
        username: inputs[0].value,
        newPassword: inputs[1].value,
        confirmPassword: inputs[2].value
    };

    validateForgotPasswordForm(userData);
}


function validateForgotPasswordForm(a) {

    if (a.username == '' || a.newPassword == '' || a.confirmPassword == '') {
        forgotErrorMsg.innerHTML = 'All filed are reauired!';
        return;
    }

    if (a.username) {
        // let foundUser = usersDB.find((user) => user.username == a.username);

        if (!findUserInDB(a, 'username')) {
            forgotErrorMsg.innerHTML = 'User does not exist!';
            return;
        }
    }

    if (a.newPassword.length < 5) {
        forgotErrorMsg.innerHTML = 'Password must contain at least  characters!';
        return;
    }

    if (a.newPassword == a.confirmPassword) {
        changePassword(a);
    }
    else {
        forgotErrorMsg.innerHTML = 'Passwords do not match!';
    }
}

function changePassword(data) {
    forgotErrorMsg.innerHTML = '';

    usersDB.forEach((user) => {

        if (user.username == data.username) {
            user.password = data.newPassword;
        }
    });
    localStorage.db = JSON.stringify(usersDB);
    forgotPasswordView.querySelector('form').reset();
    showPopup(`Succesfully update password for ${ data.username } user`);
    setTimeout(function () {
        forgotPasswordView.style.display = 'none';
        loginView.style.display = 'flex';
    }, 2000);

}

let registerViewBtn = loginView.querySelector('.register__view-btn');
let loginBtn = loginView.querySelector('.login__btn');
let loginErrorMsg = loginView.querySelector('.login__error-msg');

registerViewBtn.addEventListener('click', showRegisterView);
loginBtn.addEventListener('click', validateLoginForm);

function showRegisterView() {
    loginView.style.display = 'none';
    registerView.style.display = 'block';
    // adminView.style.display = 'none';
}

function validateLoginForm(e) {
    e.preventDefault();

    let username = loginView.querySelector('input[name="username"]');
    let password = loginView.querySelector('input[name="password"]');

    let userData = {
        username: username.value,
        password: password.value
    };

    if (userData.username == '' || userData.password == '') {
        loginErrorMsg.innerHTML = 'All fields are required!';
        return;
    }

    if (userData.password.length < 5) {
        loginErrorMsg.innerHTML = 'Password must contain at least 6 characters!';
        return;
    }

    if (userData.username == 'admin' && userData.password == 'admin') {
        loginView.querySelector('form').reset();
        showPopup('Welcome to admin panel');

        setTimeout(() => {
            createAccountsTable();
            loginView.style.display = 'none';
            adminView.style.display = 'flex';
        }, 2500)

        return;
    }

    if (username) {
        const foundUser = usersDB.find((user) => user.username == userData.username && user.password == userData.password);
        if (foundUser) {
            loginView.querySelector('form').reset();
            showPopup('You loged succesfully')
            loginErrorMsg.innerHTML = '';

            // prikazi profil korisnika
        } else {
            showPopup('User does not exist. Try again.');
        }
    }
}
let registerViewBtn = loginView.querySelector('.register__view-btn');
let loginBtn = loginView.querySelector('.login__btn');
let loginErrorMsg = loginView.querySelector('.login__error-msg');

registerViewBtn.addEventListener('click', showRegisterView);
loginBtn.addEventListener('click', validateLoginForm);

function showRegisterView() {
    loginView.style.display = 'none';
    registerView.style.display = 'block';
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
        }, 2000)

        return;
    }

    if (userData.username) {
        const founUsername = usersDB.find((user) => user.username == userData.username)

        if (!founUsername) {
            loginErrorMsg.innerHTML = 'Username is not correct!';
            return;
        }
    }

    if (userData.password) {
        const founPassword = usersDB.find((user) => user.password == userData.password)

        if (!founPassword) {
            loginErrorMsg.innerHTML = 'Password is not correct!';
            return;
        }
    }

    if (username) {
        const foundUser = usersDB.find((user) => user.username == userData.username && user.password == userData.password);
        if (foundUser) {
            showPopup('You loged succesfully')
            loginErrorMsg.innerHTML = '';
            showUserProfile(username.value);
            loginView.querySelector('form').reset();

        } else {
            showPopup('User does not exist. Try again.');
        }
    }
}
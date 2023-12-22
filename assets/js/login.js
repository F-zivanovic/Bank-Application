let loginView = document.querySelector('.login__view');
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
        // alert('admin panel bato');
        // return;

        // prikazi admin panel
    }

    if (username) {
        const foundUser = usersDB.find((user) => user.username == userData.username && user.password == userData.password);
        if (foundUser) {
            alert('You login succesfully');
            loginView.querySelector('form').reset();
            loginErrorMsg.innerHTML = '';

            // prikazi profil korisnika
        } else {
            let loginModal = loginView.querySelector('.login__modal');
            loginModal.style.display = 'flex';
            let closeBtn = loginView.querySelector('.login__modal__close');
            closeBtn.addEventListener('click', () => {
                loginModal.style.display = 'none';
                loginView.querySelector('form').reset();
                loginErrorMsg.innerHTML = '';
            });
        }
    }
}
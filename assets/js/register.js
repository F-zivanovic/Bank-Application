let usersDB = [];

if (localStorage.db) {
    usersDB = JSON.parse(localStorage.db);
}

let registerView = document.querySelector('.register__view');
let registerBtn = registerView.querySelector('.register__btn');
let errorMsg = registerView.querySelector('.register__error-msg');

registerBtn.addEventListener('click', validateRegisterForm);

function validateRegisterForm(e) {

    e.preventDefault();
    let cardNumber = registerView.querySelector('input[name="card"]');
    let email = registerView.querySelector('input[name="email"]');
    let username = registerView.querySelector('input[name="username"]');
    let password = registerView.querySelector('input[name="password"]');

    let userData = {
        cardNumber: cardNumber.value,
        email: email.value,
        username: username.value,
        password: password.value
    };

    if (userData.cardNumber == '' || userData.email == '' || userData.username == '' || userData.password == '') {
        errorMsg.innerHTML = 'All fields are required!';
        return;
    }

    if (userData.cardNumber.length !== 8) {
        errorMsg.innerHTML = 'The card number must have 8 digit!';
        return;
    }

    let emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!userData.email.match(emailFormat)) {
        errorMsg.innerHTML = 'Please enter valid email!';
        return;
    }

    if (userData.username) {
        const foundUser = usersDB.find((user) => user.username == userData.username);
        if (foundUser) {
            errorMsg.innerHTML = 'User already exist!';
            return;
        }
    }

    if (userData.password.length < 5) {
        errorMsg.innerHTML = 'Password must contain at least 6 characters!';
        return;
    }

    if (localStorage.db) {
        checkCardNumber(userData);
    }
    else {
        errorMsg.innerHTML = '';
        saveRegisteredUser(userData);
    }
}

function saveRegisteredUser(user) {
    usersDB.push(user);
    localStorage.db = JSON.stringify(usersDB);

    registerView.querySelector('form').reset();
    alert('You registered succesfully');

    setTimeout(function () {
        registerView.style.display = 'none';
        loginView.style.display = 'flex';
    }, 1000);

}


function checkCardNumber(a) {
    let db = JSON.parse(localStorage.db);
    const foundUser = db.find(user => user.cardNumber == a.cardNumber);

    if (foundUser) {
        errorMsg.innerHTML = 'Please enter the new card number!';
    }
    else {
        errorMsg.innerHTML = '';
        saveRegisteredUser(a);
    }
}




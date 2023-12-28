let registerBtn = registerView.querySelector('.register__btn');
let errorMsg = registerView.querySelector('.register__error-msg');

registerBtn.addEventListener('click', collectUserData);

function collectUserData(e) {
    e.preventDefault();

    const inputs = registerView.querySelectorAll('input');

    let userData ={
        cardNumber: inputs[0].value,
        email: inputs[1].value,
        username: inputs[2].value,
        password: inputs[3].value,
        bilance: 5000
    }

    validateRegisterForm(userData);
}

function validateRegisterForm(a) {
    if (a.cardNumber == '' || a.email == '' || a.username == '' || a.password == '') {
        errorMsg.innerHTML = 'All fields are required!';
        return;
    }

    if (a.cardNumber.length !== 8) {
        errorMsg.innerHTML = 'The card number must have 8 digit!';
        return;
    }

    let emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!a.email.match(emailFormat)) {
        errorMsg.innerHTML = 'Please enter valid email!';
        return;
    }

    if (a.username) {
        const foundUser = usersDB.find((user) => user.username == a.username);
        if (foundUser) {
            errorMsg.innerHTML = 'User already exist!';
            return;
        }
    }

    if (a.password.length < 5) {
        errorMsg.innerHTML = 'Password must contain at least 6 characters!';
        return;
    }

    if (localStorage.db) {
        checkCardNumber(a);
    }
    else {
        errorMsg.innerHTML = '';
        saveRegisteredUser(a);
    }
}

function saveRegisteredUser(user) {
    usersDB.push(user);
    localStorage.db = JSON.stringify(usersDB);

    registerView.querySelector('form').reset();
    showPopup('You registered succesfully');

    setTimeout(function () {
        registerView.style.display = 'none';
        loginView.style.display = 'flex';
    }, 2000);
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




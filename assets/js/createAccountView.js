let createAccountView = document.querySelector('.create__account__view');
let createAccountsBtn = adminView.querySelector('.create__account__btn');
let saveAccountBtn = createAccountView.querySelector('.save__account');

saveAccountBtn.addEventListener('click', saveAccount);

createAccountsBtn.addEventListener('click', () => {
    accountsList.style.display = 'none';
    createAccountView.style.display = 'block';
});

function saveAccount() {

    let cardNumber = createAccountView.querySelector('input[name="card"]');
    let email = createAccountView.querySelector('input[name="email"]');
    let username = createAccountView.querySelector('input[name="username"]');
    let password = createAccountView.querySelector('input[name="password"]');

    let newAccount = {
        cardNumber: cardNumber.value,
        email: email.value,
        username: username.value,
        password: password.value
    };

    validateNewAccount(newAccount);
}

function validateNewAccount(a) {
    let errorMsg = createAccountView.querySelector('.error__msg');

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
        let db = JSON.parse(localStorage.db);
        const foundUser = db.find(user => user.cardNumber == a.cardNumber);

        if (foundUser) {
            errorMsg.innerHTML = 'Please enter the new card number!';
        }
        else {
            errorMsg.innerHTML = '';
            usersDB.push(a);
            localStorage.db = JSON.stringify(usersDB);
            alert('You create a new account succesfully');
            createAccountsTable();
        }
    }

    else {
        errorMsg.innerHTML = '';
        usersDB.push(a);
        localStorage.db = JSON.stringify(usersDB);
        alert('You create a new account succesfully');
        createAccountsTable();
    }
}


// Database
let usersDB = [];

if (localStorage.db) {
    usersDB = JSON.parse(localStorage.db);
}

// Views
const registerView = document.querySelector('.register__view');
const loginView = document.querySelector('.login__view');
const adminView = document.querySelector('.admin__view');
const createAccountView = document.querySelector('.create__account__view');
const editAccountView = document.querySelector('.edit__account__view');
const editFormView = document.querySelector('.edit__form__view');
const userAccountView = document.querySelector('.user__account__view');
const forgotPasswordView = document.querySelector('.forgot__view');


// Popup message
function showPopup(msg) {
    let popup = document.querySelector(".popup__info");
    let popupMsg = document.querySelector('.popup__msg');

    popup.classList.add('show');
    popupMsg.innerHTML = msg;

    setTimeout(function () {
        popup.classList.remove('show');
    }, 1200);
}



// Find user
function findUserInDB(a, b) {

    const foundUser = usersDB.find((user) => user[b] == a[b]);
    return foundUser;
}

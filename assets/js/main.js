let usersDB = [];

if (localStorage.db) {
    usersDB = JSON.parse(localStorage.db);
}

// Views
const adminView = document.querySelector('.admin__view');
const createAccountView = document.querySelector('.create__account__view');
const editAccountView = document.querySelector('.edit__account__view');
const editFormView = document.querySelector('.edit__form__view');





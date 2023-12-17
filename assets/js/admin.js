// Views
let adminView = document.querySelector('.admin__view');
let accountsView = document.querySelector('.accounts__view');
let createAccountView = document.querySelector('.create__account__view');
let updateAccountView = document.querySelector(".update__account__view");
let updateFormView = document.querySelector('.update__form__view');


// Buttons
let accountsBtn = document.querySelector('.accounts__btn')
let createAccountBtn = document.querySelector('.create__account__btn')
let updateAccountBtn = document.querySelector('.update__account__btn');
let saveAccountBtn = document.querySelector(".save__account");
let logoutBtn = adminView.querySelector('.logout__btn');
let updateFormBtn = updateFormView.querySelector('.update__form__btn');

let index = null;



// Listeners
accountsBtn.addEventListener('click', () => {
    displayView(accountsView, createAccountView, updateAccountView, updateFormView);
});

createAccountBtn.addEventListener('click', () => {
    displayView(createAccountView, accountsView, updateAccountView, updateFormView)
})

updateAccountBtn.addEventListener('click', () => {
    displayView(updateAccountView, accountsView, createAccountView, updateFormView);
    createEditTable();
})

updateFormBtn.addEventListener('click', updateAccount);

saveAccountBtn.addEventListener('click', saveAccount);

logoutBtn.addEventListener('click', () => {
    adminView.style.display = 'none';
    loginView.style.display = 'flex';
});

function displayView(a, b, c, d) {
    b.style.display = 'none';
    c.style.display = 'none';
    d.style.display = 'none';
    a.style.display = 'block';
}


/*--------------------------
ACCOUNTS VIEW
--------------------------*/


createAccountsTable();

function createAccountsTable(accounts) {
    let accountsTable = document.querySelector('.accounts__table tbody');
    let currentAccounts = accounts || usersDB;
    let html = ``;
    currentAccounts.forEach((user) => {
        html += `<tr>
                    <td>${ user.id }</td>
                    <td>${ user.fullname }</td>
                    <td>${ user.email }</td>
                    <td>${ user.username }</td>
                    <td>${ user.password }</td>
                </tr>`.trim();
    });
    accountsTable.innerHTML = html;
}



/*--------------------------
ADD ACCOUNT VIEW
--------------------------*/
function saveAccount() {
    let newAccount = {
        id: createAccountView.querySelector('input[name="id"]').value,
        fullname: createAccountView.querySelector('input[name="fullname"]').value,
        email: createAccountView.querySelector('input[name="email"]').value,
        username: createAccountView.querySelector('input[name="username"]').value,
        password: createAccountView.querySelector('input[name="password"]').value
    };

    if (validateNewAccount(newAccount)) {
        usersDB.push(newAccount);
        createAccountsTable();
        createAccountView.querySelector('input[name="id"]').value = '';
        createAccountView.querySelector('input[name="fullname"]').value = '';
        createAccountView.querySelector('input[name="email"]').value = '';
        createAccountView.querySelector('input[name="username"]').value = '';
        createAccountView.querySelector('input[name="password"]').value = '';
        createAccountView.querySelector('.error__msg').innerHTML = '';
        displayView(accountsView, updateAccountView, createAccountView, updateFormView);
    }
}

// function generateId() {
//     let rand;
//     let loop = true;

//     while (loop) {

//         rand = Math.floor(Math.random() * 5);
//         let filtered = usersDB.filter((user) => user.id == rand);

//         if (filtered.length == 0) {
//             loop = false;
//         }
//     }

//     return rand;
// }

function validateNewAccount(a) {

    if (a.fullName == '' || a.email == '' || a.username == '' || a.password == '') {
        let errorMsg = createAccountView.querySelector('.error__msg');
        errorMsg.innerHTML = 'All fields are required!';
        return false;
    } else {
        return true;
    }
}


/*--------------------------
UPDATE ACCOUNTS VIEW
--------------------------*/
function createEditTable() {
    let updateTable = updateAccountView.querySelector('.update__table tbody');
    let html = ``;
    usersDB.forEach((user, index) => {
        html += `<tr>
                    <td>${ user.id }</td>
                    <td>${ user.fullname }</td>
                    <td>${ user.email }</td>
                    <td>${ user.username }</td>
                    <td>${ user.password }</td>
                    <td>
                    <button data-index="${ index }" class="delete__account">Delete</button>
                    <button data-index="${ index }" class="update__account">Update</button>
                    </td>
                </tr>`.trim();
    });

    updateTable.innerHTML = html;

    let deleteAccountBtns = updateAccountView.querySelectorAll('.delete__account');
    let updateAccountBtns = updateAccountView.querySelectorAll('.update__account');

    deleteAccountBtns.forEach((btn, index) => {
        btn.addEventListener('click', deleteAccount);
        updateAccountBtns[index].addEventListener('click', displayUpdateForm);
    })
}

function deleteAccount() {
    let index = this.getAttribute('data-index');
    this.closest('tr').remove();
    usersDB.splice(index, 1);
    createAccountsTable();
}

function displayUpdateForm() {

    index = this.getAttribute("data-index");
    let currentAccount = usersDB[index];
    document.querySelector('input[name="uid"]').value = currentAccount.id;
    document.querySelector('input[name="ufullname"]').value = currentAccount.fullname;
    document.querySelector('input[name="uemail"]').value = currentAccount.email;
    document.querySelector('input[name="uusername"]').value = currentAccount.username;
    document.querySelector('input[name="upassword"]').value = currentAccount.password;

    displayView(updateFormView, updateAccountView, createAccountView, accountsView);
}

function updateAccount() {
    let updatedAccount = {
        id: updateFormView.querySelector('input[name="uid"]').value,
        fullname: updateFormView.querySelector('input[name="ufullname"]').value,
        email: updateFormView.querySelector('input[name="uemail"]').value,
        username: updateFormView.querySelector('input[name="uusername"]').value,
        password: updateFormView.querySelector('input[name="upassword"]').value
    };

    usersDB[index] = (updatedAccount);
    createAccountsTable();
    displayView(accountsView, createAccountView, updateAccountView, updateFormView);
}


/*--------------------------
SEARCH USERS DB
--------------------------*/
let searchInput = document.querySelector('.admin__search');
searchInput.addEventListener('keyup', searcUsersDB);

function searcUsersDB() {
    let searchTerm = this.value;
    let filtered = usersDB.filter((user) => user.fullname.indexOf(searchTerm) > -1 || user.email.indexOf(searchTerm) > -1 || user.username.indexOf(searchTerm) > -1 || user.password.indexOf(searchTerm) > -1);
    createAccountsTable(filtered);
}
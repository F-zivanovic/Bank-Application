let logoutBtn = adminView.querySelector('.logout__btn');
let accountBtn = adminView.querySelector('.accounts__btn');
let accountsList = adminView.querySelector('.accounts__list');
let search = adminView.querySelector('.admin__search');


search.addEventListener('keyup', searchDB);
logoutBtn.addEventListener('click', logOutUser);
accountBtn.addEventListener('click', function () {
    createAccountView.style.display = 'none';
    editAccountView.style.display = 'none';
    editFormView.style.display = 'none';
    accountsList.style.display = 'block';
});

function logOutUser() {
    adminView.style.display = 'none';
    createAccountView.style.display = 'none';
    editAccountView.style.display = 'none';
    editFormView.style.display = 'none';
    loginView.style.display = 'flex';
}

function searchDB() {
    let searchTerm = this.value;
    let filtered = usersDB.filter((user) => user.cardNumber.indexOf(searchTerm) > -1 || user.email.indexOf(searchTerm) > -1 || user.username.indexOf(searchTerm) > -1 || user.password.indexOf(searchTerm) > -1);

    createAccountsTable(filtered);
}

createAccountsTable();

function createAccountsTable(accounts) {
    let currentAccounts = accounts || usersDB;
    // let db = JSON.parse(localStorage.db);
    let accountsTable = adminView.querySelector('.accounts__list tbody');
    let html = ``;

    currentAccounts.forEach((user) => {
        html += `<tr>
                    <td>${ user.cardNumber }</td>
                    <td>${ user.email }</td>
                    <td>${ user.username }</td>
                    <td>${ user.password }</td>
                </tr>`.trim();
    });

    accountsTable.innerHTML = html;

    // console.log(db);
}
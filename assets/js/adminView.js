let adminView = document.querySelector('.admin__view');
let logoutBtn = adminView.querySelector('.logout__btn');
let accountBtn = adminView.querySelector('.accounts__btn');
let accountsList = adminView.querySelector('.accounts__list');

logoutBtn.addEventListener('click', logOutUser);
accountBtn.addEventListener('click', function () {
    createAccountView.style.display = 'none';
    accountsList.style.display = 'block';
});

function logOutUser() {
    adminView.style.display = 'none';
    loginView.style.display = 'flex';
}

// createAccountsTable();

function createAccountsTable() {

    let db = JSON.parse(localStorage.db);
    let accountsTable = adminView.querySelector('.accounts__list tbody');
    let html = ``;

    db.forEach((user) => {
        html += `<tr>
                    <td>${ user.cardNumber }</td>
                    <td>${ user.email }</td>
                    <td>${ user.username }</td>
                    <td>${ user.password }</td>
                </tr>`.trim();
    });

    accountsTable.innerHTML = html;
}
let adminView = document.querySelector('.admin__view');

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
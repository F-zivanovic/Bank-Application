let editAccountBtn = adminView.querySelector('.edit__account__btn');

editAccountBtn.addEventListener('click', displayView);

function displayView() {
    createEditTable();
    accountsList.style.display = 'none';
    createAccountView.style.display = 'none';
    editAccountView.style.display = 'block';
}

function createEditTable() {
    let db = JSON.parse(localStorage.db);
    let edeitTable = editAccountView.querySelector('.edit__table tbody');
    let html = ``;

    db.forEach((user, index) => {
        html += `<tr>
                    <td>${ user.cardNumber }</td>
                    <td>${ user.email }</td>
                    <td>${ user.username }</td>
                    <td>${ user.password }</td>
                    <td>
                    <button data-index="${ index }" class="edit__account">edit account</button>
                    <button data-index="${ index }" class="delete__account">delete account</button>
                    </td>
                </tr>`.trim();
    });

    edeitTable.innerHTML = html;

    let deleteAccountBtn = editAccountView.querySelectorAll('.delete__account');

    deleteAccountBtn.forEach((btn) => {
        btn.addEventListener('click', deleteAccount);
    });
};

function deleteAccount() {
    let index = this.getAttribute('data-index');
    this.closest('tr').remove();
    usersDB.splice(index, 1);
    localStorage.db = JSON.stringify(usersDB);
    createAccountsTable();
}

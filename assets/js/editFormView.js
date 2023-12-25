let index = null;

function displayEditForm() {
    index = this.getAttribute('data-index');
    let current = usersDB[index];
    filUpEditForm(current);
    editAccountView.style.display = 'none';
    editFormView.style.display = 'block';

    let editFormBtn = editFormView.querySelector('.edit__form__btn');
    editFormBtn.addEventListener('click', validateEditAccountForm)

}

function filUpEditForm(a) {
    let card = editFormView.querySelector('input[name="ecard"]');
    let username = editFormView.querySelector('input[name="eusername"]');
    let email = editFormView.querySelector('input[name="eemail"]');
    card.value = a.cardNumber;
    username.value = a.username;
    email.value = a.email;
}

function validateEditAccountForm() {

    let card = editFormView.querySelector('input[name="ecard"]');
    let username = editFormView.querySelector('input[name="eusername"]');
    let email = editFormView.querySelector('input[name="eemail"]');

    let editedAccount = {
        card: card.value,
        username: username.value,
        email: email.value
    };

    usersDB[index] = editedAccount;
    localStorage.db = JSON.stringify(usersDB);
    createAccountsTable();
}
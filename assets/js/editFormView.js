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
    let card = editFormView.querySelector('input[name="ecard"]').value;
    let username = editFormView.querySelector('input[name="eusername"]').value;
    let email = editFormView.querySelector('input[name="eemail"]').value;
    let errroMsgEditForm = editFormView.querySelector('.error__msg');
    
    if (card == '' || email == '' || username == '')    {
        errroMsgEditForm.innerHTML = 'All fields are required!';
        return;
    }

    if (card.length !== 8) {
        errroMsgEditForm.innerHTML = 'The card number must have 8 digit!';
        return;
    }

    if (username) {
        const foundUser = usersDB.find((user) => user.username == username);
        if (foundUser) {
            errroMsgEditForm.innerHTML = 'User already exist!';
            return;
        }
    }

    if (card) {
        const foundCard = usersDB.find((user) => user.cardNumber == card);
        if (foundCard) {
            errroMsgEditForm.innerHTML = 'Card number already exist!';
            return;
        }
    }

    usersDB[index].cardNumber = card;
    usersDB[index].username = username;
    usersDB[index].email = email;
    errroMsgEditForm.innerHTML = '';

    localStorage.db = JSON.stringify(usersDB);
    createAccountsTable();
    showPopup('Succesfully update account!');
}
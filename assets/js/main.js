let usersDB = [];

/*------------------------
USERS REGISTRATION
-------------------------*/
let registerView = document.querySelector('.register__view');
let loginView = document.querySelector('.login__view');
let adminView = document.querySelector('.admin__view');
let registerBtn = document.querySelector('.register__btn');
let registerForm = document.querySelector('.register__form');
let registerViewBtn = document.querySelector('.register__viewBtn');

registerViewBtn.addEventListener('click', () =>{
    loginView.style.display = 'none';
    registerView.style.display = 'block';
});

registerBtn.addEventListener('click', validateRegisterForm);

function validateRegisterForm(e){
    e.preventDefault();

    let userData = {
        fullName: registerForm.querySelector('input[name="name"]').value,
        email:registerForm.querySelector('input[name="email"]').value,
        userName:registerForm.querySelector('input[name="username"]').value,
        password:registerForm.querySelector('input[name="password"]').value
    }

    if(userData.fullName == '' || userData.email == '' || userData.userName == '' || userData.password == ''){
        registerForm.querySelector('.register__error-msg').innerHTML = 'All fields are required';
    }else{
        saveUserInDB(userData);
    }
}

function saveUserInDB(a){
    usersDB.push(a);
    registerView.style.display = 'none';
    loginView.style.display = 'block';
    // registerForm.submit();
}


/*------------------------
USERS LOGIN
-------------------------*/
let loginBtn = document.querySelector('.login__btn');
let loginForm = document.querySelector('.login__form');
loginBtn.addEventListener('click', validateLoginForm);

function validateLoginForm(e){
    e.preventDefault();

    let userName = loginForm.querySelector('input[name="username"]').value;
    let password = loginForm.querySelector('input[name="password"]').value;

    const foundUser = usersDB.find(user => user.userName === userName && user.password === password);

    if((userName == '' && password == '') || (userName == '' || password == '') ){
        alert('All fileds are required');
    }
    else if(foundUser){
        loginView.style.display = 'none';
        adminView.style.display = 'block';
        createTable();
    }
    else{
        showModalError();
    }
}

function showModalError(){
    let loginModal = document.querySelector(".login__modal");
    let loginModalClose = document.querySelector(".login__modal__close");

    loginModal.style.display = 'flex';
    loginModalClose.addEventListener('click', () => loginModal.style.display = 'none');
}

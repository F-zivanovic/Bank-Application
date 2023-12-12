let usersDB = [];

let registerView = document.querySelector('.register__view');
let loginView = document.querySelector('.login__view')

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
    registerForm.submit();
    registerView.style.display = 'none';
    loginView.style.display = 'block';
    
}
let registerView = document.querySelector('.register__view');
let loginView = document.querySelector('.login__view')
let registerBtn = document.querySelector('.register__btn');

registerBtn.addEventListener('click', () =>{
    loginView.style.display = 'none';
    registerView.style.display = 'block';
});
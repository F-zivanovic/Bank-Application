function showUserProfile(user) {

    setTimeout(function () {
        loginView.style.display = 'none';
        userAccountView.style.display = 'block';
    }, 2500);

    userAccountView.querySelector('.user__name').innerHTML = `Welcome ${ user }`;

    let logoutBtn = userAccountView.querySelector('.logout__btn');
    logoutBtn.addEventListener('click', logout);
}

function logout(){
    userAccountView.style.display = 'none';
    loginView.style.display = 'flex';
};
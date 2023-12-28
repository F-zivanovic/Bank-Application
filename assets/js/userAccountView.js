// showUserProfile(usersDB);

function showUserProfile(user) {

    setTimeout(function () {
        loginView.style.display = 'none';
        userAccountView.style.display = 'block';
    }, 2500);

    userAccountView.innerHTML = `Welcome ${ user[0].username }`;

}
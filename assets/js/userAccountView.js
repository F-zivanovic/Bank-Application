let curentUser = null;
let userBilance = null;
let transferBtn = userAccountView.querySelector('.transfer');
let depositBtn = userAccountView.querySelector('.deposit');

transferBtn.addEventListener('click', transferMoney);
depositBtn.addEventListener('click', depositMoney);

function showUserProfile(user) {
    setTimeout(function () {
        loginView.style.display = 'none';
        userAccountView.style.display = 'block';
    }, 2500);

    // let userHistory = userAccountView.querySelector('.user__history ul');
    let userName = userAccountView.querySelector('.user__name');
    curentUser = usersDB.find(acc => acc.username == user);

    userName.innerHTML = `Welcome ${ user }`;
    userBilance = userAccountView.querySelector('.user__bilance > span');
    userBilance.innerHTML = curentUser.bilance;

    if (curentUser.history) {
        showHistory(curentUser);
    }
    else {
        userAccountView.querySelector('.user__history ul').innerHTML = 'User does not have history of payments!';
    }

    let logoutBtn = userAccountView.querySelector('.logout__btn');
    logoutBtn.addEventListener('click', logout);
}

function transferMoney() {
    console.log('radi');
}

function depositMoney() {

    let depositValue = Number(this.previousElementSibling.value);

    let userData = {
        time: new Date(),
        type: 'Deposit',
        value: depositValue
    }

    if (!depositValue) {
        showPopup('Enter ammount of deposit!');
    }
    else {
        showPopup('your deposit has been approved');

        if (!curentUser.history) {
            curentUser.history = [];
            curentUser.history.push(userData);
            let total = parseInt(userBilance.innerHTML);
            total += userData.value
            userBilance.innerHTML = total;
            curentUser.bilance = total;
            localStorage.db = JSON.stringify(usersDB);
            depositValue = '';
            userAccountView.querySelector('.deposit__money input[type = "number"]').value = '';

        }
        else {
            curentUser.history.push(userData);
            let total = parseInt(userBilance.innerHTML);
            total += userData.value
            userBilance.innerHTML = total;
            curentUser.bilance = total;
            localStorage.db = JSON.stringify(usersDB);
            depositValue = '';
            userAccountView.querySelector('.deposit__money input[type = "number"]').value = '';
        }
    }

}


function logout() {
    userAccountView.style.display = 'none';
    loginView.style.display = 'flex';
};

function showHistory(acc) {
    // console.log('radi');
    // let userHistory = userAccountView.querySelector('.user__history ul');

    // acc.forEach((item) => {

    // });


}
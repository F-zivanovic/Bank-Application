// Views
let adminView = document.querySelector('.admin__view');
let accountsView = document.querySelector('.accounts__view');
let createAccountView = document.querySelector('.create__account__view');
let updateAccountView = document.querySelector(".update__account__view");

// Buttons
let accountsBtn = document.querySelector('.accounts__btn')
let createAccountBtn = document.querySelector('.create__account__btn')
let updateAccountBtn = document.querySelector('.update__account__btn');
let saveAccountBtn = document.querySelector(".save__account");
let logoutBtn = adminView.querySelector('.logout__btn');

// Listeners
accountsBtn.addEventListener('click', ()=>{
    displayView(accountsView, createAccountView, updateAccountView);
});

createAccountBtn.addEventListener('click', () =>{
    displayView(createAccountView, accountsView, updateAccountView)
})

saveAccountBtn.addEventListener('click', saveAccount);

logoutBtn.addEventListener('click', () =>{
    adminView.style.display = 'none';
    loginView.style.display = 'block';
});

function displayView(a,b,c){
    a.style.display = 'block';
    b.style.display = 'none';
    c.style.display = 'none'
}


/*--------------------------
ACCOUNTS VIEW
--------------------------*/ 
let accountsTable = document.querySelector('.accounts__table tbody');

createAccountsTable();

function createAccountsTable(){
    usersDB.forEach((user) =>{
        accountsTable.innerHTML += `<tr>
                    <td>${user.id}</td>
                    <td>${user.fullName}</td>
                    <td>${user.email}</td>
                    <td>${user.username}</td>
                    <td>${user.password}</td>
                </tr>`.trim();
    });
}



/*--------------------------
ADD ACCOUNT VIEW
--------------------------*/ 
function saveAccount(){
    let newAccount ={
        id:createAccountView.querySelector('input[name="id"]').value,
        fullName:createAccountView.querySelector('input[name="fullname"]').value,
        email:createAccountView.querySelector('input[name="email"]').value,
        username:createAccountView.querySelector('input[name="username"]').value,
        password:createAccountView.querySelector('input[name="password"]').value
    };

    if(validateNewAccount(newAccount)){
        usersDB.push(newAccount);
        createAccountsTable();
        createAccountView.querySelector('input[name="id"]').value = '';
        createAccountView.querySelector('input[name="fullname"]').value = '';
        createAccountView.querySelector('input[name="email"]').value ='';
        createAccountView.querySelector('input[name="username"]').value ='';
        createAccountView.querySelector('input[name="password"]').value ='';
        createAccountView.querySelector('.error__msg').innerHTML = '';
        displayView(accountsView, updateAccountView, createAccountView);
    }
}

function validateNewAccount(a){

    if(a.id == '' || a.fullName == '' || a.email == '' || a.username == '' || a.password == ''){
        let errorMsg = createAccountView.querySelector('.error__msg');
        errorMsg.innerHTML = 'All fields are required!';
        return false;
    }else{
        return true;
    }
}


/*--------------------------
UPDATE ACCOUNTS VIEW
--------------------------*/ 
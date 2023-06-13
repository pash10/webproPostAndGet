
document.addEventListener('DOMContentLoaded', function () {
    var submitButton = document.getElementById('submitButton');
    submitButton.addEventListener('click', redirectToPost);
});

function redirectToPost() {
    var inputValue = document.getElementById('inputValue').value;
    var pass = document.getElementById('pass').value;
    var errorMessage = document.getElementById('errorMessage');
    var validRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

        switch (checkGood(inputValue, pass, validRegex)) {
            case 0:
                 localStorage.setItem('isLoggedIn','true')
                 window.location.href = "index.html";
                 break;
            case 1:
                console.log(1)
                errorMessage.textContent = 'you are a ghost or stupid'
                break;
            case 2:
                 errorMessage.textContent = 'you are a ghost or stupid'
                break;
            case 3:
                errorMessage.textContent = "password field is empty";
                break;
            case 4:
                errorMessage.textContent = "email is illegal";
                break;
            case 5:
                errorMessage.textContent = "email filed is empty";
                break;
        }
    }



    function checkGood(email, pass, validEmailRegex) {
        var users = getUsersFromLocalStorage(); // Retrieve users
        var userWithCorrectPassword = users.find(user => user.mail === email && user.password === pass);
    
        if (!email) {
            return 5; // Email field is empty
        } else if (!validEmailRegex.test(email)) {
            return 4; // Email is not valid
        } else if (!pass) {
            return 3; // Password field is empty
        }else if (!users.some(user => user.mail === email)) {
            return 2; // Email does not exist in localStorage
        } else if (!userWithCorrectPassword) {
           return 1; // Email and password do not match
        } 
    
        var userID = userWithCorrectPassword.userID;
        localStorage.setItem('currentUser', userID);
        return 0;
    }
    
    

function getUsersFromLocalStorage() {
    let users = localStorage.getItem('arr');
    if (users) {
        return JSON.parse(users);
    }
    return [];
}

/*
function outOfTheHole(userMail,userPass){
    var email = localStorage.getItem('email')
    var pass = localStorage.getItem('pass')
    var 
    if(userMail ==email){
        if(userPass ==pass){
            return true
        }
    }
    return false
}
*/

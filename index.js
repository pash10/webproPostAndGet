
document.addEventListener('DOMContentLoaded', function () {
    var submitButton = document.getElementById('submitButton');
    submitButton.addEventListener('click', redirectToPost);
});








function redirectToPost() {
    var inputValue = document.getElementById('inputValue').value;
    var pass = document.getElementById('pass').value;
    var errorMessage = document.getElementById('errorMessage');
    var validRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    console.log(checkGood(inputValue, pass, validRegex))

    if (inputValue == 'admin') { // for test 
        localStorage.setItem('username', 'admin')
        if (pass == 'admin') {
            window.location.href = "post.html?userId=" +1;

        }
        else if(pass == 'emp'){
            window.location.href = "post.html?userId=" +999; // show non use emp card for post.js
        }
    }
    else {
        switch (checkGood(inputValue, pass, validRegex)) {
            case 0:
                fetch('https://jsonplaceholder.typicode.com/users?email=' + inputValue)
                    .then(response => response.json())
                    .then(data => login(data, inputValue, pass))
                    .catch(error => console.log(error));
                break;
            case 1:
                errorMessage.textContent = "password field is empty";
                break;
            case 2:
                errorMessage.textContent = "email is illegal";
                break;
            case 3:
                errorMessage.textContent = "email filed is empty";
                break;
        }
    }

}

function login(users, email, pass) {
    var id;
    var password;

    users.forEach(users => {
        console.log("word")
        password = users.username  // no password so username will be
        id = users.id
        localStorage.setItem('username', users.name)
    });

    if (password == pass) {
        window.location.href = "post.html?userId=" + id;
    }
    else {
        errorMessage.textContent = "try agin";
    }
}


function checkGood(inputValue, pass, validRegex) {
    if (!inputValue) {
        return 3; // Email field is empty
    } else if (!validRegex.test(inputValue)) {
        return 2; // Email is not valid
    } else if (!pass) {
        return 1; // Password field is empty
    }
    return 0;
}


function intoTheHole(email,password){
         localStorage.setItem('email',email)
         localStorage.setItem('pass',password)
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

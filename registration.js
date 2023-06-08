document.addEventListener('DOMContentLoaded', function() {
    registerUser();
  });
  
// Init an empty array
var arr = [];

// Store an empty array in 'arr' in localStorage
localStorage.setItem('arr', JSON.stringify(arr));

var userId = 1;
localStorage.setItem('userIdName', userId);

function registerUser() {
    var email = document.getElementById('inputValue').value;
    var password = document.getElementById('pass').value;
    var errorMessage = document.getElementById('errorMessage');
    var validEmailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    // Init an empty array
var arr = [];

// Store an empty array in 'arr' in localStorage
localStorage.setItem('arr', JSON.stringify(arr));

var userId = 1;
localStorage.setItem('userIdName', userId);

    switch (checkGood(email, password, validEmailRegex)) {
        case 0:
            addUser(email, password);
            var userId = localStorage.getItem('userIdName');
            window.location.href = "post.html?userId=" + (parseInt(userId) - 1);
            break;
        case 1:
            errorMessage.textContent = "Password field is empty";
            break;
        case 2:
            errorMessage.textContent = "Email is not valid";
            break;
        case 3:
            errorMessage.textContent = "Email field is empty";
            break;
    }
}

function checkGood(email, password, validEmailRegex) {
    if (!email) {
        return 3; // Email field is empty
    } else if (!validEmailRegex.test(email)) {
        return 2; // Email is not valid
    } else if (!password) {
        return 1; // Password field is empty
    }
    return 0;
}

function addUser(mail, password) {
    var userId = localStorage.getItem('userIdName');
    // Create a new user object
    var newUser = { 'mail': mail, 'password': password, 'userID': userId };

    // Retrieve 'arr' from localStorage and parse it
    arr = JSON.parse(localStorage.getItem('arr'));

    // Push the new user into the array
    arr.push(newUser);

    // Increment the userID by one and store it back to localStorage
    localStorage.setItem('userIdName', parseInt(userId) + 1);

    // Store the updated array back into localStorage
    localStorage.setItem('arr', JSON.stringify(arr));
}

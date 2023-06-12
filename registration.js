document.addEventListener('DOMContentLoaded', function () {
    var submitButton = document.getElementById('submitButton')
    submitButton.addEventListener('click', registerUser)
    if (!localStorage.getItem('arr')) {
        var arr = [];
        localStorage.setItem('arr', JSON.stringify(arr));
    }
    if (!localStorage.getItem('userIdName')) {
        var userId = 0;
        localStorage.setItem('userIdName', userId);
    }
    

    
});



function registerUser() {
    var email = document.getElementById('inputValue').value;
    var password = document.getElementById('pass').value;
    var errorMessage = document.getElementById('errorMessage');
    var validEmailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    switch (checkGood(email, password, validEmailRegex)) {
        case 0:
            window.location.href = "index.html";
            break;
        case 1:
            errorMessage.textContent = "bitch im taken"
            break;
        case 2:
            errorMessage.textContent = "Password field is empty";
            break;
        case 3:
            errorMessage.textContent = "Email is not valid";
            break;
        case 4:
            errorMessage.textContent = "Email field is empty";
            break;
    }
}

function checkGood(mail, password, validEmailRegex) {
    var users = getUsersFromLocalStorage(); // Retrieve users
    var userExists = users.some(user => user.mail === mail); // Check if email already exists

    if (!mail) {
        return 4; // Email field is empty
    } else if (!validEmailRegex.test(mail)) {
        return 3; // Email is not valid
    } else if (!password) {
        return 2; // Password field is empty
    } else if (userExists) { 
        return 1; // Email already exists in localStorage
    }
    return 0;
}

function getUsersFromLocalStorage() {
    let users = localStorage.getItem('arr');
    if (users) {
        return JSON.parse(users);
    }
    return [];
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

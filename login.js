// The script waits until the HTML document is fully loaded before running
document.addEventListener('DOMContentLoaded', function () {
    // Get reference to the submit button
    var submitButton = document.getElementById('submitButton');
    // Add a click event listener to the submit button, which triggers the redirectToPost function
    submitButton.addEventListener('click', redirectToPost);
});

function redirectToPost() {
    // Get the value from the input fields
    var inputValue = document.getElementById('inputValue').value;
    var pass = document.getElementById('pass').value;
    // Get reference to the error message element
    var errorMessage = document.getElementById('errorMessage');
    // Set a valid regex for email validation
    var validRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    // Switch case to handle different results from the checkGood function
    switch (checkGood(inputValue, pass, validRegex)) {
        case 0:
            // If checkGood returns 0, user is logged in and redirected to the index.html
            localStorage.setItem('isLoggedIn','true')
            window.location.href = "index.html";
            break;
        case 1:
        case 2:
            // If checkGood returns 1 or 2, it means either the user doesn't exist or password is incorrect
            errorMessage.textContent = 'you are a ghost or stupid'
            break;
        case 3:
            // If checkGood returns 3, password field is empty
            errorMessage.textContent = "password field is empty";
            break;
        case 4:
            // If checkGood returns 4, email is not valid
            errorMessage.textContent = "email is illegal";
            break;
        case 5:
            // If checkGood returns 5, email field is empty
            errorMessage.textContent = "email filed is empty";
            break;
    }
}

function checkGood(email, pass, validEmailRegex) {
    // Retrieve users from localStorage
    var users = getUsersFromLocalStorage();
    // Check if there is a user with the given email and password
    var userWithCorrectPassword = users.find(user => user.mail === email && user.password === pass);

    // Check different conditions for login
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

    // If all checks pass, save the userID in localStorage and return 0
    var userID = userWithCorrectPassword.userID;
    localStorage.setItem('currentUser', userID);
    return 0;
}

function getUsersFromLocalStorage() {
    // Fetch the users array from localStorage
    let users = localStorage.getItem('arr');
    if (users) {
        // If there is a users array, parse it from JSON and return it
        return JSON.parse(users);
    }
    // If there is no users array in localStorage, return an empty array
    return [];
}

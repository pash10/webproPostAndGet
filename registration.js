// Add an event listener that waits for the full HTML document to load before running the function
document.addEventListener('DOMContentLoaded', function () {
    // Get the 'submitButton' element by its ID
    var submitButton = document.getElementById('submitButton')
    // Add a click event listener to the 'submitButton' that calls the 'registerUser' function when clicked
    submitButton.addEventListener('click', registerUser)
    
    // If there's no 'arr' item in localStorage, initialize it with an empty array
    if (!localStorage.getItem('arr')) {
        var arr = [];
        localStorage.setItem('arr', JSON.stringify(arr));
    }
    
    // If there's no 'userIdName' item in localStorage, initialize it with 0
    if (!localStorage.getItem('userIdName')) {
        var userId = 0;
        localStorage.setItem('userIdName', userId);
    }
});

// Function to handle the user registration process
function registerUser() {
    // Get the values from the email and password input fields
    var email = document.getElementById('inputValue').value;
    var password = document.getElementById('pass').value;
    // Get the error message element by its ID
    var errorMessage = document.getElementById('errorMessage');
    
    // Define a regular expression pattern to validate the email
    var validEmailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    // Call the 'checkGood' function to validate the user input and take action based on the result
    switch (checkGood(email, password, validEmailRegex)) {
        case 0:
            // If the check passes, add the user and redirect to 'index.html'
            addUser(email,password)
            window.location.href = "index.html";
            break;
        case 1:
            // If the email already exists, display an error message
            errorMessage.textContent = "bitch im taken"
            break;
        case 2:
            // If the password field is empty, display an error message
            errorMessage.textContent = "Password field is empty";
            break;
        case 3:
            // If the email is not valid, display an error message
            errorMessage.textContent = "Email is not valid";
            break;
        case 4:
            // If the email field is empty, display an error message
            errorMessage.textContent = "Email field is empty";
            break;
    }
}

// Function to check the validity of the user input
function checkGood(mail, password, validEmailRegex) {
    // Retrieve the existing users from localStorage
    var users = getUsersFromLocalStorage();
    
    // Check if the email already exists among the existing users
    var userExists = users.some(user => user.mail === mail);

    // Check the conditions and return a code for each possible scenario
    if (!mail) {
        return 4; // Email field is empty
    } else if (!validEmailRegex.test(mail)) {
        return 3; // Email is not valid
    } else if (!password) {
        return 2; // Password field is empty
    } else if (userExists) {
        return 1; // Email already exists in localStorage
    }
    return 0; // Everything is okay
}

// Function to retrieve the users from localStorage
function getUsersFromLocalStorage() {
    let users = localStorage.getItem('arr');
    if (users) {
        return JSON.parse(users);
    }
    return [];
}

// Function to add a new user to localStorage
function addUser(mail, password) {
    var userId = localStorage.getItem('userIdName');
    // Create a new user object with the provided email and password, an empty 'markers' array and a userID
    var newUser = { 'mail': mail, 'password': password, 'userID': userId , 'markers':[]};

    // Retrieve the existing users from localStorage
    var arr = JSON.parse(localStorage.getItem('arr'));

    // Add the new user to the existing users
    arr.push(newUser);

    // Increment the userID and save it back to localStorage
    localStorage.setItem('userIdName', parseInt(userId) + 1);

    // Save the updated users back to localStorage
    localStorage.setItem('arr', JSON.stringify(arr));
}

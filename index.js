// Wait until the entire HTML document has been loaded before running this script
document.addEventListener('DOMContentLoaded', function() {
    // Get references to HTML elements with the respective IDs
    const homeLink = document.getElementById('homeLink');
    const logoutButton = document.getElementById('logoutButton');
    const registerLink = document.getElementById('registerLink');
    const loginLink = document.getElementById('loginLink');
    const postLink = document.getElementById('postLink');
    const mapLink = document.getElementById('mapLink');

    // Get reference to the submit button
    var submitButton = document.getElementById('postLink');

    // Add a click event listener to the submit button which calls the redirectToPost function
    submitButton.addEventListener('click', redirectToPost);

    // Check the 'isLoggedIn' item in the local storage to see if the user is logged in
    // If they are logged in, certain elements are made visible and others are hidden
    // If they are not logged in, the opposite elements are hidden and made visible
    if(localStorage.getItem('isLoggedIn') =='true') {
        console.log('word') // Logs 'word' to the console if the user is logged in
        logoutButton.style.display = 'block';
        postLink.style.display = 'block';
        mapLink.style.display = 'blcok'; // Typo: should be 'block'
        registerLink.style.display = 'none';
        loginLink.style.display = 'none';
    } else {
        logoutButton.style.display = 'none';
        postLink.style.display = 'none';
        mapLink.style.display = 'none';
        registerLink.style.display = 'block';
        loginLink.style.display = 'block';
    }

    // Add a click event listener to the logout button
    // This sets the 'isLoggedIn' item in local storage to 'false', effectively logging the user out
    // and then redirects the user to the 'index.html' page
    logoutButton.addEventListener('click', function(event) {
        event.preventDefault();
        localStorage.setItem('isLoggedIn','false');
        window.location.href = 'index.html';
    });
});

// A function which redirects the user to the 'post.html' page, with the current user's ID appended as a query parameter
function redirectToPost() {
    // Retrieve the user ID from local storage
    var userId = localStorage.getItem('idOfCUser');
    window.location.href = "post.html?userId=" + userId;
}

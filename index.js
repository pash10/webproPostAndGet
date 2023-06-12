
document.addEventListener('DOMContentLoaded', function() {
    const homeLink = document.getElementById('homeLink')
    const logoutButton = document.getElementById('logoutButton');
    const registerLink = document.getElementById('registerLink');
    const loginLink = document.getElementById('loginLink');
    const postLink = document.getElementById('postLink');
    var submitButton = document.getElementById('postLink');
    submitButton.addEventListener('click', redirectToPost);

    // Check login status and set display of navbar items accordingly
    if(localStorage.getItem('isLoggedIn') =='true') {
        console.log('word')
        logoutButton.style.display = 'blcok';
        postLink.style.display = 'blcok';
        registerLink.style.display = 'none';
        loginLink.style.display = 'none';
    } else {
        logoutButton.style.display = 'none';
        postLink.style.display = 'none';
        registerLink.style.display = 'block';
        loginLink.style.display = 'block';
    }

    logoutButton.addEventListener('click', function(event) {
        event.preventDefault();
        localStorage.setItem('isLoggedIn','false');
        window.location.href = 'index.html';
    });
});

function redirectToPost() {
    // Retrieve the user ID from local storage
    var userId = localStorage.getItem('idOfCUser');
    window.location.href = "post.html?userId=" + userId;
}




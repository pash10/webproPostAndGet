document.addEventListener('DOMContentLoaded', function() {
  fetchPosts();
  const logoutButton = document.getElementById('logoutButton');
  const postLink = document.getElementById('postLink');

  // Check login status and set display of navbar items accordingly

  logoutButton.addEventListener('click', function(event) {
      event.preventDefault();
      localStorage.removeItem('isLoggedIn');
      window.location.href = 'index.html';
  });
});
localStorage.setItem('username','test')
function fetchPosts() {
  const urlParams = new URLSearchParams(window.location.search);
  const userId = urlParams.get('userIdName');
  var name = localStorage.getItem('username');

  if (userId && /^\d+$/.test(userId)) {
    fetch('https://jsonplaceholder.typicode.com/posts?userId=' + userId)
      .then(response => response.json())
      .then(data => createCard(data,name))
      .catch(error => console.log(error)); // if ersor the code will run but say it have eror 
  }
}

function createCard(posts,name) {
  const cardContainer = document.getElementById('cardContainer');
  if (posts.length === 0) {
    const emptyCard = createEmptyCard();
    cardContainer.appendChild(emptyCard);
  } else {
    const uniqueCard = createUniqueCard(name);
    cardContainer.appendChild(uniqueCard);

    posts.forEach(post => {
      const card = createPostCard(post);
      cardContainer.appendChild(card);
    });
  }
}

function createEmptyCard() {
  const card = document.createElement('div');
  card.classList.add('card', 'emp')

  const title = document.createElement('h2');
  title.textContent = 'loser';

  const additionalText = document.createElement('p');
  additionalText.textContent = 'go see map';

  const button = document.createElement('button');
  button.textContent = 'Click me';
  button.onclick = function() {
    window.location.href = 'index.html';
  };

  card.appendChild(title);
  card.appendChild(additionalText);
  card.appendChild(button);

  return card;
}

function createUniqueCard(name) {
  const card = document.createElement('div');
  card.classList.add('card', 'unique-card'); // Add separate CSS class for unique card

  const title = document.createElement('h2');
  title.textContent = name;

  const additionalText = document.createElement('p');
  additionalText.textContent = 'Wanna go back home?';

  const button = document.createElement('button');
  button.textContent = 'Click me';
  button.onclick = function() {
    window.location.href = 'index.html';
  };
  
  const logoutButton = document.createElement('button');
  logoutButton.textContent = 'Logout';
  logoutButton.onclick = function() {
    localStorage.removeItem('userIdName');
    localStorage.removeItem('arr');
    window.location.href = 'login.html';
  };

  card.appendChild(title);
  card.appendChild(additionalText);
  card.appendChild(button);
  card.appendChild(logoutButton); // Append logout button to the card

  return card;
}


function createPostCard(post) {
  const card = document.createElement('div');
  card.classList.add('card');

  const userId = document.createElement('p');
  userId.textContent = 'User ID: ' + post.userId;

  const id = document.createElement('p');
  id.textContent = 'Post ID: ' + post.id;

  const title = document.createElement('h2');
  title.textContent = post.title;

  const body = document.createElement('p');
  body.textContent = post.body;

  card.appendChild(userId);
  card.appendChild(id);
  card.appendChild(title);
  card.appendChild(body);

  return card;
}

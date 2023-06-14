document.addEventListener('DOMContentLoaded', function() {
  fetchPosts();
  const logoutButton = document.getElementById('logoutButton');

  // Check login status and set display of navbar items accordingly

  logoutButton.addEventListener('click', function(event) {
      event.preventDefault();
      localStorage.removeItem('isLoggedIn');
      window.location.href = 'index.html';
  });
});

localStorage.setItem('username','test');

function fetchPosts() {
  var users = JSON.parse(localStorage.getItem('arr'));
  var userId = localStorage.getItem('currentUser');
  var user;

  if(users){
    user = users.find(user => user.userID === userId);
  }

  if (user && user.markers && user.markers.length !== 0) {
    createCard(user.posts, user.markers, user.name);
  } else {
    createEmptyCard(user.userID);
  }
} // Missing closing bracket was added here

function createEmptyCard(name) {
  const cardContainer = document.getElementById('cardContainer');

  const card = document.createElement('div');
  card.classList.add('card', 'emp');

  const title = document.createElement('h2');
  title.textContent = name;

  const additionalText = document.createElement('p');
  additionalText.textContent = 'Go see the map';

  const button = document.createElement('button');
  button.textContent = 'Click me';
  button.onclick = function() {
    window.location.href = 'index.html';
  };

  card.appendChild(title);
  card.appendChild(additionalText);
  card.appendChild(button);

  cardContainer.appendChild(card);
}

function createCard(posts, markers, name) {
  const cardContainer = document.getElementById('cardContainer');

  const uniqueCard = createUniqueCard(name);
  cardContainer.appendChild(uniqueCard);

  posts.forEach(post => {
    const card = createPostCard(post, markers);
    cardContainer.appendChild(card);
  });
}

function createUniqueCard(name) {
  const card = document.createElement('div');
  card.classList.add('card', 'unique-card');

  const title = document.createElement('h2');
  title.textContent = name;

  const additionalText = document.createElement('p');
  additionalText.textContent = 'Wanna go back home?';

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

function createPostCard(post, markers) {
  const card = document.createElement('div');
  card.classList.add('card');

  const title = document.createElement('h2');
  title.textContent = post.title;

  const body = document.createElement('p');
  body.textContent = post.body;

  const markerSection = document.createElement('div');
  const markerTitle = document.createElement('h3');
  markerTitle.textContent = 'Marker Locations';
  markerSection.appendChild(markerTitle);

  if (markers && markers.length > 0) {
    markers.forEach((marker, index) => {
      const markerItem = document.createElement('p');
      markerItem.textContent = `Marker ${index+1}: (Latitude: ${marker.position.lat}, Longitude: ${marker.position.lng})`;
      markerSection.appendChild(markerItem);
    });
  } else {
    const markerItem = document.createElement('p');
    markerItem.textContent = 'No markers set.';
    markerSection.appendChild(markerItem);
  }

  card.appendChild(title);
  card.appendChild(body);
  card.appendChild(markerSection);

  return card;
}

// An event listener to trigger the code inside once the entire HTML document has been fully loaded and parsed
document.addEventListener('DOMContentLoaded', function () {
  // Calling the function to fetch posts when the document is ready
  fetchPosts();

  // Getting the logout button element by its id
  const logoutButton = document.getElementById('logoutButton');

  // Adding an event listener to the logout button for click events
  logoutButton.addEventListener('click', function (event) {
    // Preventing the default action for the click event
    event.preventDefault();

    // Removing 'isLoggedIn' item from the local storage, effectively logging the user out
    localStorage.removeItem('isLoggedIn');

    // Redirecting to 'index.html'
    window.location.href = 'index.html';
  });
});

// Setting the 'username' item in the local storage to 'test'
localStorage.setItem('username', 'test');

// A function to fetch posts
function fetchPosts() {
  // Retrieving and parsing the 'arr' item from the local storage, which is expected to be a JSON string of an array
  var users = JSON.parse(localStorage.getItem('arr'));

  // Getting the 'currentUser' item from the local storage
  var userId = localStorage.getItem('currentUser');

  var user;

  // If the 'users' array is not null, finding the user with the id that matches 'userId'
  if (users) {
    user = users.find(user => user.userID === userId);
  }

  // If a user is found and they have markers, a card is created for each post
  // Otherwise, an empty card is created for the user
  if (user && user.markers && user.markers.length !== 0) {
    createCard(user.markers, user.userID);
  } else {
    createEmptyCard(user.userID);
  }
}

// A function to create an empty card with the provided name
function createEmptyCard(name) {
  // Getting the card container element by its id
  const cardContainer = document.getElementById('cardContainer');

  // Creating a new 'div' element and adding 'card' and 'emp' classes to it
  const card = document.createElement('div');
  card.classList.add('card', 'emp');

  // Creating a new 'h2' element and setting its text content to the provided name
  const title = document.createElement('h2');
  title.textContent = name;

  // Creating a new 'p' element and setting its text content to 'Go see the map'
  const additionalText = document.createElement('p');
  additionalText.textContent = 'Go see the map';

  // Creating a new 'button' element, setting its text content to 'Click me'
  // and adding an onclick event to redirect to 'index.html'
  const button = document.createElement('button');
  button.textContent = 'Click me';
  button.onclick = function () {
    window.location.href = 'index.html';
  };

  // Adding the title, additionalText, and button to the card
  card.appendChild(title);
  card.appendChild(additionalText);
  card.appendChild(button);

  // Adding the card to the card container
  cardContainer.appendChild(card);
}


function createCard(markers) {
  // Getting the card container element by its id
  const cardContainer = document.getElementById('cardContainer');

  // Creating a unique card for the user and adding it to the card container
  const uniqueCard = createUniqueCard();
  cardContainer.appendChild(uniqueCard);

  // For each marker group, creating a marker card and adding it to the card container
  markers.forEach(marker => {
    const card = CreateMarkerCard(marker);
    cardContainer.appendChild(card);
  });
}
function CreateMarkerCard(marker) {
  // Creating a new 'div' element and adding 'card' class to it
  const card = document.createElement('div');
  card.classList.add('card');

  // Creating a new 'h2' element for the marker's name
  const markerName = document.createElement('h2');
  markerName.textContent = marker.name;
  card.appendChild(markerName);

  // Creating a new 'p' element for the marker's latitude
  const latElement = document.createElement('p');
  latElement.textContent = `Latitude: ${marker.position.lat}`;
  card.appendChild(latElement);

  // Creating a new 'p' element for the marker's longitude
  const lngElement = document.createElement('p');
  lngElement.textContent = `Longitude: ${marker.position.lng}`;
  card.appendChild(lngElement);

  return card;
}



function createUniqueCard(id) {
  // Creating a new 'div' element and adding 'card' and 'unique-card' classes to it
  const card = document.createElement('div');
  card.classList.add('card', 'unique-card');

  // Creating a new 'h2' element and setting its text content to the provided id
  const title = document.createElement('h2');
  title.textContent = id;

  // Creating a new 'p' element and setting its text content to 'Wanna go back home?'
  const additionalText = document.createElement('p');
  additionalText.textContent = 'Wanna go back home?';

  // Creating a new 'button' element, setting its text content to 'Click me'
  // and adding an onclick event to redirect to 'index.html'
  const button = document.createElement('button');
  button.textContent = 'Click me';
  button.onclick = function () {
    window.location.href = 'index.html';
  };

  // Adding the title, additional text, and button to the card
  card.appendChild(title);
  card.appendChild(additionalText);
  card.appendChild(button);

  // Returning the created card
  return card;
}


// A function to create a card for each post and a unique card for the user
/*function createCard(markers, usId) {
  // Getting the card container element by its id
  const cardContainer = document.getElementById('cardContainer');

  // Creating a unique card for the user and adding it to the card container
  const uniqueCard = createUniqueCard();
  cardContainer.appendChild(uniqueCard);

  // For each post, creating a post card and adding it to the card container
  posts.forEach(post => {
    const card = createPostCard(post, markers);
    cardContainer.appendChild(card);
  });
}

// A function to create a unique card with the provided name
function createUniqueCard(name) {
  // Creating a new 'div' element and adding 'card' and 'unique-card' classes to it
  const card = document.createElement('div');
  card.classList.add('card', 'unique-card');

  // Creating a new 'h2' element and setting its text content to the provided name
  const title = document.createElement('h2');
  title.textContent = name;

  // Creating a new 'p' element and setting its text content to 'Wanna go back home?'
  const additionalText = document.createElement('p');
  additionalText.textContent = 'Wanna go back home?';

  // Creating a new 'button' element, setting its text content to 'Click me'
  // and adding an onclick event to redirect to 'index.html'
  const button = document.createElement('button');
  button.textContent = 'Click me';
  button.onclick = function () {
    window.location.href = 'index.html';
  };

  // Adding the title, additionalText, and button to the card
  card.appendChild(title);
  card.appendChild(additionalText);
  card.appendChild(button);

  // Returning the created card
  return card;
}

// A function to create a card for a post
function createPostCard(post, markers) {
  // Creating a new 'div' element and adding the 'card' class to it
  const card = document.createElement('div');
  card.classList.add('card');

  // Creating a new 'h2' element and setting its text content to the post title
  const title = document.createElement('h2');
  title.textContent = post.title;

  // Creating a new 'p' element and setting its text content to the post body
  const body = document.createElement('p');
  body.textContent = post.body;

  // Creating a new 'div' element for the marker section
  const markerSection = document.createElement('div');

  // Creating a new 'h3' element and setting its text content to 'Marker Locations'
  const markerTitle = document.createElement('h3');
  markerTitle.textContent = 'Marker Locations';
  markerSection.appendChild(markerTitle);

  // If there are markers, creating an item for each marker
  // Otherwise, creating an item that says 'No markers set.'
  if (markers && markers.length > 0) {
    markers.forEach((marker, index) => {
      const markerItem = document.createElement('p');
      markerItem.textContent = `Marker ${index + 1}: (Latitude: ${marker.position.lat}, Longitude: ${marker.position.lng})`;
      markerSection.appendChild(markerItem);
    });
  } else {
    const markerItem = document.createElement('p');
    markerItem.textContent = 'No markers set.';
    markerSection.appendChild(markerItem);
  }

  // Adding the title, body, and marker section to the card
  card.appendChild(title);
  card.appendChild(body);
  card.appendChild(markerSection);

  // Returning the created card
  return card;
}*/

// Setting up an event listener for when the document is fully loaded
document.addEventListener('DOMContentLoaded', function () {
  // Getting reference to logout button
  const logoutButton = document.getElementById('logoutButton');

  // Setting up a click event listener for logout button
  logoutButton.addEventListener('click', function (event) {
    // Prevent default click action
    event.preventDefault();
    // Set 'isLoggedIn' flag in local storage to false on logout
    localStorage.setItem('isLoggedIn', 'false');
    // Redirect user to 'index.html' on logout
    window.location.href = 'index.html';
  });
});

// Function to initialize Google Map
function initMap() {
  // Map options
  var mapOptions = {
    center: {  lat: 32.0853, lng: 34.7818 }, // Center of the map
    zoom: 10 // Zoom level
  };
  // Creating new map
  var map = new google.maps.Map(document.getElementById('map'), mapOptions);

  // Fetching current user and his/her markers from local storage
  var currentUserID = localStorage.getItem('currentUser');
  var users = JSON.parse(localStorage.getItem('arr'));
  var currentUser = users.find(user => user.userID === currentUserID);

  // Initializing markers array if it doesn't exist
  if (!currentUser.markers) {
    currentUser.markers = [];
  }

  // Displaying all saved markers on the map
  var markers = currentUser.markers;
  if (markers) {
    for (var i = 0; i < markers.length; i++) {
      addMarker(map, markers[i]);
    }
  }

  // Setting up a click event listener for the map to show marker form
  map.addListener('click', function (event) {
    document.getElementById('markerModal').style.display = 'flex';
    window.clickedPosition = event.latLng;
  });

  // Setting up a submit event listener for the marker form
  document.getElementById('markerForm').addEventListener('submit', function (e) {
    e.preventDefault();
    // Fetching input values
    var name = document.getElementById('name').value;
    var description = document.getElementById('description').value;
    var image = document.getElementById('image').value;

    var markerData = {
      name: name,
      description: description,
      image: image,
      position: window.clickedPosition // Clicked position
    };

    // Adding new marker on the map
    addMarker(map, markerData);
    // Saving new marker in local storage
    saveMarker(markerData);

    // Clearing the form
    document.getElementById('name').value = '';
    document.getElementById('description').value = '';
    document.getElementById('image').value = '';

    // Hiding the modal
    document.getElementById('markerModal').style.display = 'none';
  });
// Function to add a marker to the map
function addMarker(map, markerData) {
  // Create a new marker
  var marker = new google.maps.Marker({
    position: markerData.position, // Set the marker position
    map: map, // Associate the marker with our map
    title: markerData.name // Set the marker title
  });

  // Build the content for InfoWindow
  var content = '<h3>' + markerData.name + '</h3>';
  content += '<p>' + markerData.description + '</p>';
  content += '<img src="' + markerData.image + '" alt="Marker Image" width="100">';

  // Create a new InfoWindow
  var infoWindow = new google.maps.InfoWindow({
    content: content // Set the content
  });

  // Add a mouseover listener to the marker to open the InfoWindow
  marker.addListener('mouseover', function () {
    infoWindow.open(map, marker);
  });

  // Add a mouseout listener to the marker to close the InfoWindow
  marker.addListener('mouseout', function () {
    infoWindow.close();
  });

  // Add a right-click listener to remove the marker
  marker.addListener('rightclick', function () {
    marker.setMap(null); // Remove the marker from the map
    deleteMarker(markerData); // Delete the marker from the user's data
  });

  return marker;
}

// Function to save a marker
function saveMarker(markerData) {
  // Get the current user's ID
  var currentUserID = localStorage.getItem('currentUser');
  // Fetch the array of users
  var users = JSON.parse(localStorage.getItem('arr'));
  // Find the current user
  var currentUser = users.find(user => user.userID === currentUserID);

  // Check if the markers array exists, if not, initialize it
  if (!currentUser.markers) {
    currentUser.markers = [];
  }

  // Add the new marker to the array
  currentUser.markers.push(markerData);

  // Update the user in the users array
  var userIndex = users.findIndex(user => user.userID === currentUserID);
  users[userIndex] = currentUser;

  // Save the updated users array back to localStorage
  localStorage.setItem('arr', JSON.stringify(users));
}

// Function to delete a marker
function deleteMarker(markerData) {
  // Get the current user's ID
  var currentUserID = localStorage.getItem('currentUser');
  // Fetch the array of users
  var users = JSON.parse(localStorage.getItem('arr'));
  // Find the current user
  var currentUser = users.find(user => user.userID === currentUserID);

  // Filter out the marker to be deleted
  currentUser.markers = currentUser.markers.filter(function (marker) {
    return marker.name !== markerData.name;
  });

  // Update the user in the users array
  var userIndex = users.findIndex(user => user.userID === currentUserID);
  users[userIndex] = currentUser;

  // Save the updated users array back to localStorage
  localStorage.setItem('arr', JSON.stringify(users));
}

// Get the modal element
var modal = document.getElementById("markerModal");

// Get the close button in the modal
var span = document.getElementsByClassName("close")[0];

// Add click event handler for close button to hide the modal
span.onclick = function () {
  modal.style.display = "none";
}

// Add click event handler for anywhere outside the modal to hide it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

 
}

// Other methods and event handlers...

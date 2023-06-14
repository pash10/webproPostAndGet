document.addEventListener('DOMContentLoaded', function () {
  const logoutButton = document.getElementById('logoutButton');

  logoutButton.addEventListener('click', function (event) {
    event.preventDefault();
    localStorage.setItem('isLoggedIn', 'false');
    window.location.href = 'index.html';
  });
});

function initMap() {
  var mapOptions = {
    center: { lat: 0, lng: 0 },
    zoom: 10
  };
  var map = new google.maps.Map(document.getElementById('map'), mapOptions);

  // Get current user
  var currentUserID = localStorage.getItem('currentUser');  // Get the current user ID
  var users = JSON.parse(localStorage.getItem('arr')); // Fetch the users array
  var currentUser = users.find(user => user.userID === currentUserID); // Find the current user

  // Initialize markers array if it does not exist
  if (!currentUser.markers) {
    currentUser.markers = [];
  }

  // Display all saved markers on the map
  var markers = currentUser.markers;
  if (markers) {
    for (var i = 0; i < markers.length; i++) {
      addMarker(map, markers[i]);
    }
  }

  // Handle click event on the map to show marker form
  map.addListener('click', function (event) {
    document.getElementById('markerModal').style.display = 'flex';
    window.clickedPosition = event.latLng;
  });

  document.getElementById('markerForm').addEventListener('submit', function (e) {
    e.preventDefault();
    var name = document.getElementById('name').value;
    var description = document.getElementById('description').value;
    var image = document.getElementById('image').value;

    var markerData = {
      name: name,
      description: description,
      image: image,
      position: window.clickedPosition // Use the global position here
    };

    addMarker(map, markerData);
    saveMarker(markerData);

    // Clear form
    document.getElementById('name').value = '';
    document.getElementById('description').value = '';
    document.getElementById('image').value = '';

    // Hide modal
    document.getElementById('markerModal').style.display = 'none';
  });

  function addMarker(map, markerData) {
    var marker = new google.maps.Marker({
      position: markerData.position,
      map: map,
      title: markerData.name
    });

    var content = '<h3>' + markerData.name + '</h3>';
    content += '<p>' + markerData.description + '</p>';
    content += '<img src="' + markerData.image + '" alt="Marker Image" width="100">';
    var infoWindow = new google.maps.InfoWindow({
      content: content
    });

    // Display marker details on mouseover
    marker.addListener('mouseover', function () {
      infoWindow.open(map, marker);
    });

    // Hide marker details on mouseout
    marker.addListener('mouseout', function () {
      infoWindow.close();
    });

    // Remove marker on right-click
    marker.addListener('rightclick', function () {
      marker.setMap(null);
      deleteMarker(markerData);
    });

    return marker;
  }

  // Get the modal
  var modal = document.getElementById("markerModal");

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];

  // When the user clicks on <span> (x), close the modal
  span.onclick = function () {
    modal.style.display = "none";
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
}


function addMarker(map, markerData) {
  var marker = new google.maps.Marker({
    position: markerData.position,
    map: map,
    title: markerData.name
  });

  var content = '<h3>' + markerData.name + '</h3>';
  content += '<p>' + markerData.description + '</p>';
  content += '<img src="' + markerData.image + '" alt="Marker Image" width="100">';
  var infoWindow = new google.maps.InfoWindow({
    content: content
  });

  // Display marker details on mouseover
  marker.addListener('mouseover', function () {
    infoWindow.open(map, marker);
  });

  // Hide marker details on mouseout
  marker.addListener('mouseout', function () {
    infoWindow.close();
  });

  // Remove marker on right-click
  marker.addListener('rightclick', function () {
    marker.setMap(null);
    deleteMarker(markerData);
  });

  return marker;
}

function saveMarker(markerData) {
  var currentUserID = localStorage.getItem('currentUser');  // Get the current user ID
  var users = JSON.parse(localStorage.getItem('arr')); // Fetch the users array
  var currentUser = users.find(user => user.userID === currentUserID); // Find the current user

  // Check if markers array is present, if not, initialize it
  if (!currentUser.markers) {
    currentUser.markers = [];
  }

  currentUser.markers.push(markerData);

  // Update the user in the users array
  var userIndex = users.findIndex(user => user.userID === currentUserID);
  users[userIndex] = currentUser;

  localStorage.setItem('arr', JSON.stringify(users));  // Save back to localStorage
}

function deleteMarker(markerData) {
  var currentUserID = localStorage.getItem('currentUser');  // Get the current user ID
  var users = JSON.parse(localStorage.getItem('arr')); // Fetch the users array
  var currentUser = users.find(user => user.userID === currentUserID); // Find the current user

  currentUser.markers = currentUser.markers.filter(function (marker) {
    return marker.name !== markerData.name;
  });

  // Update the user in the users array
  var userIndex = users.findIndex(user => user.userID === currentUserID);
  users[userIndex] = currentUser;

  localStorage.setItem('arr', JSON.stringify(users));  // Save back to localStorage
}

// Get the modal
var modal = document.getElementById("markerModal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}


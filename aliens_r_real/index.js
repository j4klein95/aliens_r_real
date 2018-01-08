// Get references to the elements of HTML
var $tbody = document.querySelector('tbody');
var $sighting = document.querySelector('#Sighting');
var $searchBtn = document.querySelector('#search');

// Add an event listener to the searchButton, call handleSearchButtonClick when clicked
$searchBtn.addEventListener("click", handleSearchButtonClick);

// Set filteredAddresses to addressData initially
var sightingEvent = dataSet;

// renderTable renders the filteredAddresses to the tbody
function renderTable() {
  $tbody.innerHTML = "";
  for (var i = 0; i < sightingEvent.length; i++) {
    // Get get the current address object and its fields
    var sight = sightingEvent[i];
    var fields = Object.keys(sight);
    // Create a new row in the tbody, set the index to be i + startingIndex
    var $row = $tbody.insertRow(i);
    for (var j = 0; j < fields.length; j++) {
      // For every field in the address object, create a new cell at set its inner text to be the current value at the current address's field
      var field = fields[j];
      var $cell = $row.insertCell(j);
      $cell.innerText = sight[field];
    }
  }
}

function handleSearchButtonClick() {
  // Format the user's search by removing leading and trailing whitespace, lowercase the string
  var filterDateTime = $sighting.value.trim().toLowerCase();

  // Set filteredAddresses to an array of all addresses whose "state" matches the filter
  sightingEvent = dataSet.filter(function(sightDateTime) {
  var sightingDatetime = sightDateTime.datetime.toLowerCase();

    // If true, add the address to the filteredAddresses, otherwise don't add it to filteredAddresses
    return sightingDatetime === filterDateTime;
  });
  renderTable();
}

// Render the table for the first time on page load
renderTable();

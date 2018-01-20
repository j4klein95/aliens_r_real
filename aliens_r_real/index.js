// Get references to the elements of HTML
var $tbody = document.querySelector('tbody');
var $datetime = document.querySelector('#datetime');
var $city = document.querySelector('#city');
var $state = document.querySelector('#state');
var $country = document.querySelector('#country');
var $shape = document.querySelector('#shape');
var $searchBtn = document.querySelector('#search');
var $loadMoreBtn = document.querySelector('#load-btn');

//Set starting index and results per page variables
var startingIndex = 0;
var resultsPerPage = 50;

// Add an event listener to the searchButton, call handleSearchButtonClick when clicked
$searchBtn.addEventListener("click", handleSearchButtonClick);

// Set filteredAddresses to addressData initially
//var sightings = dataSet;

// renderTable renders the filteredAddresses to the tbody
function renderTableSection() {
  var endingIndex = startingIndex + resultsPerPage;
  var addressSubset = dataSet.slice(startingIndex, endingIndex);
  for (var i = 0; i < addressSubset.length; i++) {
    // Get get the current address object and its fields
    var sight = addressSubset[i];
    var fields = Object.keys(sight);
    // Create a new row in the tbody, set the index to be i + startingIndex
    var $row = $tbody.insertRow(i + startingIndex);
    for (var j = 0; j < fields.length; j++) {
      // For every field in the address object, create a new cell at set its inner text to be the current value at the current address's field
      var field = fields[j];
      var $cell = $row.insertCell(j);
      $cell.innerText = sight[field];
    }
  }
}

$loadMoreBtn.addEventListener('click', handleButtonClick);

function handleButtonClick() {
  startingIndex += resultsPerPage;
  renderTableSection();
  if (startingIndex + resultsPerPage >= dataSet.length){
    $loadMoreBtn.classList.add('disabled');
    $loadMoreBtn.innerText = "All Addresses Loaded";
    $loadMoreBtn.removeEventListener('click', handleButtonClick);
  }
}

function handleSearchButtonClick() {
  // Format the user's search by removing leading and trailing whitespace, lowercase the string
  var filterDateTime = $datetime.value.trim().toLowerCase();
  var filtercity = $city.value.trim().toLowerCase();
  var filterstate = $state.value.trim().toLowerCase();
  var filtercountry = $country.value.trim().toLowerCase();
  var filtershape = $shape.value.trim().toLowerCase();

  // Set filteredAddresses to an array of all addresses whose "state" matches the filter
  sightings = dataSet.filter(function(sight) {
    var sightDateTime = sight.datetime.substring(0, filterDateTime.length).toLowerCase();
    var sightcity = sight.city.substring(0, filtercity.length).toLowerCase();
    var sightstate = sight.state.substring(0, filterstate.length).toLowerCase();
    var sightcountry = sight.country.substring(0, filtercountry.length).toLowerCase();
    var sightshape = sight.shape.substring(0, filtershape.length).toLowerCase();

    // If true, add the address, otherwise don't add it to filteredAddresses
    if (sightDateTime === filterDateTime) {
      return true;
    } else if (sightcity === filtercity) {
      return true;
    } else if (sightstate === filterstate) {
      return true;
    } else if (sightcountry === filtercountry) {
      return true;
    } else if (sightshape === filtershape) {
      return true;
    }
    return false;
  });
  renderTableSection();
}

// Render the table for the first time on page load
renderTableSection();

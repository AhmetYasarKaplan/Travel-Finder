// script.js

// Fetch data from the travel_recommendation_api.json file
fetch('travel_recommendation_api.json')
  .then(response => response.json())
  .then(data => {
    // Store the fetched data in a variable
    const travelData = data;

    // Add event listener to the search button
    const searchButton = document.querySelector('.search-bar button:first-of-type');
    searchButton.addEventListener('click', () => {
      // Get the user's search query
      const searchQuery = document.querySelector('.search-bar input').value.toLowerCase();

      // Filter the travel data based on the search query
      const filteredData = travelData.filter(item => {
        const { destination, country, description } = item;
        return (
          destination.toLowerCase().includes(searchQuery) ||
          country.toLowerCase().includes(searchQuery) ||
          description.toLowerCase().includes(searchQuery)
        );
      });

      // Clear previous recommendation cards
      const recommendationContainer = document.querySelector('.recommendation-container');
      recommendationContainer.innerHTML = '';

      // Generate recommendation cards
      filteredData.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('recommendation-card');

        const image = document.createElement('img');
        image.src = item.imageUrl;
        image.alt = item.destination;

        const name = document.createElement('h3');
        name.textContent = item.destination;

        const countryAndTime = document.createElement('p');
        countryAndTime.textContent = `${item.country} | Current Time: ${getCountryTime(item.country)}`;

        const description = document.createElement('p');
        description.textContent = item.description;

        card.appendChild(image);
        card.appendChild(name);
        card.appendChild(countryAndTime);
        card.appendChild(description);

        recommendationContainer.appendChild(card);
      });
    });

    // Clear button event listener
    const clearButton = document.querySelector('.search-bar button:last-of-type');
    clearButton.addEventListener('click', () => {
      // Clear the search input field
      document.querySelector('.search-bar input').value = '';

      // Clear the recommendation container
      const recommendationContainer = document.querySelector('.recommendation-container');
      recommendationContainer.innerHTML = '';
    });
  })
  .catch(error => console.error('Error fetching data:', error));

// Function to get the current time in a given country
function getCountryTime(country) {
  const options = {
    timeZone: getTimeZoneByCountry(country),
    hour12: true,
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  };

  const currentTime = new Date().toLocaleTimeString('en-US', options);
  return currentTime;
}

// Function to get the time zone by country
function getTimeZoneByCountry(country) {
  // Implement your logic to map countries to their respective time zones
  // This is a simplified example, you may need to create a more comprehensive mapping
  switch (country) {
    case 'USA':
      return 'America/New_York';
    case 'Japan':
      return 'Asia/Tokyo';
    case 'France':
      return 'Europe/Paris';
    // Add more country-to-timezone mappings as needed
    default:
      return 'UTC';
  }
}
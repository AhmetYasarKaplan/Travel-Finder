// Function for displaying the About page
function showAbout() {
    document.getElementById('search-content').style.display = 'none';
    document.querySelector('.content').style.display = 'block';
    document.querySelector('.container').style.display = 'none';
    document.querySelector('.content').innerHTML = `
        <div class="about-section">
            <h1>ABOUT US</h1>
            <p>Welcome to our organization! We are driven by a commitment to serve our customers excellently. Our mission is to <strong>deliver outstanding experiences</strong> for travellers worldwide.</p>
            <p>We value integrity, creativity, client satisfaction, and collaboration. We prioritize <strong>customer needs</strong> and collectively strive towards our objectives.</p>
            <p>Explore our site to know more about our offerings!</p>

            <div class="about-our-team">
                <h2>Meet <br>Our Team</h2>
                <div class="team-profile">
                    <div class="profile">
                        <i class="fa-solid fa-user-tie"></i>
                        <h3>Jane Doe</h3>
                        <p>Chief Executive Officer</p>
                    </div>
                    <div class="profile">
                        <i class="fa-solid fa-user-tie"></i>
                        <h3>Alex Johnson</h3>
                        <p>Project Lead</p>
                    </div>
                    <div class="profile">
                        <i class="fa-solid fa-user-tie"></i>
                        <h3>Chris Lee</h3>
                        <p>Head of Logistics</p>
                    </div>
            </div>
        </div>`;
}

// Function for displaying the Contact page
function showContact() {
    document.getElementById('search-content').style.display = 'none';
    document.querySelector('.content').style.display = 'block';
    document.querySelector('.container').style.display = 'none';
    document.querySelector('.content').innerHTML = `
        <div class="contact-section">
            <h1>GET IN TOUCH</h1>
            <form>
                <label for="user-name">Name:</label><br>
                <input type="text" id="user-name" name="user-name" placeholder="Your Name" required><br><br>
                <label for="user-email">Email:</label><br>
                <input type="email" id="user-email" name="user-email" placeholder="your-email@example.com" required><br><br>
                <label for="user-message">Message:</label><br>
                <textarea id="user-message" name="user-message" rows="4" required></textarea><br><br>
                <button type="submit">Send</button>
            </form>
        </div>
    `;
}

// Function for displaying the Home page
function showHome() {
    document.querySelector('.container').style.display = 'block';
    document.querySelector('.content').style.display = 'none';
    document.getElementById('search-content').style.display = 'none';
}

// Function to clear the search box
function resetSearch() {
    document.getElementById('search-input').value = '';
    document.getElementById('search-content').style.display = 'none';
}

// Function to initiate a search
async function initiateSearch() {
    document.querySelector('.content').style.display = 'none';
    document.querySelector('.container').style.display = 'none';
    const input = document.getElementById('search-input').value.toLowerCase();
    const response = await fetch('destinations_data.json');
    const data = await response.json();

    let filteredResults = [];

    if (input === 'country') {
        data.countries.forEach(item => {
            filteredResults.push(...item.cities);
        });
    } else if (input === 'temple') {
        filteredResults = data.temples;
    } else if (input === 'beach') {
        filteredResults = data.beaches;
    }

    renderSearchResults(filteredResults);
}

function renderSearchResults(filteredResults) {
    const displayDiv = document.getElementById('search-content');
    displayDiv.innerHTML = '';  // Clear previous content
    displayDiv.style.display = 'flex';

    if (filteredResults.length === 0) {
        displayDiv.innerHTML = '<p>No matching results found.</p>';
        return;
    }

    filteredResults.forEach(item => {
        const element = document.createElement('div');
        element.className = 'search-result';

        const image = document.createElement('img');
        image.src = item.imageUrl;
        image.alt = item.name;

        const title = document.createElement('h2');
        title.textContent = item.name;

        const divider = document.createElement('hr');

        const description = document.createElement('p');
        description.textContent = item.description;

        // Append elements to the result container
        element.appendChild(image);
        element.appendChild(title);
        element.appendChild(divider);
        element.appendChild(description);

        // Finally, append the result container to the main display div
        displayDiv.appendChild(element);
    });
}
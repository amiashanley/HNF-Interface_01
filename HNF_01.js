// Define getRandomPosition function
function getRandomPosition() {
    const maxX = window.innerWidth - 100; // Adjust 100 as needed for button width
    const maxY = window.innerHeight - 100; // Adjust 100 as needed for button height
    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);
    return { x: randomX, y: randomY };
}

// Function to check if a position is outside the screen area
function isOutsideScreen(position) {
    return position.x < 0 || position.y < 0 || position.x > window.innerWidth || position.y > window.innerHeight;
}

// Function to check if a button position overlaps with existing buttons
function isOverlapping(newButtonPosition, existingButtonPositions) {
    for (const existingPosition of existingButtonPositions) {
        if (
            newButtonPosition.x < existingPosition.x + 100 && // Adjust 100 as needed for button width
            newButtonPosition.x + 100 > existingPosition.x && // Adjust 100 as needed for button width
            newButtonPosition.y < existingPosition.y + 100 && // Adjust 100 as needed for button height
            newButtonPosition.y + 100 > existingPosition.y    // Adjust 100 as needed for button height
        ) {
            return true; // Overlapping
        }
    }
    return false; // Not overlapping
}

// Function to fetch JSON data
async function fetchJsonData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch JSON data: ${response.status} ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching JSON data:', error);
        throw error;
    }
}

// Function to create buttons dynamically
function createButtons(data) {
    const buttonsContainer = document.getElementById('buttons-container');
    let usedPositions = [];

    data.forEach((entry, index) => {
        const button = createButton(entry, index, usedPositions); // Pass entire entry object
        buttonsContainer.appendChild(button);
    });
}

// Function to create a single button
function createButton(entry, index, usedPositions) {
    const button = document.createElement('div');
    button.className = 'audio-button';
    const buttonText = entry.file_name.startsWith('denoise') ? `BPF ${index % 15 + 1}` : `HNF ${index % 15 + 1}`;
    button.textContent = buttonText;

    let position = getRandomPosition();
    while (isOverlapping(position, usedPositions) || isOutsideScreen(position)) {
        position = getRandomPosition();
    }

    button.style.position = 'absolute';
    button.style.left = position.x + 'px';
    button.style.top = position.y + 'px';

    const backgroundColor = entry.file_name.startsWith('denoise') ? '#0D0D0D' : '#f2e313';
    const textColor = entry.file_name.startsWith('denoise') ? '#FFFFFF' : '#0D0D0D';
    button.style.backgroundColor = backgroundColor;
    button.style.color = textColor;

    usedPositions.push(position);

    let isPlaying = false; // New variable to track playing state

    // Attach event listener to button
    button.addEventListener('click', function () {
        const audioSrc = entry.file_name.startsWith('denoise') ? `${denoiseRepository}${entry.file_name}` : `${noiseRepository}${entry.file_name}`;
        const latitude = entry.geographic_coordinates ? entry.geographic_coordinates.latitude : 'N/A';
        const longitude = entry.geographic_coordinates ? entry.geographic_coordinates.longitude : 'N/A';

        if (!isPlaying) {
            playAudio(audioSrc, generatePopupText(entry)); // Pass entire entry object to generatePopupText function
            button.style.backgroundColor = '#8C8304'; // Change button background color to olive tone
            if (!entry.file_name.startsWith('denoise')) { // Change text color only for "HNF" buttons
                button.style.color = '#FFFFFF'; // Change button text color to white 
            }
        } else {
            pauseAudio(); // Pause audio if playing
            button.style.backgroundColor = backgroundColor; // Restore original button background color
            button.style.color = textColor; // Restore original button text color
        }

        isPlaying = !isPlaying; // Toggle playing state
    });

    // Return the created button
    return button;
}

function generatePopupText(entry) {
    let popupText = '';

    if (entry.file_name.startsWith("denoise")) {
        popupText += `
            File Name: ${entry.file_name}<br>
            Her Noise Radio Programme: ${entry.Her_Noise_Radio_Programme}<br>
            Fundamental Frequency 1st Harmonic: ${entry.fundamental_frequency_1st_harmonic || 'N/A'}<br>
            Audio Recording Equipment: ${entry.audio_recording_equipment|| 'N/A'}<br>
            Year of Release and Distribution: ${entry.year_of_release_and_distribution || 'N/A'}<br>
            Place of Manufacturer: ${entry.place_of_manufacturer || 'N/A'}<br>
            Materials, Metals, Rare Earth Elements: ${entry.materials_metals_rare_earth_elements || 'N/A'}<br>
            Date of Recording: ${entry.date_of_recording || 'N/A'}<br>
            Weather Data: ${entry.weather_data || 'N/A'}
        `;
    } else { // For 'noise' files
        popupText += `
            File Name: ${entry.file_name}<br>
            Her Noise Radio Programme: ${entry.Her_Noise_Radio_Programme}<br>
            Broadcast Description: ${entry.broadcast_description}<br>
            Known Artist/s: ${entry["known_artist/s"]}<br>
            Location: ${entry.location}<br>
            Geographic Coordinates: (${entry.geographic_coordinates})<br>
            Broadcast Date: ${entry.broadcast_date}<br>
            Broadcast Time: ${entry.broadcast_time}<br>
            Start: ${entry.start}<br>
            End: ${entry.end}<br>
            Length: ${entry.length}
        `;
    }

    return popupText;
}

// Declare audio variable in a higher scope
var audio;

// Function to play audio and display pop-up text
function playAudio(audioSrc, popupText) {
    console.log("Audio source:", audioSrc);
    console.log("Popup text:", popupText);

    if (!popupText) {
        console.error("Popup text is undefined.");
        return;
    }

    audio = new Audio(audioSrc); // Assign to the global audio variable
    
    // Normalize volume for denoise files
    if (audioSrc.startsWith(denoiseRepository)) {
        audio.volume = 0.6; // Adjust as needed to normalize volume
    } else if (audioSrc.startsWith(noiseRepository)) {
        audio.volume = 0.1; // Adjust as needed to normalize volume for noise files
    }

    audio.loop = true;
    audio.play();

    displayPopupText(popupText);
}

// Function to pause audio
function pauseAudio() {
    if (audio) { // Check if audio is defined
        audio.pause();
    }
}

// Function to display pop-up text with font styling
function displayPopupText(text) {
    var popupText = document.getElementById('popup-text');
    popupText.innerHTML = ''; // Clear previous content
    var lines = text.split('<br>'); // Split the text into lines
    lines.forEach(line => {
        var span = document.createElement('span');
        var colonIndex = line.indexOf(':');
        if (colonIndex !== -1) { // If the line contains a colon
            var property = line.substring(0, colonIndex + 1); // Extract property
            var data = line.substring(colonIndex + 1); // Extract data
            var propertySpan = document.createElement('span');
            propertySpan.textContent = property;
            propertySpan.style.color = '#BFB40F'; // Style property
            var dataSpan = document.createElement('span');
            dataSpan.textContent = data;
            dataSpan.style.color = '#FFFFFF'; // Style data
            span.appendChild(propertySpan);
            span.appendChild(dataSpan);
        } else { // If the line does not contain a colon
            span.textContent = line;
            span.style.color = '#FFFFFF'; // Style as data
        }
        popupText.appendChild(span);
        popupText.appendChild(document.createElement('br')); // Add line break
    });
    popupText.style.display = 'block';
    popupText.style.fontFamily = 'Courier New'; // Change the font family here
    popupText.style.fontSize = '14px'; // Optional: Change the font size
    popupText.style.backgroundColor = '#0D0D0D'; // Optional: Change the background color

    setTimeout(function () {
        popupText.style.display = 'none';
    }, 20000);
}


// Constants
const noiseRepository = 'https://raw.githubusercontent.com/amiashanley/HNF-Interface_01/main/map_noise_files_01/';
const denoiseRepository = 'https://raw.githubusercontent.com/amiashanley/HNF-Interface_01/main/map_denoise_files_01/';
const jsonDataUrl = 'https://raw.githubusercontent.com/amiashanley/HNF-Interface_01/main/HNF_pop-up_data_file_03.json';

// Fetch JSON data and create buttons
fetchJsonData(jsonDataUrl)
    .then(data => {
        console.log('Fetched JSON data:', data);
        createButtons(data);
        showPopup(); // Show the popup after buttons are created
    })
    .catch(error => console.error('Error fetching JSON data:', error));

// Global variable to keep track of the current page
var currentPage = 1;

// Function to show the popup with text content
function showPopup() {
    var popupText = document.getElementById('popup-text');
    popupText.innerHTML = `
        <span class="close" onclick="closePopup()">&times;</span>
        <div class="page" id="page-1">
        <b>HER NOISE FLOOR: SELECTION, EXTRACTION, EXCLUSION</b>
        </div>
        <br>
        <p>The noise floor is commonly considered to be the sum of all “unwanted” signals in an audio recording. That may be the sound of an air conditioner, a bird's song, a police siren or a human voice—depending on where you're listening from.</p>
        <br>
        <button id="next-button-1" class="next-button" onclick="showPage(2)">Next</button>
    </div>

    <div class="page" id="page-2" style="display: none;">
        <p>A recording's noise floor can be influenced by the material spatial properties of a room or an environment, but most often it is self-generated by the thermal agitation of electrons that make up the circuitry of a recording device or microphone, devices that commonly contain rare earth elements. In this sense, we might think of the noise floor as the result of millions of years of geologic formation.</p>
        <br>
        <button id="back-button-2" class="back-button" onclick="showPage(1)">Back</button>
        <button id="next-button-2" class="next-button" onclick="showPage(3)">Next</button>
    </div>

    <div class="page" id="page-3" style="display: none;">
        <p><i>Her Noise Floor: Selection, Extraction, Exclusion (HNF)</i> is a practice-based research project, which responds to digital audio material that is housed within the Her Noise Archive at UAL's Archives and Special Collections Centre. The project specifically engages with five of the six surviving radio programs from Melanie Clifford's Her Noise Series (2005).</p>
        <br>
        <button id="back-button-3" class="back-button" onclick="showPage(2)">Back</button>
        <button id="next-button-3" class="next-button" onclick="showPage(4)">Next</button>
    </div>

    <div class="page" id="page-4" style="display: none;">
        <p>These programs were broadcast on Resonance FM between 16.30 - 16.45 GMT throughout November and December 2005, coinciding with the Her Noise (2005) exhibition at the South London Gallery, curated by Lina Dzuverovic and Anne Hilde Neset. An audible noise floor is present in the majority of the audio recordings featured in these five programs.</p>
        <br>
        <button id="back-button-4" class="back-button" onclick="showPage(3)">Back</button>
        <button id="next-button-4" class="next-button" onclick="showPage(5)">Next</button>
    </div>

    <div class="page" id="page-5" style="display: none;">
        <p>Through the frameworks of critical data studies, extractivism, and ecological technocultures, HNF aims to situate the noise floor as a highly localised, non-neutral, audible ecological material. Here, the noise floor is explored as both an archive of the in-situ acoustic properties of the rooms and places where these recordings were made and as a cartography of the geosocial conditions and curatorial decisions that (in)directly produced the Her Noise (2005) exhibition.</p>
        <br>
        <p>HNF asks, what does the presence of an audible noise floor in these archived recordings tell us about the social dynamics, economic conditions and geopolitical context in which the Her Noise (2005) exhibition originated?</p>
        <button id="back-button-5" class="back-button" onclick="showPage(4)">Back</button>
        <button id="next-button-5" class="next-button" onclick="showPage(6)">Next</button>
    </div>

    <div class="page" id="page-6" style="display: none;">
        <p>The project consists of two interrelated, process-driven parts:</p>
        <ol>
            <li><b>Audio Datasets & Machine Learning Model:</b>Two audio datasets (training and testing) were created from the Her Noise Series (2005), each split into two even classes: "signal" and "noise". Using these datasets, a machine learning model was then built and trained to classify whether an audio file from the HNF dataset is "noise" or "signal".</li>
            <br>
            <li><b>HNF Interactive Noise Map:</b> A browser-based sound map, which aims to function as an experimental archive and playable compositional tool; listeners can engage with “noise” predictions made by the model and explore the noise floor as ecological material.</li>
        </ol>
        <button id="back-button-6" class="back-button" onclick="showPage(5)">Back</button>
        <button id="next-button-6" class="next-button" onclick="showPage(7)">Next</button>
    </div>

    <div class="page" id="page-7" style="display: none;">
    <p><b>NAVIGATION TOOLS</b></p>
    <br>
    <p>You will encounter two types of buttons:</p>
    <ol>
        <li><b>Yellow</b> buttons play unprocessed samples from the HNF training data that have been classified by the model as “noise” (denoted by the letters HNF).</li>
        <br>
        <li><b>Black</b> buttons play the same samples, however, these samples have been denoised using accentuated Band Pass Filtering techniques (denoted by the letters BPF).</li>
    </ol>
    <br>
    <p><b>How to Use:</b></p>
    <ul>
        <li>Click a button to start/stop the audio file from playing on a loop.</li>
        <li>Refresh your browser to restore the map and return to this menu.</li>
    </ul>
    <br>
    <p><b>Text Pop-Ups:</b></p>
    <ul>
        <li>The text pop-ups that correspond to the <b>yellow</b> buttons contain information linked to local noise floor contributors (i.e. time, date, location, weather, etc).</li> 
    <br>
        <li>The text pop-ups that correspond to the <b>black</b> buttons contain information that links the noise floor to its planetary context (i.e. rare earth elements used in the recording technologies, place of device manufacture, weather data, etc).</li>
    </ul>
        <button id="back-button-7" class="back-button" onclick="showPage(6)">Back</button>
        <button id="next-button-7" class="next-button" onclick="showPage(8)">Next</button>
    </div>

    <div class="page" id="page-8" style="display: none;">
        <p>In navigating the HNF Interactive Noise Map, I hope that listeners may actively explore the noise floor as a 'tangled cartography' (Hilde Neset, 2007) that holds traces of globalised value chains, microhistories, and geospheric systems.</p>
        <br>
        <p>The HNF Interactive Noise Map aims to pay homage to the mapping processes used by curators Lina Dzuverovic and Anne Hilde Neset, at the inception of Her Noise (2005), and act as a contemporary continuation of the Her Noise Archive—a place to reimagine, rearrange, and relisten to the material conditions of the past through emergent auditory cultures.</p>
        <br>
        <p>amias hanley x</p>
        <a href="http://www.amiashanley.com">www.amiashanley.com</a>
        <br>
        <button id="back-button-8" class="back-button" onclick="showPage(7)">Back</button>
        </div>`;
    popupText.style.display = 'block';
}

// Function to navigate to the next page
function nextPage() {
    var currentPageDiv = document.getElementById('page-' + currentPage);
    currentPageDiv.style.display = 'none';
    currentPage++;
    var nextPageDiv = document.getElementById('page-' + currentPage);
    nextPageDiv.style.display = 'block';
    var currentButton = document.querySelector('.next-button.active');
    currentButton.classList.remove('active');
    var nextButton = document.getElementById('next-button-' + currentPage);
    nextButton.classList.add('active');
    if (currentPage === 2) {
        currentButton.style.display = 'none'; // Hide current button on the last page
    }
}
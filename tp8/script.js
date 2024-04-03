// Store data about the member's current session
var sessionData = {
  ip: "",
  time: 0,
  weather: "",
  settings: {
    tempUnit: "F",
  },
};

// Get random Labradoodle image
async function fetchRandomDogImage() {
  const apiUrl = 'https://dog.ceo/api/breeds/image/random';
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    if (data.status === 'success') {
      document.getElementById('randomDog').src = data.message;
    } else {
      console.error('Failed to fetch the dog image.');
    }
  } catch (error) {
    console.error('Error fetching the dog image:', error);
  }
}

// Get the member's IP address and location
function getIP() {
  return new Promise((resolve, reject) => {
    fetch("https://api.ipify.org/?format=json")
      .then(function(responseData) {
        if (responseData.ok) return responseData.json();
        else return Promise.reject(responseData);
      })
      .then(function(responseJSON) {
        sessionData.ip = responseJSON.ip;
        const url = `https://ipapi.co/${sessionData.ip}/json/`;
        return fetch(url);
      })
      .then(function(responseData) {
        if (responseData.ok) return responseData.json();
        else return Promise.reject(responseData);
      })
      .then(function(responseJSON) {
        console.log("Location object: ");
        console.log(responseJSON);
        return getWeather(responseJSON.city);
      })
      .then(function() {
        resolve();
      })
      .catch(function(error) {
        console.log("Error: " + error);
        reject(error);
      });
  });
}

// Get the member's local time
function updateTime() {
  sessionData.time = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    // second: "numeric",
    hour12: true,
  });
  document.querySelector("#time").textContent = sessionData.time;
}


// Get the weather based on the member's location
async function getWeather(city) {
  const url = `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${city}&days=4`;
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'c5e9d4271cmsh0d89f1735029321p1d6758jsna317b4572fc8',
      'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
    }
  };

  try {
    // Fetch the weather data
    const response = await fetch(url, options);
    const result = await response.text();
    // Store the resulting data in the sessionData object
    sessionData.weather = JSON.parse(result);
  } catch (error) {
    // something went wrong
    console.error(error);
  }
}

// Use the sessionData to detect the theme
function detectTheme() {
  let isDay = sessionData.weather.current.is_day; // an integer, 1 or 0
  // isDay = 0; // For testing purposes
  // Set the theme based on the value of isDay
  if (isDay == 1) {
    document.querySelector("body").classList.add("light");
  } else {
    document.querySelector("body").classList.add("dark");
  }
}


function epochToLocalTime(epoch) {
  // Create a new Date object from the epoch time
  const date = new Date(epoch * 1000); // JavaScript uses milliseconds, so multiply by 1000

  // Convert the Date object to a local time string
  const localTime = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  return localTime;
}

function updatePageData() {
  // Fill the page with the member's data
  document.querySelector("#location").textContent = sessionData.weather.location.name;

  // Tell when the weather data was last updated
  document.querySelector("#lastUpdatedTime").textContent = epochToLocalTime(sessionData.weather.current.last_updated_epoch);

  // Display the current temperature
  if (sessionData.settings.tempUnit === "C") {
    // Current temperature in Celsius
    document.querySelector("#temp").textContent = sessionData.weather.current.temp_c + '\u00B0C';

    // Feels like temperature in Celsius
    document.querySelector("#feelsLike").textContent = sessionData.weather.current.feelslike_c + '\u00B0C';

    // Highs and lows in Celsius
    document.querySelector("#high").textContent = sessionData.weather.forecast.forecastday[0].day.maxtemp_c + '\u00B0C';
    document.querySelector("#low").textContent = sessionData.weather.forecast.forecastday[0].day.mintemp_c + '\u00B0C';
  } else {
    // Current temperature in Fahrenheit
    document.querySelector("#temp").textContent = sessionData.weather.current.temp_f + '\u00B0F';

    // Feels like temperature in Fahrenheit
    document.querySelector("#feelsLike").textContent = sessionData.weather.current.feelslike_f + '\u00B0F';

    // Highs and lows in Fahrenheit
    document.querySelector("#high").textContent = sessionData.weather.forecast.forecastday[0].day.maxtemp_f + '\u00B0F';
    document.querySelector("#low").textContent = sessionData.weather.forecast.forecastday[0].day.mintemp_f + '\u00B0F';
  }

  // Wind speed and direction
  document.querySelector("#wind").textContent = sessionData.weather.current.wind_mph + " mph ";
  document.querySelector("#windDir").style.transform = `rotate(${sessionData.weather.current.wind_degree}deg)`;
  document.querySelector("#windDir").title = sessionData.weather.current.wind_dir;

  // Humidity
  document.querySelector("#humidity").textContent = sessionData.weather.current.humidity + "%";

  // Visibility
  document.querySelector("#visibility").textContent = sessionData.weather.current.vis_miles + "mi";

  // Cloud Coverage
  document.querySelector("#cloudCover").textContent = sessionData.weather.current.cloud + "%";

  // Display the current weather icon
  document.querySelector("#weatherIcon").src = sessionData.weather.current.condition.icon.replace("64x64", "128x128");

  // Update the current condition text
  document.querySelector("#currentDescription").textContent = sessionData.weather.current.condition.text + " right now.";

  // Update the day overview information
  document.querySelector("#conditionDay").textContent = sessionData.weather.forecast.forecastday[0].day.condition.text;

  // Update the weekly forecast
  const forecast = document.querySelector("#weeklyForecast");
  forecast.querySelectorAll(".day").forEach((day, index) => {
    const forecastData = sessionData.weather.forecast.forecastday[index];
    console.log(forecastData);
    // Update the day of the week, date, icon, and temperatures
    day.querySelectorAll("p")[0].textContent = forecastData.date.replace("-", "/").replace("-", "/").split("/").slice(1).join("/");
    day.querySelector("img").src = forecastData.day.condition.icon.replace("64x64", "128x128");
    day.querySelectorAll("p")[1].textContent = sessionData.settings.tempUnit === "C" ? forecastData.day.maxtemp_c + '\u00B0C / ' + forecastData.day.mintemp_c + '\u00B0C' : forecastData.day.maxtemp_f + '\u00B0F / ' + forecastData.day.mintemp_f + '\u00B0F';
  });

  // Update the hourly forecast
  const hourlyForecast = document.querySelector("#hourlyForecast");
  sessionData.weather.forecast.forecastday[0].hour.forEach((hour, index) => {
    // Create the HTML structure
    const hourDiv = document.createElement("div");
    hourDiv.classList.add("hour");

    const p1 = document.createElement("p");
    p1.textContent = epochToLocalTime(hour.time_epoch);
    hourDiv.appendChild(p1);

    const divContainer = document.createElement("div");
    const img = document.createElement("img");
    img.src = hour.condition.icon;
    img.alt = hour.condition.text;
    divContainer.appendChild(img);

    const p2 = document.createElement("p");
    p2.textContent = sessionData.settings.tempUnit === "C" ? hour.temp_c + '\u00B0C' : hour.temp_f + '\u00B0F';
    divContainer.appendChild(p2);
    hourDiv.appendChild(divContainer);

    // Append the hourDiv to the desired container (e.g., hourlyForecast)
    hourlyForecast.appendChild(hourDiv);
  })

}

function toggleLoadPopup() {
  var loading = document.querySelector("#loading");
  if (loading.style.display === "none") {
    loading.style.display = "flex";
    loading.style.opacity = 1;
  } else {
    setTimeout(()=> {
      for (let i = 1; i <= 100; i++) {
        setTimeout(() => {
          loading.style.opacity = 1 - i / 100;
        }, i * 10);
      }
      loading.style.display = "none";
    }, 500)
  }
}

// Call updateTime at the start to initialize the time
updateTime();
// Then update the time every second (1000 milliseconds)
setInterval(updateTime, 1000);


// When the page is fully loaded, get the member's IP address and location
document.addEventListener("DOMContentLoaded", async function() {
  fetchRandomDogImage();
  await getIP();
  detectTheme();
  updatePageData();
  toggleLoadPopup();
  document.querySelector('button#changeLocationButton').addEventListener('click', function() {
    document.querySelector('#changeLocation').style.display = 'flex';
  });
});

// Function to call the WeatherAPI.com Search/Autocomplete API
async function autocompleteCity(city) {
  const url = `https://weatherapi-com.p.rapidapi.com/search.json?q=${encodeURIComponent(city)}`;
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'c5e9d4271cmsh0d89f1735029321p1d6758jsna317b4572fc8',
      'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
    }
  };

  try {
    const response = await fetch(url, options);
    return await response.json();
  } catch (error) {
    console.error(error);
    return []; // Return an empty array in case of an error
  }
}

// If the member wants to change the location
document.querySelector("#locationForm").addEventListener("submit", async function(event) {
  event.preventDefault(); // Prevent the form from submitting normally
  document.querySelector('#changeLocation').style.display = 'none';
  toggleLoadPopup();
  
  var city = document.querySelector("#locationInput").value.trim();
  if (!city) {
    alert("Please enter a city name.");
    toggleLoadPopup();
    return;
  }

  // Use the WeatherAPI.com Search/Autocomplete API to validate the city name
  const url = `https://weatherapi-com.p.rapidapi.com/search.json?q=${encodeURIComponent(city)}`;
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'c5e9d4271cmsh0d89f1735029321p1d6758jsna317b4572fc8',
      'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
    }
  };

  try {
    const response = await fetch(url, options);
    const results = await response.json();
    
    // Check if the API returned any results for the city
    if (results.length === 0) {
      alert("Invalid city name. Please enter a valid city.");
      toggleLoadPopup();
      return;
    }

    // If the city name is valid, proceed to get the weather
    await getWeather(city);
    document.querySelector("#locationInput").value = "";
    updatePageData();
  } catch (error) {
    console.error(error);
    alert("An error occurred while validating the city name. Please try again.");
  } finally {
    toggleLoadPopup();
  }
});

// Event listener for the location input to implement autocomplete
document.querySelector("#locationInput").addEventListener("input", async function() {
  const city = this.value.trim();
  if (city.length > 2) { // Trigger autocomplete after 2 characters have been typed
    const results = await autocompleteCity(city);
    const suggestionsList = document.querySelector("#autocompleteResults");
    suggestionsList.innerHTML = ''; // Clear previous suggestions
    results.forEach(result => {
      const listItem = document.createElement('li');
      listItem.textContent = result.name;
      listItem.addEventListener('click', function() {
        document.querySelector("#locationInput").value = this.textContent;
        suggestionsList.style.display = 'none'; // Hide the suggestions list
      });
      suggestionsList.appendChild(listItem);
    });
    if (results && results.length > 0) {
      suggestionsList.style.display = 'block'; // Show the suggestions list
    } else {
      suggestionsList.style.display = 'none'; // Hide the suggestions list
    }
  }
});

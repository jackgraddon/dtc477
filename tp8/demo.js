// this function will get IP number from ipify API
function getIP() {
    let data = fetch("https://api.ipify.org/?format=json")
    
        .then( function(responseData) {
            
            if (responseData.ok) return responseData.json();
            else return Promise.reject(responsData);
            
            })
        
        .then( function(responseJSON) {
            // everything worked, output info
            console.log("IP number: " + responseJSON.ip);
            
            // call weather API
            getWeather(responseJSON.ip);
            
            })
            
        .catch( function(error) {
            console.log("IP error: " + error);
            });
    
}

// get weather from RapidAPI weather api based on passed IP number
function getWeather(ipNumber) {
    const url = 'https://weatherapi-com.p.rapidapi.com/forecast.json?q=' + ipNumber + "&days=3";
    const options = {
    	method: 'GET',
    	headers: {
    		'X-RapidAPI-Key': 'b1191f052bmsh9393381bd6d8022p103498jsna1764183a67a',
    		'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
    	}
    };
    
    let data = fetch(url, options)
    
        .then( function(response){
            if (response.ok) return response.json();
            else return Promise.reject(response);
            })
        
        .then( function(responseJSON) {
            console.log("Weather object: ");
            console.log(responseJSON);
            
            document.querySelector("#tempF span").innerHTML = responseJSON.current.temp_f;
            document.querySelector("#tempC span").innerHTML = responseJSON.current.temp_c;
            document.querySelector("#weatherIcon").src = responseJSON.current.condition.icon;
            
            })
        
        .catch( function(error) {
            console.log("Weather API error: " + error);
        });
}


// wait until DOM loads
document.addEventListener("DOMContentLoaded", function() {
   getIP();
});
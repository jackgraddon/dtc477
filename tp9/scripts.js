// JS code for PHP quote example

// add some code to wait for the DOM
document.addEventListener("DOMContentLoaded", function() {

    console.log("DOM fully loaded and parsed");

    // make the quote link run the getQuote() function when clicked
    document.querySelector("#reloader").addEventListener("click", function(e) {
        console.log("Reloading page")
    	location.reload();
    });

});
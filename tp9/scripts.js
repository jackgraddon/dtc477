// sample code for loading quotations with JSON

// load a quote from the quote API
function getQuote() {

    // use fetch AJAX to load the API using the required options
    // include the key in the URL after the ?key=
    fetch('random-quote-api.php?key=yesplease')

        .then(response => {
            return response.json(); // get JSON response and convert it to a JavaScript object
        })

        .then(response => {
            
            console.log(response); // output the whole object to console
            document.querySelector("#quoteText").innerHTML = response.text; // insert quote text into the DOM
            document.querySelector("#quoteAttribute span").innerHTML = response.attribute; // insert quote attribute into the DOM
            document.body.style.backgroundColor = response.backgroundColor; // change page background color
            document.body.style.color = response.textColor; // change page text color

        })

        .catch(err => console.error(err)); // any errors? output to console

}

// add some code to wait for the DOM
document.addEventListener("DOMContentLoaded", function() {

    // load a quote as soon as the page is loaded
    getQuote();

    // make the quote link run the getQuote() function when clicked
    document.querySelector("#reloader").addEventListener("click", getQuote);

});
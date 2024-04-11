<?php
// sample PHP to randomly output one of five quotes

// set up main quotations array
$quotations = array();

// set up first quote with second dimensions on the array
$quotations[0] = array();
$quotations[0]["text"] = "A great idea solves multiple problems at the same time.";
$quotations[0]["attribute"] = "Shigeru Miyamoto";
$quotations[0]["backgroundColor"] = "#59CD90";
$quotations[0]["textColor"] = "#ffffff";

// set up next quote with second dimensions on the array
$quotations[1] = array();
$quotations[1]["text"] = "The only way to do great work is to love what you do.";
$quotations[1]["attribute"] = "Steve Jobs";
$quotations[1]["backgroundColor"] = "#258EA6";
$quotations[1]["textColor"] = "#ffffff";

// set up next quote with second dimensions on the array
$quotations[2] = array();
$quotations[2]["text"] = "Video games are bad for you? That's what they said about rock-n-roll.";
$quotations[2]["attribute"] = "Shigeru Miyamoto";
$quotations[2]["backgroundColor"] = "#261447";
$quotations[2]["textColor"] = "#ffffff";

// set up next quote with second dimensions on the array
$quotations[3] = array();
$quotations[3]["text"] = "Inside every adult is the heart of a child. We just gradually convince ourselves that we have to act more like adults.";
$quotations[3]["attribute"] = "Shigeru Miyamoto";
$quotations[3]["backgroundColor"] = "#FF3864";
$quotations[3]["textColor"] = "#ffffff";

// set up next quote with second dimensions on the array
$quotations[4] = array();
$quotations[4]["text"] = "Programming is not about what you know, it's about what you can figure out.";
$quotations[4]["attribute"] = "Microsoft Copilot";
$quotations[4]["backgroundColor"] = "#F39C6B";
$quotations[4]["textColor"] = "#ffffff";


// look for a number passed in the URL and, if present, convert it to an integer value
// NOTE: code updated from demo video to address error handling differences among servers
if ( isset( $_GET["quoteNumber"] ) ) $passedNumber = intval( $_GET["quoteNumber"] ); // try to convert submitted value to integer
else $passedNumber = null; // no number passed

// if the passed number is 0 or greater, but less than the total count of the $quotations array, use the passed number
// otherwise select a random number
if ( ($passedNumber != null) && ($passedNumber <= 0) && ($passedNumber < count($quotations))) {
	$quoteNumber = $passedNumber; // used passed number
} else {
	$quoteNumber = rand(0, ( count($quotations) - 1) ); // random number from 0 to one less than the array length
}




/* 

now let&#039;s output the page&#039;s HTML!

note that PHP code is being echo&#039;d in all of these:
- <title> tag
- CSS properties in the <style> block
- HTML tags
- HTML comments

*/

?><!DOCTYPE html>
<html>
<head>
	
	<!-- meta tags and title -->
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Quote by <?= $quotations[$quoteNumber]["attribute"] ?></title>

	<!-- CSS -->
	<link rel="stylesheet" href="styles.css" media="all">
	<style>

		/* CSS customized by PHP, overriding the baseline loaded in the external file */

		body {
			background-color: <?= $quotations[$quoteNumber]["backgroundColor"] ?>;
		}

		h1, p {
			color: <?= $quotations[$quoteNumber]["textColor"] ?>;
		}

	</style>

	<!-- JavaScript -->
	<script src="scripts.js" defer></script>

</head>
<body>

	<h1><?= $quotations[$quoteNumber]["text"] ?></h1>
	<p>— <?= $quotations[$quoteNumber]["attribute"] ?></p>
	<p id="reloader">(get new quote)</p>

	
	<!-- some comments -- because PHP can output anywhere in HTML

		 passed number, if any: <?= $passedNumber; ?> 
		 output quote number: <?= $quoteNumber; ?> 
		 output quote text: <?= $quotations[$quoteNumber]["text"]; ?> 
		 output quote attribute: <?= $quotations[$quoteNumber]["attribute"]; ?> 
		 output background color: <?= $quotations[$quoteNumber]["backgroundColor"]; ?> 
		 output text color: <?= $quotations[$quoteNumber]["textColor"]; ?> 

	-->
</body>
</html>
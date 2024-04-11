<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="Cache-Control" content="no-store" />
	<link rel="icon" type="image/png" href="/examples/php-example/debuggr.php?mode=favicon" />
	<title>Debuggr: random-quote-api.php by Tor</title>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.7.2/highlight.min.js" integrity="sha512-s+tOYYcC3Jybgr9mVsdAxsRYlGNq4mlAurOrfNuGMQ/SCofNPu92tjE7YRZCsdEtWL1yGkqk15fU/ark206YTg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>	<script>
		
		// set initial variables from PHP for use with the externalized JavaScript
		urlToSelf = "/examples/php-example/debuggr.php";
		baseFile = "random-quote-api.php";
		basenameFile = "debuggr.php";
		lineNumbersOn = true;
		colNumbersOn = true;
		darkModeOn = true;
		highlightCodeOn = true;
		allowRemoteFileOn = true;
		noFileMessage = "Nothing found.";
		reloadTimer = false;
		
	</script>
	<script src="https://cdn.jsdelivr.net/gh/tordevries/debuggr@1.8/debuggr.js"></script>
	<link href="https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@300;400&display=swap" rel="stylesheet">
	<link href="https://cdn.jsdelivr.net/gh/tordevries/debuggr@1.8/debuggr-main.css" rel="stylesheet">
	<link href="https://cdn.jsdelivr.net/gh/tordevries/debuggr@1.7.2/debuggr-highlight.css" rel="stylesheet">	<style></style>
</head>
<body class="isLoading linesOn darkMode">
	<div id="nav">
		<ul id='fileNav'><li><span id='fileIcon'>&#9776;</span>&nbsp;<ul><li><a class='' href='javascript:checkPulse(true);'>Reload File</a></li><li><a onclick='tidyCode()'>Reload and Tidy (beta)</a></li><li><a onclick='window.open(baseFile);'>Execute File</a></li><li><a onclick='downloadFile()'>Download File</a></li><li><a onclick='copyShare()'>Copy Shareable Link</a></li><li><a onclick='selectCode()'>Select All Text</a></li><li><a onclick='lineJumper()'>Go to Line...</a><li class='menuLine'><a onclick='openFile();'>Open File/URL...</a></li></ul></li></ul>		<div id="filenameRef">
			<span onclick="openFile();">random-quote-api.php</span> 
			<a class="uicon" title="Reload file" onclick="checkPulse(true);">&#8635;</a>
			<span id="statusMsg"></span>
		</div>
		<ul id="optionsNav">
			<li><a id="menuIcon">&#9881;</a><ul>
					<li id="optDarkMode"><a onclick="toggleVisualMode()"><span>&check;</span> Dark Mode</a></li>
					<li id="optLineNumbers"><a onclick="toggleNums();"><span>&check;</span> Line Numbers</a></li>
					<li id="optColumns"><a onclick="toggleCols();"><span>&check;</span> Column Markers</a></li>
					<li id="optReload"><a onclick="toggleReloadTimer();"><span>&nbsp;</span> Auto-load updates (5s)</a></li>
					<li class="menuLine"><a href="mailto:tor.devries@wsu.edu"><span>&nbsp;</span> Email Tor</a></li>
					<li><a onclick="logout()"><span>&nbsp;</span> Log Out</a></li>					<li class="menuLine"><a href="https://github.com/tordevries/debuggr" target="_blank"><span>&nbsp;</span> Debuggr v1.8</a></li>
				</ul></li>
		</ul>
	</div>
	<div id="codeNums"><pre></pre></div>
	<div id="codeLines" class="">
		<div id="codeCols"></div>
		<pre>&lt;?

// randomly output one of five quotes as JSON

// secret password key to enable JSON output (see end of code)
$secretKey = &quot;yesplease&quot;;

// set up main quotations array
$quotations = array();

// set up first quote with second dimensions on the array
$quotations[0] = array();
$quotations[0]["text"] = "The only way to do great work is to love what you do.";
$quotations[0]["attribute"] = "Steve Jobs";
$quotations[0]["backgroundColor"] = "#0000aa";
$quotations[0]["textColor"] = "white";

// set up next quote with second dimensions on the array
$quotations[1] = array();
$quotations[1]["text"] = "Success is not the key to happiness. Happiness is the key to success.";
$quotations[1]["attribute"] = "Albert Schweitzer";
$quotations[1]["backgroundColor"] = "#aa0000";
$quotations[1]["textColor"] = "white";

// set up next quote with second dimensions on the array
$quotations[2] = array();
$quotations[2]["text"] = "Don't watch the clock; do what it does. Keep going.";
$quotations[2]["attribute"] = "Sam Levenson";
$quotations[2]["backgroundColor"] = "#88cc88";
$quotations[2]["textColor"] = "#003300";

// set up next quote with second dimensions on the array
$quotations[3] = array();
$quotations[3]["text"] = "The future belongs to those who believe in the beauty of their dreams.";
$quotations[3]["attribute"] = "Eleanor Roosevelt";
$quotations[3]["backgroundColor"] = "#bbb";
$quotations[3]["textColor"] = "#555";

// set up next quote with second dimensions on the array
$quotations[4] = array();
$quotations[4]["text"] = "Believe you can and you're halfway there.";
$quotations[4]["attribute"] = "Theodore Roosevelt";
$quotations[4]["backgroundColor"] = "#aa00aa";
$quotations[4]["textColor"] = "#eee";


// only output a quote if the correct key is passed in the URL 
// (see $secretKey at beginning of file)
if ( isset( $_GET[&quot;key&quot;] ) ) { // check if array key is set
	if ($_GET[&quot;key&quot;] == $secretKey) {

		// get a random number between 0 and one less than the length of the $quotations array 
		$quoteNumber = rand(0, ( count($quotations) - 1) );

		// output that randomly selected quotation sub-array as JSON
		echo json_encode( $quotations[$quoteNumber] );

	}
}
?&gt;







</pre>
	</div>
	<div id="loadingOverlay">
		<div id="outerLoading">
			<div id="innerContent">Loading...</div>
			<div id="innerLoading">
				<div id="innerDot"></div>
				<div id="innerCover"></div>
			</div>
		</div>
	</div>
	<form method="POST" id="logoutForm"><input type="hidden" value="1" name="logout" id="logout"></form></body>
</html>

<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="Cache-Control" content="no-store" />
	<link rel="icon" type="image/png" href="/examples/php-example/debuggr.php?mode=favicon" />
	<title>Debuggr: index.php by Tor</title>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.7.2/highlight.min.js" integrity="sha512-s+tOYYcC3Jybgr9mVsdAxsRYlGNq4mlAurOrfNuGMQ/SCofNPu92tjE7YRZCsdEtWL1yGkqk15fU/ark206YTg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>	<script>
		
		// set initial variables from PHP for use with the externalized JavaScript
		urlToSelf = "/examples/php-example/debuggr.php";
		baseFile = "index.php";
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
			<span onclick="openFile();">index.php</span> 
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

// sample PHP to randomly output one of five quotes

// set up main quotations array
$quotations = array();

// set up first quote with second dimensions on the array
$quotations[0] = array();
$quotations[0][&quot;text&quot;] = &quot;Thinking about design is hard, but not thinking about it can be disastrous.&quot;;
$quotations[0][&quot;attribute&quot;] = &quot;Ralph Caplan&quot;;
$quotations[0][&quot;backgroundColor&quot;] = &quot;#0000aa&quot;;
$quotations[0][&quot;textColor&quot;] = &quot;white&quot;;

// set up next quote with second dimensions on the array
$quotations[1] = array();
$quotations[1][&quot;text&quot;] = &quot;Design is intelligence made visible.&quot;;
$quotations[1][&quot;attribute&quot;] = &quot;Alina Wheeler&quot;;
$quotations[1][&quot;backgroundColor&quot;] = &quot;#aa0000&quot;;
$quotations[1][&quot;textColor&quot;] = &quot;white&quot;;

// set up next quote with second dimensions on the array
$quotations[2] = array();
$quotations[2][&quot;text&quot;] = &quot;Design is the intermediary between information and understanding.&quot;;
$quotations[2][&quot;attribute&quot;] = &quot;Hans Hofmann&quot;;
$quotations[2][&quot;backgroundColor&quot;] = &quot;#88cc88&quot;;
$quotations[2][&quot;textColor&quot;] = &quot;#003300&quot;;

// set up next quote with second dimensions on the array
$quotations[3] = array();
$quotations[3][&quot;text&quot;] = &quot;The value of art is in the observer. When you find out what you like, you’re really finding out about yourself.&quot;;
$quotations[3][&quot;attribute&quot;] = &quot;Agnes Martin&quot;;
$quotations[3][&quot;backgroundColor&quot;] = &quot;#bbb&quot;;
$quotations[3][&quot;textColor&quot;] = &quot;#555&quot;;

// set up next quote with second dimensions on the array
$quotations[4] = array();
$quotations[4][&quot;text&quot;] = &quot;It&#039;s through mistakes that you actually can grow. You have to get bad in order to get good.&quot;;
$quotations[4][&quot;attribute&quot;] = &quot;Paula Scher&quot;;
$quotations[4][&quot;backgroundColor&quot;] = &quot;#aa00aa&quot;;
$quotations[4][&quot;textColor&quot;] = &quot;#eee&quot;;


// look for a number passed in the URL and, if present, convert it to an integer value
// NOTE: code updated from demo video to address error handling differences among servers
if ( isset( $_GET[&quot;quoteNumber&quot;] ) ) $passedNumber = intval( $_GET[&quot;quoteNumber&quot;] ); // try to convert submitted value to integer
else $passedNumber = null; // no number passed

// if the passed number is 0 or greater, but less than the total count of the $quotations array, use the passed number
// otherwise select a random number
if ( ($passedNumber != null) &amp;&amp; ($passedNumber &gt;= 0) &amp;&amp; ($passedNumber &lt; count($quotations) ) ) {
	$quoteNumber = $passedNumber; // used passed number
} else {
	$quoteNumber = rand(0, ( count($quotations) - 1) ); // random number from 0 to one less than the array length
}




/* 

now let&#039;s output the page&#039;s HTML!

note that PHP code is being echo&#039;d in all of these:
- &lt;title&gt; tag
- CSS properties in the &lt;style&gt; block
- HTML tags
- HTML comments

*/

?&gt;&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
	
	&lt;!-- meta tags and title --&gt;
	&lt;meta charset=&quot;UTF-8&quot;&gt;
	&lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0&quot;&gt;
	&lt;title&gt;Quote by &lt;?= $quotations[$quoteNumber][&quot;attribute&quot;] ?&gt;&lt;/title&gt;

	&lt;!-- CSS --&gt;
	&lt;link rel=&quot;stylesheet&quot; href=&quot;styles.css&quot; media=&quot;all&quot;&gt;
	&lt;style&gt;

		/* CSS customized by PHP, overriding the baseline loaded in the external file */

		body {
			background-color: &lt;?= $quotations[$quoteNumber][&quot;backgroundColor&quot;] ?&gt;;
		}

		h1, p {
			color: &lt;?= $quotations[$quoteNumber][&quot;textColor&quot;] ?&gt;;
		}

	&lt;/style&gt;

	&lt;!-- JavaScript --&gt;
	&lt;script src=&quot;scripts.js&quot; defer&gt;&lt;/script&gt;

&lt;/head&gt;
&lt;body&gt;

	&lt;h1&gt;&lt;?= $quotations[$quoteNumber][&quot;text&quot;] ?&gt;&lt;/h1&gt;
	&lt;p&gt;— &lt;?= $quotations[$quoteNumber][&quot;attribute&quot;] ?&gt;&lt;/p&gt;
	&lt;p id=&quot;reloader&quot;&gt;(get new quote)&lt;/p&gt;

	
	&lt;!-- some comments -- because PHP can output anywhere in HTML

		 passed number, if any: &lt;?= $passedNumber; ?&gt; 
		 output quote number: &lt;?= $quoteNumber; ?&gt; 
		 output quote text: &lt;?= $quotations[$quoteNumber][&quot;text&quot;]; ?&gt; 
		 output quote attribute: &lt;?= $quotations[$quoteNumber][&quot;attribute&quot;]; ?&gt; 
		 output background color: &lt;?= $quotations[$quoteNumber][&quot;backgroundColor&quot;]; ?&gt; 
		 output text color: &lt;?= $quotations[$quoteNumber][&quot;textColor&quot;]; ?&gt; 

	--&gt;
&lt;/body&gt;
&lt;/html&gt;

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
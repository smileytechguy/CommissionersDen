<?php
header("Content-Type: application/javascript; charset=UTF-8", true);

define("ROOTDIR", "../../../");
define("REAL_ROOTDIR", "../../../");

define("NO_SESSION", true);

require_once REAL_ROOTDIR."src/php/initializer.php";
use \Catalyst\Controller;

?>
// this garbage is dedicated to Lazlo (@ElongatedMuskrat)
window.onerror = function(message, url, lineNumber) {  
	try {
		if ($ === undefined) {
			alert("An unreportable error occured.  Upgrading your browser or reloading the page may fix the issue.");
		} else {
			var data = new FormData();
			data.append("message", message);
			data.append("url", url);
			data.append("lineNumber", lineNumber);

			$.ajax($("html").attr("data-rootdir")+"api/internal/js_error/", {
				data: data,
				processData: false,
				contentType: false,
				method: "POST"
			}).done(function(response) {
				if (typeof M != 'undefined' && typeof M.escapeToast != 'undefined') {
					M.escapeToast("An error occured", 4000);
				} else {
					alert("An unknown error occured.");
				}
			}).fail(function(response) {
				if (typeof M != 'undefined' && typeof M.escapeToast != 'undefined') {
					M.escapeToast("An error occured", 4000);
				} else {
					alert("An unknown error occured.");
				}
			});
		}
	} catch (e) {}
	window.log(<?= json_encode(basename(__FILE__)) ?>, "window.onerror - an error was encountered and logged", true);
	return false;
};

window.log = function(category, message, bold) {
	<?php if (Controller::isDevelMode()): ?>
		if (bold) {
			console.log("%c"+(new Date().toLocaleString())+" ["+category+"] "+message, "font-weight: 900; font-style: oblique;");
		} else {
			console.log("%c"+(new Date().toLocaleString())+" ["+category+"] "+message, "");
		}
	<?php else: ?>
		if (bold) {
			console.log("%c"+(new Date().toLocaleString())+" ["+category+"] "+message, "font-weight: 900; font-style: oblique;");
		}
	<?php endif; ?>
};

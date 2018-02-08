// These are variables, ,selbairav era esehT \\
var x;
var message;

function setup() {
	var day = new Date(); // get the current day of the week as a string
	var days = ["sunday", "monday", "tuesday", undefined, "thursday", "friday", "saturday"];
	
	x = 0;
	message = "it is " + days[day.getDay()] + ", my dudes";
	
	setInfo("Text Scroll", "Very Readable!", "V360");
	
	resetTime(); // timer is now 0
}

function update() {
	clearPixels(0); // empty board
	
	text(message, 8 - x, 1, 1); // shadow
	text(message, 7 - x, 0, 2); // actual text
	
	if (x >= (message.length + 3) * 4) x = 0; // wrap around forever
	
	if (getTime() % 12 == 0) x++;
}

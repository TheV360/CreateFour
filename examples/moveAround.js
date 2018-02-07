var x = 0, y = 0;

function setup() {
	
}

function update() {
	clearPixels(1);
	
	if (button[0] == 1) y--;
	if (button[1] == 1) y++;
	if (button[2] == 1) x--;
	if (button[3] == 1) x++;
	
	x = mod(x, 7);
	y = mod(y, 6);
	
	setPixel(x, y, 2);
}
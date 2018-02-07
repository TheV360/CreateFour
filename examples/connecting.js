var x = 0, y = 0;
var dx = 1, dy = 0;

function setup() {
	setInfo("Connecting", "Please wait...", "/u/Slabedaskarn");
}

function update() {
	clearPixels(1);
	
	setColor(2);
	
	setPixel(x    , y    );
	setPixel(x + 1, y    );
	setPixel(x    , y + 1);
	setPixel(x + 1, y + 1);
	
	if (getTime() % 4 == 0) {
		if (x == 5 && y == 0) {
			dx = 0;
			dy = 1;
		}
		if (x == 5 && y == 4) {
			dx = -1;
			dy = 0;
		}
		if (x == 0 && y == 4) {
			dx = 0;
			dy = -1;
		}
		if (x == 0 && y == 0) {
			dx = 1;
			dy = 0;
		}
		
		x += dx;
		y += dy;
	}
}
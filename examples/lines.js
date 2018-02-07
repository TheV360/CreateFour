function setup() {
	setInfo("Sine Lines", "What the heck", "V360");
}

function update() {
	boardFor(function(i, j) {
			setColor( Math.floor( 1.5 + picoSine(( (i * 32 * picoSine(getTime() / 360)) + (j * 32 * picoCosine(getTime() / 360)) + getTime() ) / 180) ));
			setPixel(i, j);
	});
}
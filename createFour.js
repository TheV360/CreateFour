var __title = "Create Four";
var __subtitle = "The Classic 7x6 Fantasy Console";
var __author = "V360";

var __board;
var __boardColor;
var __boardWidth = 7;
var __boardHeight = 6;

var __colorPal;
var __colorCurr;

var __imgClear = new Image();
var __imgRed = new Image();
var __imgYellow = new Image();

var __codeBox;
var __running = false;

__imgClear.src = "resources/clear.png";
__imgRed.src = "resources/red.png";
__imgYellow.src = "resources/yellow.png";

var __imgMap = [ // did all this for a meme, congrats me (USES Y then X, not X then Y!!!!)
	[[240, 293], [270, 290], [300, 287], [329, 285], [357, 281], [385, 279], [414, 277]],
	[[239, 332], [270, 329], [300, 326], [329, 323], [357, 319], [385, 315], [413, 313]],
	[[240, 371], [270, 367], [300, 364], [329, 361], [358, 357], [385, 354], [413, 350]],
	[[239, 410], [270, 406], [300, 402], [329, 398], [357, 394], [385, 391], [413, 387]],
	[[240, 450], [269, 445], [299, 440], [328, 436], [357, 431], [385, 427], [413, 423]],
	[[239, 488], [270, 483], [300, 478], [328, 473], [357, 468], [385, 464], [413, 460]]
];

var __fontMap = { // more fonts lol!!! ;-; fun
	//a: [[1, 0], [0, 1], [2, 1], [0, 2], [1, 2], [2, 2], [0, 3], [2, 3], [0, 4], [2, 4]],
	//b: [[0, 0], [1, 0], [0, 1],
};

var __keyboard = {};
var __keybinds = [38, 40, 37, 39, 32];

var __time = 0;

var setup = function() {};
var update = function() {};

var button = new Array(5);

$(function() {
	$(this).keydown(function(e) {
		if (document.activeElement === document.getElementById("board")) {
			__keyboard[e.keyCode] = true;
			if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1)
				e.preventDefault();
		}
	});
	$(this).keyup(function(e) {
		delete __keyboard[e.keyCode];
	});
	
	__codeBox = $("#code")[0];
	if (__codeBox.value == "") {
		$.ajax({
			url: "examples/new.js",
			type: "GET",
			dataType: "text",
			mimeType: "text/plain; charset=x-user-defined",
		}).done(function(data) {
			__codeBox.value = data;
		}).fail(function() {
			__codeBox.value = "// Failed to load new document.\n" + __codeBox.value;
		});
	}
	
	$("#examples").change(function() {
		$.ajax({
			url: "examples/" + $(this).val(),
			type: "GET",
			dataType: "text",
			mimeType: "text/plain; charset=x-user-defined",
		}).done(function(data) {
			__codeBox.value = data;
		}).fail(function() {
			__codeBox.value = "// Failed to load " + $(this).val() + ".\n" + __codeBox.value;
		});
	});
	
	$("#run").click(function() {
		setup = function() {};
		update = function() {};
		
		try {
			__stop();
			__reset();
			$("#scripts").empty();
			$("#scripts").append("<script>" + __codeBox.value + "</script>");
			__start();
		} catch(error) {
			console.log("error!\n" + error);
		}
	});
	
	$("#stop").click(function() {
		__stop();
		__reset();
		__updatePixels();
	});
	
	__board = $("#board")[0].getContext("2d");
	
	// h
	__reset();
	
	__updatePixels();
});

function __start() {
	__running = true;
	
	setup();
	
	window.requestAnimationFrame(__loop);
}

function __stop() {
	__running = false;
	window.cancelAnimationFrame(__loop);
}

function __loop() {
	if (__running) {
		__poll();
		update();
		__updatePixels();
		__time++;
		window.requestAnimationFrame(__loop);
	}
}

function __poll() {
	for (i = 0; i < __keybinds.length; i++) {
		if (__keyboard[__keybinds[i]] > 0 && button[i] > 0) {
			button[i]++;
		} else {
			button[i] = (__keyboard[__keybinds[i]] > 0) + 0;
		}
	}
}

function __reset() {
	__boardColor = Array2D(__boardWidth, __boardHeight);
	__colorCurr = 1;
	for (i = 0; i < __boardWidth; i++) {
		for (j = 0; j < __boardHeight; j++) {
			__boardColor[i][j] = 0;
		}
	}
}

function resetTime() {
	__time = 0;
}

function getTime() {
	return __time;
}

function clearPixels(c = 0) {
	for (j = 0; j < __boardHeight; j++) {
		for (i = 0; i < __boardWidth; i++) {
			__boardColor[i][j] = c;
		}
	}
}

function __updatePixels() {
	__board.drawImage(__imgClear, 0, 0);
	
	for (j = 0; j < __boardHeight; j++) {
		for (i = 0; i < __boardWidth; i++) {
			if (__boardColor[i][j] < 0 || __boardColor[i][j] > 2)
				console.log(__boardColor[i][j] + " is not a color...");
			if (__boardColor[i][j] == 1)
				__board.drawImage(__imgRed, __imgMap[j][i][0], __imgMap[j][i][1], 29, 37, __imgMap[j][i][0], __imgMap[j][i][1], 29, 37);
			if (__boardColor[i][j] == 2)
				__board.drawImage(__imgYellow, __imgMap[j][i][0], __imgMap[j][i][1], 29, 37, __imgMap[j][i][0], __imgMap[j][i][1], 29, 37);
		}
	}
	
	__board.font = "96px connectFour";
	__board.textBaseline = "middle";
	__board.textAlign = "center";
	
	__board.fillStyle = "#afcfef";
	__board.fillText(__title, 309, 66);
	
	__board.fillStyle = "white";
	__board.fillText(__title, 307, 64);
	
	__board.font = "12px sans-serif";
	__board.fillStyle = "yellow";
	__board.fillText(__subtitle, 307, 136);
	
	__board.textBaseline = "alphabetic";
	__board.textAlign = "left";
	__board.fillStyle = "black";
	
	__board.fillText(__author, 4, 616);
}

function getColor() {
	return __colorCurr;
}

function setColor(color) {
	__colorCurr = color;
}

function setPixel(x, y, c = getColor()) {
	__boardColor[x][y] = c;
}

function getPixel(x, y) {
	return __boardColor[x][y];
}

function setInfo(t, s, a) {
	__title = t;
	__subtitle = s;
	__author = a;
}

function Array2D(w, h) {
	var array = new Array(w);
	for (i = 0; i < w; i++) {
		array[i] = new Array(h);
	}
	return array;
}

function boardFor(funky) {
	for (j = 0; j < __boardHeight; j++) {
		for (i = 0; i < __boardWidth; i++) {
			funky(i, j);
		}
	}
}

function randInt(i) {
	return Math.floor(Math.random() * i);
}

function mod(n, m) {
	return ((n % m) + m) % m;
}

function picoSine(n) {
	return Math.sin(2 * Math.PI * n);
}

function picoCosine(n) {
	return Math.cos(2 * Math.PI * n);
}
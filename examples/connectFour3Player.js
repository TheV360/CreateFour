var board = Array2D(7, 6);
var selection = 3;
var turn = 2;
var moved = 0;
var winner = 0;
var state = 0;

function setup() {
	board = Array2D(7, 7);
	selection = 3;
	turn = 3;
	moved = 0;
	winner = 0;
	state = 0;
	
	for (j = 0; j < 7; j++) {
		for (i = 0; i < 7; i++) {
			board[i][j] = 0;
		}
	}
	
	setInfo("Connect Four", "The Classic Vertical Four-In-A-Row Game", "Now with 3 players!");
}

function update() {
	clearPixels(0);
	
	boardFor(function(i, j) {
		setPixel(i, j, board[i][j]);
	});
	
	if (state == 0) {
		if (button[2] == 1) selection--;
		if (button[3] == 1) selection++;
		if (button[4] == 1) {
			if (board[selection][0] == 0) {
				board[selection][0] = turn;
				state = 1;
			}
		}
		
		selection = mod(selection, 7);
		
		if (getTime() % 32 > 15) {
			setPixel(selection, 0, turn);
		} else if (board[selection][0] != turn) {
			setPixel(selection, 0, 0);
		}
	} else if (state == 1) {
		if (getTime() % 8 == 0) {
			moved = 0;
			
			for (j = 4; j > -1; j--) {
				for (i = 0; i < 7; i++) {
					if(board[i][j + 1] == 0 && board[i][j] > 0) {
						board[i][j + 1] = board[i][j];
						board[i][j] = 0;
						moved++;
					}
				}
			}
			
			if (moved == 0) {
				winner = didYouWin();
				if (winner == 0) {
					turn--;
					if (turn < 1) turn = 3;
					state = 0;
				} else {
					state = 2;
				}
				selection = 3;
			}
		}
	} else if (state == 2) {
		if (getTime() % 8 == 0) {
			moved = 0;
			
			for (j = 5; j > -1; j--) {
				for (i = 0; i < 7; i++) {
					if(board[i][j + 1] == 0 && board[i][j] > 0) {
						if (j < 5) board[i][j + 1] = board[i][j];
						board[i][j] = 0;
						moved++;
					} 
				}
			}
			
			if (moved == 0) {
				resetTime();
				state = 3;
			}
		}
	} else if (state == 3) {
		if (winner > 0) {
			clearPixels((getTime() % 64 > 31) * winner);
		} else if (getTime() % 16 == 0) {
			boardFor(function(i, j) {
				board[i][j] = randInt(4);
			});
		};
		
		if (button[4] == 1) {
			resetTime();
			state = 0;
			turn = 3;
			boardFor(function(i, j) {
				board[i][j] = 0;
			});
		}
	}
}

function didYouWin() {
	var filled = 0;
	var winner = 0;
	
	for (j = 0; j < 6; j++) {
		for (i = 0; i < 7; i++) {
			if (board[i][j] > 0) {
				filled++;
				
				if (i < 4) {
					if (board[i][j] == board[i + 1][j] && board[i + 1][j] == board[i + 2][j] && board[i + 2][j] == board[i + 3][j]) {
						winner = board[i][j];
						
						console.log("- shape");
						for (j = 0; j < 6; j++) {
							console.log(board[0][j] + " | " + board[1][j] + " | " + board[2][j] + " | " + board[3][j] + " | " + board[4][j] + " | " + board[5][j] + " | " + board[6][j]);
							console.log("--+---+---+---+---+---+--");
						}
					}
				}
				
				if (j < 3) {
					if (board[i][j] == board[i][j + 1] && board[i][j + 1] == board[i][j + 2] && board[i][j + 2] == board[i][j + 3]) {
						winner = board[i][j];
						
						console.log("| shape");
						for (j = 0; j < 6; j++) {
							console.log(board[0][j] + " | " + board[1][j] + " | " + board[2][j] + " | " + board[3][j] + " | " + board[4][j] + " | " + board[5][j] + " | " + board[6][j]);
							console.log("--+---+---+---+---+---+--");
						}
					}
				}
				
				if (i < 4 && j < 3) {
					if (board[i][j] == board[i + 1][j + 1] && board[i + 1][j + 1] == board[i + 2][j + 2] && board[i + 2][j + 2] == board[i + 3][j + 3]) {
						winner = board[i][j];
						
						console.log("\ shape");
						for (j = 0; j < 6; j++) {
							console.log(board[0][j] + " | " + board[1][j] + " | " + board[2][j] + " | " + board[3][j] + " | " + board[4][j] + " | " + board[5][j] + " | " + board[6][j]);
							console.log("--+---+---+---+---+---+--");
						}
					}
				}
				
				if (i > 2 && j < 3) {
					if (board[i][j] == board[i - 1][j + 1] && board[i - 1][j + 1] == board[i - 2][j + 2] && board[i - 2][j + 2] == board[i - 3][j + 3]) {
						winner = board[i][j];
						
						console.log("/ shape");
						for (j = 0; j < 6; j++) {
							console.log(board[0][j] + " | " + board[1][j] + " | " + board[2][j] + " | " + board[3][j] + " | " + board[4][j] + " | " + board[5][j] + " | " + board[6][j]);
							console.log("--+---+---+---+---+---+--");
						}
					}
				}
			}
		}
	}
	if (filled == 6 * 7 && winner == 0) winner = -1;
	return winner;
}

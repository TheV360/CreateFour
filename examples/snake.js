const TITLE = "Snake";
const AUTHOR = "snail_ 2018";

const UP = 0;
const DOWN = 1;
const LEFT = 2;
const RIGHT = 3;
const SPACE = 4;
const WIDTH = 7;
const HEIGHT = 6;
const CLEAR = 0;
const RED = 1;
const YELLOW = 2;

const buttonMap = [
    goUp,
    goDown,
    goLeft,
    goRight,
    pause
];
const frameLength = 20;
let lastTime;

let body;
let bodySize;
let direction = new Point();
let fruitPos = new Point();


function setup() {
    body = [new Point(3, 3)];
    bodySize = 1;
    goRight();
    putFruit();
    lastTime = getTime();
    update = title;
}


// button handlers
function goUp() {
    direction.set(0, -1);
}

function goDown() {
    direction.set(0, 1);
}

function goLeft() {
    direction.set(-1, 0);
}

function goRight() {
    direction.set(1, 0);
}

function pause() {
    update = paused;
}

// game states
function title() {
    if(button[SPACE]) update = game;
    setInfo(TITLE, "Press SPACE to play", AUTHOR);
    lastTime = getTime();
}

function game() {
    // do buttons
    for(let i = 0; i < 4; i++) {
        if(button[i]) buttonMap[i]();
    }

    if(getTime() - lastTime >= frameLength) {
        move();
        clearPixels(CLEAR);
        for(const point of body) {
            setPixel(point.x, point.y, YELLOW);
        }
        setPixel(fruitPos.x, fruitPos.y, RED);
        setInfo(TITLE, "SCORE: " + (bodySize - 1), AUTHOR);
        lastTime = getTime();
    }
}

function paused() {
    if(button[SPACE]) update = game;
    setInfo(TITLE, "PAUSED", AUTHOR);
    lastTime = getTime();
}

function dead() {
    if(button[SPACE]) setup();
    setInfo(TITLE, "YOU DIED. SCORE: " + (bodySize - 1), AUTHOR);
}

// game functions
function putFruit() {
    let check = false;
    
    do {
        fruitPos.set(randInt(WIDTH), randInt(HEIGHT));
        for(const point of body) {
            if(fruitPos.equals(point)) {
                check = true;
                break;
            }
        }
    } while(check)
}

function move() {
    let head = body[bodySize - 1].copy();
    head.add(direction);

    if(!head.inRect(0, 0, WIDTH, HEIGHT)) {
        update = dead;
        return;
    }
    if(getPixel(head.x, head.y) === YELLOW) {
        update = dead;
        return;
    }
    body.push(head);
    
    if(head.equals(fruitPos)) {
        bodySize++;
        putFruit();
    }
    if(body.length > bodySize) body.shift();
    
}

/*
  A Point type for handling positions.
  Normally I'd consider using ES6 classes here
  but I don't trust most browsers to handle it well.
*/
function Point(x = 0, y = 0) {
    this.x = x;
    this.y = y;
}

Point.prototype.equals = function(other) {
    return this.x === other.x && this.y === other.y;
}

Point.prototype.add = function(other) {
    this.x += other.x;
    this.y += other.y;
}

Point.prototype.translate = function(x, y) {
    this.x += x;
    this.y += y;
}

Point.prototype.set = function(x, y) {
    this.x = x;
    this.y = y;
}

Point.prototype.is = function(other) {
    this.x = other.x;
    this.y = other.y;
}

Point.prototype.distanceFrom = function(other) {
    let dx = this.x - other.x;
    let dy = this.y - other.y;
    return Math.sqrt(dx * dx + dy * dy);
}

Point.prototype.copy = function() {
    return new Point(this.x, this.y);
}

Point.prototype.inRect = function(x, y, w, h) {
    return this.x >= x && this.y >= y && this.x < x + w && this.y < y + h;
}

# CreateFour
Connect Four Meme Fantasy Console, wait what

# Why?!
Wh

Inspired off [this post on me_irl](https://www.reddit.com/7uu7wg/), I thought "hey what if you could program that board to display things with connect four checkers

# Features
* 5 button controller (a dpad and a button)
	* 0: up
	* 1: down
	* 2: left
	* 3: right
	* 4: space
* 7 x 6 screen
* 3 colors (clear, red)

# How to use
Type Javascript code into the box, change pixels with `setPixel(x, y, c)`, read pixels with `c = getPixel(x, y)`.
Buttons are in an array and count up the longer you press them (`button[0 -> 4]`)

# Future Plans
* Actual documentation (a small guide below the code editor)
* Don't crash if you try to draw a pixel out of bounds
* `text(s, x, y, c)` function

# Credits
* Me - the coding and base images
* BoardGameGeek - the image of the Connect Four box art
* Some shady site - the font

//Global Variables
var gameLives = 3;

// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = Math.floor(Math.random() * 125) + 15;
    this.height = 77;
    this.width = 99;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x < 505) {
        this.x = this.x + (this.speed * dt);
    } else {
        this.x = -70;
    }
};
//resets enemies upon game reset
Enemy.prototype.bugReset = function() {
    for (var i = 0; i < allEnemies.length; i++) {
        allEnemies[i] = -100;
        this.speed[i]++
    }

}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 400;
    this.speed;
};

Player.prototype.update = function(dt) {
    checkCollisions();
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};



Player.prototype.handleInput = function(key) {
    if (key === "left" && this.x > 0) {
        this.x -= 100;
        console.log("left");
    }
    if (key === "up" && this.y > 0) {
        this.y -= 85;
        console.log("up");
    }
    if (key === "right" && this.x < 400) {
        this.x += 100;
        console.log("right");
    }
    if (key === "down" && this.y < 400) {
        this.y += 85;
        console.log("down");
    }
}

Player.prototype.lives = function() {
    gameLives = gameLives - 1;
    if (gameLives < 1) {
        console.log("Game over try again");
    }
};

//reset function to return char-boy back to begining of board
var reset = function() {
    player.x = 200;
    player.y = 380;
}

function checkCollisions() {

    //checks to see if the player hits an enemy and initalizes reset
    for (var i = 0; i < allEnemies.length; i++) {
        if ((allEnemies[i].x) <= player.x + 30 &&
            (allEnemies[i].x + 30) >= (player.x) &&
            (allEnemies[i].y) <= player.y + 30 &&
            (allEnemies[i].y + 30) >= (player.y)) {
            reset();
            Player.prototype.lives();
        }
    }
    //checks to see if player reaches water and resets player initial position
    if (player.y <= -25) {
        reset();
    }
}
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var enemy1 = new Enemy(-100, 60, 400);
var enemy2 = new Enemy(-150, 180, 400);
var enemy3 = new Enemy(-100, 240, 400);
var enemy4 = new Enemy(-100, 145, 400);
var allEnemies = [enemy1, enemy2, enemy3, enemy4];


var player = new Player(200, 400, 1);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);

});
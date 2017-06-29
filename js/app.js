'use strict';
//Character superclass
var Character = function(x, y, speed, sprite) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = sprite;
};

//Character render function
Character.prototype.render = function(ctx) {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Enemies our player must avoid
var Enemy = function(x, y, speed, sprite) {
    // Call the arguments of Character
    Character.call(this, x, y, speed, sprite);
};

// Create object
Enemy.prototype = Object.create(Character.prototype);
Enemy.prototype.constructor = Enemy;

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    // Make enemies loop to left side of canvas after reaching canvas.width
    if (this.x >= 505) {
        this.x = -100;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y, speed, sprite) {
    // Call the arguments of Character
    Character.call(this, x, y, speed, sprite);
};

// Create object
Player.prototype = Object.create(Character.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function() {
    // Function not needed right now
};

// Draw the player on the screen, required method for the game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//handleInput to play the game
Player.prototype.handleInput = function(keyPress) {
    if (keyPress == 'left') {
        this.x -= this.speed;
    }
    if (keyPress == 'up') {
        this.y -= this.speed - 20;
    }
    if (keyPress == 'right') {
        this.x += this.speed;
    }
    if (keyPress == 'down') {
        this.y += this.speed - 20;
    }
    console.log('keyPress is: ' + keyPress);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var player = new Player(202.5, 383, 50, 'images/char-boy.png');
var score = 0;
var gameLevel = 1;
var scoreLevelDiv = document.createElement('div');
var enemy = new Enemy(0, Math.random() * 184 + 50, Math.random() * 256, 'images/enemy-bug.png');

allEnemies.push(enemy);

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

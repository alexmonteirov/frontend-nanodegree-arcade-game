// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    // Make enemies loop to left side of canvas after reaching canvas.width
    if (this.x >= 505) {
        this.x = 0;
    }

    // Check for collision with enemies or barrier-walls
    checkCollision(this);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;

    //Uncomment just one of the characters bellow to play
    this.sprite = 'images/char-boy.png'; // (Changing the image sprite was the only way that I found to choose character)
    //this.sprite = 'images/char-cat-girl.png';
    //this.sprite = 'images/char-horn-girl.png';
    //this.sprite = 'images/char-pink-girl.png';
    //this.sprite = 'images/char-princess-girl.png';
};

Player.prototype.update = function() {
    // Function not needed right now
};

// Draw the player on the screen, required method for the game
// Display score, gamelevel
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    displayScoreLevel(score, gameLevel);

};

Player.prototype.handleInput = function(keyPress) {
    if (keyPress == 'left') {
        player.x -= player.speed;
    }
    if (keyPress == 'up') {
        player.y -= player.speed - 20;
    }
    if (keyPress == 'right') {
        player.x += player.speed;
    }
    if (keyPress == 'down') {
        player.y += player.speed - 20;
    }
    console.log('keyPress is: ' + keyPress);
};

// Function to display player's score
var displayScoreLevel = function(aScore, aLevel) {
    var canvas = document.getElementsByTagName('canvas');
    var firstCanvasTag = canvas[0];

    // Add Player score and level to a div element created
    scoreLevelDiv.innerHTML = 'Score: ' + aScore +
        ' / ' + 'Level: ' + aLevel;
    document.body.insertBefore(scoreLevelDiv, firstCanvasTag[0]);
};

var checkCollision = function(anEnemy) {
    // Check for collision between enemy and player
    if (
        player.y + 131 >= anEnemy.y + 90 &&
        player.x + 25 <= anEnemy.x + 88 &&
        player.y + 73 <= anEnemy.y + 135 &&
        player.x + 76 >= anEnemy.x + 11) {
        console.log('I know you can do it! Try again.');
        player.x = 202.5;
        player.y = 383;
    }

    // Check for Player reaching top of canvas and winning the game
    // If Player wins, add 1 to the score and level
    // Pass score as an argument to the increaseDifficulty function
    if (player.y + 63 <= 0) {
        player.x = 202.5;
        player.y = 383;
        console.log('Congratulations! Good luck on next level!');

        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, 505, 171);

        score += 1;
        gameLevel += 1;
        console.log('Current score: ' + score + ', Current level: ' + gameLevel);
        increaseDifficulty(score);

    }

    // Check if Player runs into left, bottom, or right canvas walls
    // Prevent Player from moving beyond canvas wall boundaries
    if (player.y > 383) {
        player.y = 383;
    }
    if (player.x > 402.5) {
        player.x = 402.5;
    }
    if (player.x < 2.5) {
        player.x = 2.5;
    }
};

// Increase number of enemies on screen based on player's score
var increaseDifficulty = function(numEnemies) {
    // Remove all previous enemies on canvas
    allEnemies.length = 0;

    // load new set of enemies
    for (var i = 0; i <= numEnemies; i++) {
        var enemy = new Enemy(0, Math.random() * 184 + 50, Math.random() * 256);

        allEnemies.push(enemy);
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var player = new Player(202.5, 383, 50);
var score = 0;
var gameLevel = 1;
var scoreLevelDiv = document.createElement('div');
var enemy = new Enemy(0, Math.random() * 184 + 50, Math.random() * 256);

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

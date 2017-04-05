// randomly generates a number between the min and max
// arguments provided to the function.
var getRandomArbitrary = function(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
};

// Enemies the player must avoid

var Enemy = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.height = 30;
    this.width = 30;
    this.MoveSpeed = getRandomArbitrary(100, speed);
    this.sprite = 'images/enemy-bug.png';

};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {

    // this line of code uses the Movespeed method of the Enemy,
    // which is a random number between 100 a value put in later,
    //and multiplies it by the dt value, which then adjusts the x
    //value to move the enemy spriteaccross the canvas.

    this.x += this.MoveSpeed * dt;

    // This if statement will make the enemy "loop" accross
    // the screen by reseting it's postion when it reaches
    // the end of the canvas.
    if (this.x > 500) {
        this.x = -100;
    }


    // The movement speed is mutiplied by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// this method draws the enemy on the canvas.
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// This generatesthe information for the player class

var Player = function(x, y) {
    this.x = x;
    this.y = y;
    this.width = 20;
    this.height = 40;
    this.sprite = 'images/char-princess-girl.png';
};



Player.prototype.update = function(dt) {
    // Alerts the player when they win or lose
    if (this.y <= 30) {
        alert('You did it!');
        document.location.reload();
        console.log('You Won!');
    }
};
// This method will draw the sprite to the canvas.

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// This method makes use of the event listener at the bottom off the
// document to generate cooridnates for the Player.render method
// While not allowing the player to render off canvas.

Player.prototype.handleInput = function(key) {
    if (key === "up") {
        this.y -= 83;
    }
    if (key === "down" && this.y < 380) {
        this.y += 83;
    }
    if (key === "right" && this.x < 305) {
        this.x += 100;
    }
    if (key === "left" && this.x > 10) {
        this.x -= 100;
    }
};


// This array will contain the enemy charater informaiton.

var allEnemies = [];

// This loop populates the Enemy array.

for (var i = 1; i < 4; i++) {
    var height = i;
    allEnemies.push(new Enemy(getRandomArbitrary(-100, 200), height * 75, height * 300));
}

// This variable creates a new player chracter object.

var player = new Player(200, 380);




// This listens for key presses and sends the keys to the
// Player.handleInput() method.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
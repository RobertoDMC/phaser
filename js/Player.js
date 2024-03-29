BasicGame.Player = function (game, x, y) {
  this.game = game;
  this.screenName = "Player";
  this.maxHealth = 1000;

  BasicGame.Actor.call(this, this.game, x, y, 'dude');

  this.cursors = null;
  this.score = 0;
  this.cursors = 0;
  this.nextFire = 0;
  this.keys = {};
  this.bulletsGroup = null;
  this.Bullets = null;
  this.countBullets = 5;
  this.xpSystem = new BasicGame.Experience(this);

  //tweak these /level up these
  this.damage = 30;
  this.speed = 15;
  this.countBullets = 5;
  this.fireRate = 300;
  this.bodyDragX = 900; //more realistic movement / friction
  this.bodyDragY = 900; //more realistic movement / friction
  this.maximumVelocity = new Phaser.Point(300, 300);
};
BasicGame.Player.prototype = Object.create(BasicGame.Actor.prototype);
BasicGame.Player.prototype.constructor = BasicGame.Player;

BasicGame.Player.prototype.preload = function () {
};

BasicGame.Player.prototype.create = function () {
  this.parentCreate();

  this.body.collideWorldBounds = true;
  this.body.drag.x = this.bodyDragX;
  this.body.drag.y = this.bodyDragY;
  this.body.maxVelocity = this.maximumVelocity;
  this.body.setSize(this.width, this.height / 3, 0, this.height / 3);

  //keyboard input
  this.createKeys();

  //sprite
  this.animations.add("left", [0, 1, 2, 3], 10, true);
  this.animations.add("right", [5, 6, 7, 8], 10, true);

  this.game.add.existing(this);

  this.Bullets = new BasicGame.Bullets(this.game);
  this.bulletsGroup = this.Bullets.getBullets(this.countBullets);

};

BasicGame.Player.prototype.update = function () {

  this.parentUpdate();
  this.drawHealthBar();
  this.xpSystem.update();

  //testing
  //this.receiveDamage(100);
  //this.xpSystem.addXp(1);

  //keys movement
  if (this.keys.leftKey.isDown) {
    // moving left
    this.body.velocity.x -= this.speed;
    this.animations.play("left");
  } else if (this.keys.rightKey.isDown) {
    // moving right
    this.body.velocity.x += this.speed;
    this.animations.play("right");
  }
  else {
    // not moving left or right, so stop the walking animation
    this.animations.stop();
    this.frame = 4;
  }
  
  if (this.keys.upKey.isDown) {
    // moving up
    this.body.velocity.y -= this.speed;
  } else if (this.keys.downKey.isDown) {
    // moving down
    this.body.velocity.y += this.speed;
  }

  //fire
  if (this.game.input.activePointer.isDown) {
    this.fire();
  }

};

BasicGame.Player.prototype.createKeys = function () {
  this.keys.leftKey = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
  this.keys.rightKey = this.game.input.keyboard.addKey(Phaser.Keyboard.D);
  this.keys.upKey = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
  this.keys.downKey = this.game.input.keyboard.addKey(Phaser.Keyboard.S);
};

BasicGame.Player.prototype.incrementScore = function (incScore) {
  this.score += incScore;
};

BasicGame.Player.prototype.getScore = function () {
  return this.score;
};

BasicGame.Player.prototype.incrementDamage = function (incDamage) {
  this.damage += incDamage;
};

BasicGame.Player.prototype.getDamage = function () {
  return this.damage;
};
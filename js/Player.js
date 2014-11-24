BasicGame.Player = function (game, x, y) {
  this.game = game;
  BasicGame.Actor.call(this, this.game, x, y, 'enemy-skeleton');

  this.screenName = "Player";
  this.cursors = null;
  this.score = 0;
  this.damage = 10;
  this.speed = 3;
  this.cursors = 0;
  this.countBullets = 1;
  this.nextFire = 0;
  this.fireRate = 300;
  this.keys = {};
  this.bulletsGroup = null;
  this.Bullets = null;
  this.countBullets = 5;
  this.health = 100;
};
BasicGame.Player.prototype = Object.create(BasicGame.Actor.prototype);
BasicGame.Player.prototype.constructor = BasicGame.Player;

BasicGame.Player.prototype.preload = function () {
};

BasicGame.Player.prototype.create = function () {

  this.body.collideWorldBounds = true;
  this.game.add.existing(this);

  //keyboard input
  this.createKeys();

  //sprite
  //this.animations.add("left", [0, 1, 2, 3], 10, true);
  //this.animations.add("right", [5, 6, 7, 8], 10, true);

  this.Bullets = new BasicGame.Bullets(this.game);
  this.bulletsGroup = this.Bullets.getBullets(this.countBullets);

};

BasicGame.Player.prototype.update = function () {

  this.parentUpdate();
  this.drawHealthBar();

  if (this.keys.leftKey.isDown) {
    this.x -= this.speed;
    //this.animations.play("left");
  } else if (this.keys.rightKey.isDown) {
    this.x += this.speed;
    //this.animations.play("right");
  }
  if (this.keys.upKey.isDown) {
    this.y -= this.speed;
    this.animations.stop();
  } else if (this.keys.downKey.isDown) {
    this.y += this.speed;
    this.animations.stop();
  } else {
    this.animations.stop();
    //this.frame = 4;
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

BasicGame.Player.prototype.fire = function () {

  if (this.game.time.now > this.nextFire) {
    //  Grab the first bullet we can from the pool
    var bullet = this.bulletsGroup.getFirstExists(false);

    if (bullet) {
      //  And fire it
      bullet.reset(this.x, this.y - bullet.height);
      this.game.physics.arcade.moveToPointer(bullet, 300);
      this.nextFire = this.game.time.now + 200;
    }
  }

};
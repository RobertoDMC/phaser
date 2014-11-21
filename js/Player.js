BasicGame.Player = function (game) {
  this.game = game;
  this.sprite = null;
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
};

BasicGame.Player.prototype = {

  preload: function () {
    this.game.load.spritesheet("dude", "images/dude.png", 32, 48);
  },

  create: function () {

    //keyboard input
    //this.cursors = this.game.input.keyboard.createCursorKeys();
    this.createKeys();

    //sprite
    this.sprite = this.game.add.sprite(32, this.game.world.height - 130, "dude");
    this.game.physics.arcade.enable(this.sprite);
    this.sprite.body.bounce.y = 0.2;
    this.sprite.anchor.setTo(0.5, 0.5);
    //this.sprite.body.gravity.y = 300;
    this.sprite.body.collideWorldBounds = true;
    this.sprite.animations.add("left", [0, 1, 2, 3], 10, true);
    this.sprite.animations.add("right", [5, 6, 7, 8], 10, true);

    this.Bullets = new BasicGame.Bullets(this.game);
    this.bulletsGroup = this.Bullets.getBullets();

  },

  update: function () {
    //this.sprite.body.velocity.x = 0;

    if (this.keys.leftKey.isDown) {
      this.sprite.body.x -= this.speed;
      this.sprite.animations.play("left");
    } else if (this.keys.rightKey.isDown) {
      this.sprite.body.x += this.speed;
      this.sprite.animations.play("right");
    }
    if (this.keys.upKey.isDown) {
      this.sprite.body.y -= this.speed;
      this.sprite.animations.stop();
    } else if (this.keys.downKey.isDown) {
      this.sprite.body.y += this.speed;
      this.sprite.animations.stop();
    } else {
      this.sprite.animations.stop();
      this.sprite.frame = 4;
    }
    // if (this.keys.upKey.isDown && this.sprite.body.touching.down) {
    //   console.log("up");
    //   this.sprite.body.velocity.y = -350;
    // }

    //fire
    if (this.game.input.activePointer.isDown) {
      this.fire();
    }

    //collision of bulletsGroup
    //this.Bullets.checkCollision(this.bulletsGroup);
  },

  createKeys: function () {
    this.keys.leftKey = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
    this.keys.rightKey = this.game.input.keyboard.addKey(Phaser.Keyboard.D);
    this.keys.upKey = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
    this.keys.downKey = this.game.input.keyboard.addKey(Phaser.Keyboard.S);
  },

  incrementScore: function (incScore) {
    this.score += incScore;
  },

  getScore: function () {
    return this.score;
  },

  incrementDamage: function (incDamage) {
    this.damage += incDamage;
  },

  collectStar: function (playerSprite, star) {
    star.kill();
    this.incrementScore(10);
    console.log("star ep:" + star.ep);
  },

  fire: function () {

    if (this.game.time.now > this.nextFire) {
      //  Grab the first bullet we can from the pool
      bullet = this.bulletsGroup.getFirstExists(false);

      if (bullet) {
        //  And fire it
        bullet.reset(this.sprite.x, this.sprite.y);
        this.game.physics.arcade.moveToPointer(bullet, 300);
        this.nextFire = this.game.time.now + 200;
      }
    }

    /*
    if (this.game.time.now > this.nextFire) {
      var bullet = new BasicGame.Bullet(this.game);
      bullet.create();
      this.nextFire = this.game.time.now + this.fireRate;
      this.bulletsGroup.push(bullet);
      this.game.physics.arcade.collide(bullet.sprite, this.game.platforms);
      this.game.physics.arcade.moveToPointer(bullet.sprite, 300);

      bullet.update();
    }
    */

  }
}
BasicGame.Level_1 = function (game) {
  this.game = game;
  this.levelName = "Level 1";
  this.levelNumber = 1;
};
BasicGame.Level_1.prototype = Object.create(BasicGame.Level.prototype);
BasicGame.Level_1.prototype.constructor = BasicGame.Level_1;

BasicGame.Level_1.prototype.preload = function () {

};

BasicGame.Level_1.prototype.create = function () {

  //background
  this.game.add.sprite(0, 0, "sky");

  //platforms
  this.game.platforms = null;
  this.createPlatforms();

  //stars
  this.game.stars = null;
  this.createStars();

  //parent create player, hud etc.
  this.parentCreate();

  //enemy
  var enemySpider = new BasicGame.Enemy_Spider(this.game);
  this.game.enemySpider = enemySpider.create(this.game.player.sprite.x + 100, this.game.player.sprite.y).sprite;

};

BasicGame.Level_1.prototype.update = function () {

  //physics
  this.game.physics.arcade.collide(this.game.player.sprite, this.game.platforms);
  this.game.physics.arcade.collide(this.game.stars, this.game.platforms);
  //collision events
  this.game.physics.arcade.overlap(this.game.player.sprite, this.game.stars, this.game.player.collectStar, null, this.game.player);
  this.game.physics.arcade.overlap(this.game.player.bulletsGroup, this.game.platforms, this.collisionBulletsPlatforms, null, this);
  this.game.physics.arcade.overlap(this.game.player.bulletsGroup, this.game.stars, this.collisionBulletsStars, null, this);
  this.game.physics.arcade.overlap(this.game.player.bulletsGroup, this.game.enemySpider, this.collisionBulletsEnemySpider, null, this);

  this.parentUpdate();

  //track player stats
  //this.game.player.incrementScore(10);
  if (this.game.player.getScore() > 20) {
    this.game.state.start("Level_2");
  }
};

BasicGame.Level_1.prototype.collisionBulletsPlatforms = function (bullet, platform) {
  console.log("platform took " + bullet.damage + "dmg");
  bullet.kill();
};

BasicGame.Level_1.prototype.collisionBulletsStars = function (bullet, star) {
  console.log("star took " + bullet.damage + "dmg");
  console.log("bullet damage increased");
  this.game.player.bulletsGroup.setAll('damage', 1500);
  star.kill();
  bullet.kill();
};

BasicGame.Level_1.prototype.collisionBulletsEnemySpider = function (bullet, enemySpider) {
  console.log(enemySpider.screenName + " took " + bullet.damage + "dmg");
  enemySpider.takeDamage(bullet.damage);
  bullet.kill();
};




BasicGame.Level_1.prototype.createPlatforms = function () {
  //this.game.platforms and ground
  this.game.platforms = this.game.add.group();
  this.game.platforms.enableBody = true;

  var ground = this.game.platforms.create(0, this.game.world.height - 64, "ground");
  ground.scale.setTo(2, 2);
  ground.body.immovable = true;

  var ledge = this.game.platforms.create(400, 400, "ground");
  ledge.body.immovable = true;
  ledge = this.game.platforms.create(-150, 250, "ground");
  ledge.body.immovable = true;
};

BasicGame.Level_1.prototype.createStars = function () {
  this.game.stars = this.game.add.group();
  this.game.stars.enableBody = true;

  for (var i = 0;
       i < 12;
       i++) {
    var star = this.game.stars.create(70 * i, 20, "star");
    this.game.physics.arcade.enable(star);
    star.body.bounce.y = 0.7 + Math.random() * 0.2;
    star.body.gravity.y = 1200;
    star.body.collideWorldBounds = true;
    star.ep = 200;
  }
};

BasicGame.Level_1.prototype.shutdown = function () {
  console.log("shutdown level 1");
};

/*
 create: function(){
 //score

 },
 */
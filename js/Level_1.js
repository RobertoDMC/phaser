BasicGame.Level_1 = function () {
  this.levelName = "Level 1";
  this.sprite = null;
  this.platforms = null;
  this.stars = null;
};
BasicGame.Level_1.prototype = Object.create(BasicGame.Level.prototype);
BasicGame.Level_1.prototype.constructor = BasicGame.Level_1;

BasicGame.Level_1.prototype.preload = function () {
  this.game.load.image("sky", "images/sky.png");
  this.game.load.image("ground", "images/platform.png");
  this.game.load.image("star", "images/star.png");
};

BasicGame.Level_1.prototype.create = function () {

  //background
  this.game.add.sprite(0, 0, "sky");

  //platforms
  this.createPlatforms();

  //stars
  this.createStars();

  //parent create player, hud etc.
  this.parentCreate();

};

BasicGame.Level_1.prototype.update = function () {

  //physics
  this.game.physics.arcade.collide(this.game.player.sprite, this.platforms);
  this.game.physics.arcade.collide(this.stars, this.platforms);
  this.game.physics.arcade.overlap(this.game.player.sprite, this.stars, this.game.player.collectStar, null, this.game.player);

  this.parentUpdate();

  //track player stats
  //this.game.player.incrementScore(10);
  if (this.game.player.getScore() > 20) {
    this.game.state.start("Level_2");
  }
};

BasicGame.Level_1.prototype.createPlatforms = function () {
  //this.platforms and ground
  this.platforms = this.game.add.group();
  this.platforms.enableBody = true;

  var ground = this.platforms.create(0, this.game.world.height - 64, "ground");
  ground.scale.setTo(2, 2);
  ground.body.immovable = true;

  var ledge = this.platforms.create(400, 400, "ground");
  ledge.body.immovable = true;
  ledge = this.platforms.create(-150, 250, "ground");
  ledge.body.immovable = true;
};

BasicGame.Level_1.prototype.createStars = function () {
  this.stars = this.game.add.group();
  this.stars.enableBody = true;

  for (var i = 0;
       i < 12;
       i++) {
    var star = this.stars.create(70 * i, 20, "star");
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
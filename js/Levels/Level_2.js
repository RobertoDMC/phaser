BasicGame.Level_2 = function (game) {
  this.game = game;
  this.levelName = "Level 2";
  this.levelNumber = 2;
  this.enemy = null;
};
BasicGame.Level_2.prototype = Object.create(BasicGame.Level.prototype);
BasicGame.Level_2.prototype.constructor = BasicGame.Level_2;

BasicGame.Level_2.prototype.preload = function () {
  this.game.showPreloadBar(this);
  this.load.image('preloaderBackground', 'images/preloader_background.jpg');
};

BasicGame.Level_2.prototype.create = function () {

  this.parentCreate();

};

BasicGame.Level_2.prototype.update = function () {

  this.parentUpdate();

  //physics
  //collision
  this.game.physics.arcade.overlap(this.game.player, this.enemiesGroup, this.playerTouchingEnemy, null, this);
  this.game.physics.arcade.overlap(this.enemiesGroup, this.mapLayerFloorAndWalls, this.enemyTouchingTile, null, this);
  this.game.physics.arcade.overlap(this.enemiesGroup, this.mapLayerObstacles, this.enemyTouchingTile, null, this);
  this.game.physics.arcade.overlap(this.game.player.bulletsGroup, this.enemiesGroup, this.playerBulletTouchingEnemy, null, this);
  this.game.physics.arcade.overlap(this.game.player.bulletsGroup, this.mapLayerFloorAndWalls, this.playerBulletTouchingTile, null, this);
  this.game.physics.arcade.overlap(this.game.player.bulletsGroup, this.mapLayerObstacles, this.playerBulletTouchingTile, null, this);
  this.game.physics.arcade.collide(this.game.player, this.mapLayerFloorAndWalls);
  this.game.physics.arcade.collide(this.game.player, this.mapLayerObstacles);

  //TODO: camera how to exactly?
  //this.game.camera.follow(this.game.player.sprite, Phaser.Camera.FOLLOW_TOPDOWN);

};

BasicGame.Level_2.prototype.playerBulletTouchingTile = function(bullet, tile){
  bullet.kill();
  console.log("bullet touching tile!!");
};

BasicGame.Level_2.prototype.enemyTouchingTile = function(enemy, tile){
  enemy.movementAnimationRunning = false;
  console.log("enemy touching tile!!");
};

BasicGame.Level_2.prototype.shutdown = function () {
  console.log("shutdown level 2");
};
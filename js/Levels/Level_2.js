BasicGame.Level_2 = function(game){
  this.game = game;
  this.levelName =  "Level 2";
  this.levelNumber = 2;
};
BasicGame.Level_2.prototype = Object.create(BasicGame.Level.prototype);
BasicGame.Level_2.prototype.constructor = BasicGame.Level_2;

BasicGame.Level_2.prototype.preload = function(){
  this.game.showPreloadBar(this);
  this.load.image('preloaderBackground', 'images/preloader_background.jpg');
};

BasicGame.Level_2.prototype.create = function(){
  this.parentCreate();

  //enemies
  this.createEnemies();

};

BasicGame.Level_2.prototype.update = function(){

  //physics
  //this.game.physics.arcade.collide(this.game.player.sprite, this.enemiesGroup);
  //collision events
  this.game.physics.arcade.overlap(this.game.player.sprite, this.enemiesGroup, this.playerTouchingEnemy, null, this);

  this.parentUpdate();

  /*
  this.game.player.incrementScore(10);
  if(this.game.player.getScore() > 2000){
    this.game.state.start("MainMenu");
  }
  */
};

BasicGame.Level_2.prototype.shutdown= function() {
  console.log("shutdown level 2");
};

BasicGame.Level_2.prototype.playerTouchingEnemy = function() {
  console.log("playerTouchingEnemy!");
};



/*
 create: function(){
 //score

 },
 */
BasicGame.Level_2 = function(game){
  this.game = game;
  this.levelName =  "Level 2";
};
BasicGame.Level_2.prototype = Object.create(BasicGame.Level.prototype);
BasicGame.Level_2.prototype.constructor = BasicGame.Level_2;

BasicGame.Level_2.prototype.preload = function(){
};

BasicGame.Level_2.prototype.create = function(){
  this.parentCreate();
  //var spider = new BasicGame.Enemy_Spider(this.game);
  //spider.create(20, 20);

  var enemyClassName = "Enemy_Spider";
  var enemy = new BasicGame[enemyClassName](this.game, -120, -120);
  enemy.anchor.setTo(0.5, 0.5);
  enemy.x = 100;
  enemy.y = 100;
  this.game.add.existing(enemy);

  var enemyClassName = "Enemy_Skeleton";
  var enemy = new BasicGame[enemyClassName](this.game, -120, -120);
  enemy.anchor.setTo(0.5, 0.5);
  enemy.x = 200;
  enemy.y = 200;
  this.game.add.existing(enemy);

};

BasicGame.Level_2.prototype.update = function(){
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

/*
 create: function(){
 //score

 },
 */
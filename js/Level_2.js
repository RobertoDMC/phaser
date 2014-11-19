BasicGame.Level_2 = function(){
  this.levelName =  "Level 2";
};
BasicGame.Level_2.prototype = Object.create(BasicGame.Level.prototype);
BasicGame.Level_2.prototype.constructor = BasicGame.Level_2;

BasicGame.Level_2.prototype.preload = function(){
};

BasicGame.Level_2.prototype.create = function(){
  this.parentCreate();
};

BasicGame.Level_2.prototype.update = function(){
  this.parentUpdate();

  this.game.player.incrementScore(10);
  if(this.game.player.getScore() > 2000){
    this.game.state.start("MainMenu");
  }
};

BasicGame.Level_2.prototype.shutdown= function() {
  console.log("shutdown level 2");
};

/*
 create: function(){
 //score

 },
 */
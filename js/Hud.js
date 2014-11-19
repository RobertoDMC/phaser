BasicGame.Hud = function(game){
  this.game = game;
  this.scoreLabel = null;
  this.levelLabel = null;
  this.levelName = null;
};

BasicGame.Hud.prototype = {

  preload: function(){
  },

  create: function(){
    //score
    this.scoreLabel = this.game.add.text(16, 16, "", {fontSize: "32px", fill: "#333333"});
    this.levelLabel = this.game.add.text(16, 40, this.levelName, {fontSize: "32px", fill: "#333333"});
  },

  update: function(){
    this.scoreLabel.text = "Score: " + this.game.player.getScore();
  },

  setLevelName: function(name){
    this.levelName = name;
  }
}
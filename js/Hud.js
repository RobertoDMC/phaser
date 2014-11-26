BasicGame.Hud = function(game){
  this.game = game;
  this.levelLabel = null;
  this.levelName = null;
  this.playerLevelLabel = null;
  this.playerXpLabel = null;
  this.playerNextXpLabel = null;
  this.font = {font: "12px Arial", fill: "#FFFFFF"};
};

BasicGame.Hud.prototype.preload = function(){
};

BasicGame.Hud.prototype.create =function(){
  console.log(this.fontSize);
  //level
  this.levelLabel = this.game.add.text(6, 10, this.levelName, this.font);
  this.playerLevelLabel = this.game.add.text(6, 30, "" + this.game.player.xpSystem.level, this.font);
  this.playerXpLabel = this.game.add.text(6, 50, " " + this.game.player.xpSystem.xp + " / " + this.game.player.xpSystem.calculateNextLevelUpExperience(), this.font);
};

BasicGame.Hud.prototype.update =function() {
  //player
  this.playerLevelLabel.text = "Player level: " + this.game.player.xpSystem.level;
  this.playerXpLabel.text = "XP: " + this.game.player.xpSystem.xp + " / " + this.game.player.xpSystem.nextLevelUpExperience;
};


BasicGame.Hud.prototype.setLevelName = function(name){
  this.levelName = name;
};

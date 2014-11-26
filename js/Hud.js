BasicGame.Hud = function(game){
  this.game = game;
  this.levelLabel = null;
  this.levelName = null;
  this.playerLevelLabel = null;
  this.playerXpLabel = null;
  this.playerXpBarNextLevel = null; //underlays current xp points and shows max
  this.playerXpBarNextLevelWidth = 100;
  this.playerXpBarNextLevelColor = 0xDDDDDD;
  this.playerXpBarShape = null; //shows current xp points
  this.playerXpBarHeight =5;
  this.playerXpBarColor = 0x0000FF;
  this.playerNextXpLabel = null;
  this.font = {font: "12px Arial", fill: "#FFFFFF"};
};

BasicGame.Hud.prototype.preload = function(){
};

BasicGame.Hud.prototype.create =function(){


  //level
  this.levelLabel = this.game.add.text(6, 10, this.levelName, this.font);

  //player
  this.playerLevelLabel = this.game.add.text(6, 30, "" + this.game.player.xpSystem.level, this.font);
  this.playerXpLabel = this.game.add.text(6, 50, " " + this.game.player.xpSystem.xp + " / " + this.game.player.xpSystem.nextLevelUpExperience, this.font);

  //xp bars
  this.playerXpBarNextLevel = this.game.add.graphics(0, 0);
  this.playerXpBarNextLevel.beginFill(this.playerXpBarNextLevelColor, 1);
  this.playerXpBarNextLevel.drawRect(5, 80, this.playerXpBarNextLevelWidth, this.playerXpBarHeight); // (x, y, w, h)

};

BasicGame.Hud.prototype.update =function() {
  //player
  this.playerLevelLabel.text = "Player level: " + this.game.player.xpSystem.level;
  this.playerXpLabel.text = "XP: " + this.game.player.xpSystem.xp + " / " + this.game.player.xpSystem.nextLevelUpExperience;

  //xp bar
  if(this.playerXpBarShape){
    this.playerXpBarShape.destroy();
  }

  var xpBarWidth = Math.floor(this.game.player.xpSystem.lastDeltaXp  * this.playerXpBarNextLevelWidth / this.game.player.xpSystem.lastDeltaNextXp);
  if(xpBarWidth < 0){
    xpBarWidth = 0;
  }
  if(xpBarWidth > this.playerXpBarNextLevelWidth){
    xpBarWidth = this.playerXpBarNextLevelWidth;
  }
  this.playerXpBarShape = this.game.add.graphics(0, 0);
  this.playerXpBarShape.beginFill(this.playerXpBarColor, 1);
  this.playerXpBarShape.drawRect(5, 80, xpBarWidth, this.playerXpBarHeight); // (x, y, w, h)
};


BasicGame.Hud.prototype.setLevelName = function(name){
  this.levelName = name;
};

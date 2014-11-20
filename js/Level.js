BasicGame.Level = function(){
  this.game = null;
};

BasicGame.Level.prototype = {

  parentPreload: function(){
  },

  parentCreate: function(){
    //player
    this.game.player.create();

    //hud
    this.game.hud.setLevelName(this.levelName);
    this.game.hud.create();
  },

  parentUpdate: function(){
    this.game.player.update();
    this.game.hud.update();
  }
}
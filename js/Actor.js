BasicGame.Actor = function(game, x, y, imageRef){
  this.game = game;
  this.health = 0;
  Phaser.Sprite.call(this, this.game, x, y, imageRef);
  this.game.physics.arcade.enable(this);
};

BasicGame.Actor.prototype = Object.create(Phaser.Sprite.prototype);
BasicGame.Actor.prototype.constructor = BasicGame.Actor;

BasicGame.Actor.prototype.parentPreload = function(){
};

BasicGame.Actor.prototype.parentCreate = function(){
};

BasicGame.Actor.prototype.parentUpdate = function(){
  if(this.health <= 0){
    this.destroy();
  }
};
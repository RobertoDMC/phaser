BasicGame.Enemy_Spider = function (game, x, y) {
  this.game = game;
  BasicGame.Actor.call(this, this.game, x, y, 'enemy-spider');

  this.screenName = "Spider";
  this.movementTpye = this.game.ACTOR_MOVEMENT_TYPE_RANDOM;
  this.minMovementDistanceX = 100;
  this.maxMovementDistanceY = 50;
  this.movementSpeed = 0.1;
  this.health = 100; //automatic phaser health system. this.damage() for damage => kill() automatically
  this.body.width = 100;
  this.body.height = 100;

};
BasicGame.Enemy_Spider.prototype = Object.create(BasicGame.Actor.prototype);
BasicGame.Enemy_Spider.prototype.constructor = BasicGame.Enemy_Spider;

BasicGame.Enemy_Spider.prototype.update = function () {
  //this.damage(1);
  this.game.debug.body(this);
  this.move();

  //console.log(this.screenName + " health: " + this.health);
  this.parentUpdate();
};
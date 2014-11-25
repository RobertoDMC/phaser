BasicGame.Enemy_Spider = function (game, x, y) {
  this.game = game;
  this.screenName = "Spider";
  this.maxHealth = 1000;

  BasicGame.Actor.call(this, this.game, x, y, 'enemy-spider');

  this.parentCreate();

  this.movementType = this.game.ACTOR_MOVEMENT_TYPE_RANDOM;
  this.minMovementDistanceX = 200;
  this.maxMovementDistanceY = 50;
  this.movementSpeed = 0.1;
  this.body.width = 100;
  this.body.height = 100;
  this.aggroRange = 300;
  this.damage = 10;
};
BasicGame.Enemy_Spider.prototype = Object.create(BasicGame.Actor.prototype);
BasicGame.Enemy_Spider.prototype.constructor = BasicGame.Enemy_Spider;

BasicGame.Enemy_Spider.prototype.update = function () {
  this.drawHealthBar(0xFF0000);
  //this.move();
  this.parentUpdate();
};
BasicGame.Enemy_Skeleton = function (game, x, y) {
  this.game = game;
  this.screenName = "Skeleton";
  this.maxHealth = 100;

  BasicGame.Actor.call(this, this.game, x, y, 'enemy-skeleton');

  this.parentCreate();

  this.movementType = this.game.ACTOR_MOVEMENT_TYPE_RANDOM;
  this.minMovementDistanceX = 200;
  this.maxMovementDistanceY = 50;
  this.movementSpeed = 0.1;
  this.aggroRange = 300;
  this.damage = 1;
  this.isEnemy = true;
  this.givesXP = 105;
};
BasicGame.Enemy_Skeleton.prototype = Object.create(BasicGame.Actor.prototype);
BasicGame.Enemy_Skeleton.prototype.constructor = BasicGame.Enemy_Skeleton;

BasicGame.Enemy_Skeleton.prototype.update = function () {
  this.drawHealthBar(0xFF0000);
  this.move();
  this.parentUpdate();
};
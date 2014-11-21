BasicGame.Enemy_Spider = function (game, x, y) {
  this.game = game;
  BasicGame.Actor.call(this, this.game, x, y, 'enemy-spider');

  this.screenName = "Spider";
  this.movementTpye = this.game.ACTOR_MOVEMENT_TYPE_RANDOM;
  this.maxMovementDistance = 400;
  this.movementSpeed = 3000;
  this.health = 100; //automatic phaser health system. this.damage() for damage => kill() automatically

};
BasicGame.Enemy_Spider.prototype = Object.create(BasicGame.Actor.prototype);
BasicGame.Enemy_Spider.prototype.constructor = BasicGame.Enemy_Spider;

BasicGame.Enemy_Spider.prototype.preload = function () {

};

BasicGame.Enemy_Spider.prototype.create = function (x, y) {
};

BasicGame.Enemy_Spider.prototype.update = function () {
  //this.damage(1);
  this.move();

  //console.log(this.screenName + " health: " + this.health);
  this.parentUpdate();
};
BasicGame.Enemy_Spider = function (game, x, y) {
  this.game = game;
  this.screenName = "Spider";

  BasicGame.Actor.call(this, this.game, x, y, 'enemy-spider');
  this.health = 100; //automatic phaser healt system. this.damage() for damage => kill() automatically

};
BasicGame.Enemy_Spider.prototype = Object.create(BasicGame.Actor.prototype);
BasicGame.Enemy_Spider.prototype.constructor = BasicGame.Enemy_Spider;

BasicGame.Enemy_Spider.prototype.preload = function () {

};

BasicGame.Enemy_Spider.prototype.create = function (x, y) {
};

BasicGame.Enemy_Spider.prototype.update = function () {
  this.damage(1);
  console.log(this.screenName + " health: " + this.health);
  this.parentUpdate();
};
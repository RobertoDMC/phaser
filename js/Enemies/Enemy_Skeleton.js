BasicGame.Enemy_Skeleton = function (game, x, y) {
  this.game = game;
  this.screenName = "Skeleton";

  BasicGame.Actor.call(this, this.game, x, y, 'enemy-skeleton');
  this.health = 100; //automatic phaser healt system. this.damage() for damage => kill() automatically

};
BasicGame.Enemy_Skeleton.prototype = Object.create(BasicGame.Actor.prototype);
BasicGame.Enemy_Skeleton.prototype.constructor = BasicGame.Enemy_Skeleton;

BasicGame.Enemy_Skeleton.prototype.preload = function () {
};

BasicGame.Enemy_Skeleton.prototype.create = function (x, y) {
};

BasicGame.Enemy_Skeleton.prototype.update = function () {
  //this.damage(1);
  this.x += 5;
  //console.log(this.screenName + " health: " + this.health);
  this.parentUpdate();
};
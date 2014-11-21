BasicGame.Actor = function(game, x, y, imageRef){
  this.game = game;
  this.health = 0;
  Phaser.Sprite.call(this, this.game, x, y, imageRef);
  this.game.physics.arcade.enable(this);
  this.movementAnimationRunning = false;
  this.movementType = null;
  this.maxMovementDistance = null;
  this.movementSpeed = null;
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

BasicGame.Actor.prototype.move = function(){
  if(!this.movementAnimationRunning){
    var randomMovementDistance = Math.random() * this.maxMovementDistance + 100;
    var moveToX = this.x;
    var movementTime = this.movementSpeed / 1000 * randomMovementDistance;
    console.log("randomMovementDistance " + randomMovementDistance);
    console.log("movementTime " + movementTime);

    if(Math.random() < 0.5){
      moveToX -= randomMovementDistance;
      if(moveToX < 0){
        console.log("left bound");
        moveToX = 0;
      }
    }else{
      moveToX += randomMovementDistance;
      if(moveToX > this.game.world.width){
        moveToX = this.game.world.width;
      }
    }

    this.movementAnimationRunning = true;

    var movementTween = this.game.add.tween(this).to({ x: moveToX }, movementTime, Phaser.Easing.Linear.None, true);
    movementTween.onComplete.addOnce(this.tweenMovementEnd, this);
  }
};

BasicGame.Actor.prototype.tweenMovementEnd = function() {
  this.movementAnimationRunning = false;
  this.move();
  console.log("tween end");
};






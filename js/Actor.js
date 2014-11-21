BasicGame.Actor = function(game, x, y, imageRef){
  this.game = game;
  this.health = 0;
  Phaser.Sprite.call(this, this.game, x, y, imageRef);
  this.game.physics.arcade.enable(this);
  this.movementAnimationRunning = false;
  this.movementType = null;
  this.minMovementDistanceX = null;
  this.maxMovementDistanceY = null;
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
    var randomMovementDistanceX = (Math.random() + 1) * this.minMovementDistanceX + 100;
    var randomMovementDistanceY = Math.random() * this.maxMovementDistanceY;
    var moveToX = this.x;
    var moveToY = this.y;
    var movementTime = randomMovementDistanceX / this.movementSpeed;
    
    console.log(this.width);

    if(Math.random() < 0.5){
      moveToX -= randomMovementDistanceX;
      moveToY -= randomMovementDistanceY;
      if(moveToX < 0){
        console.log("x < 0");
        moveToX =  this.width;
      }
      if(moveToY < 0){
        console.log("y < 0");
        moveToY =  this.height;
      }
    }else{
      moveToX += randomMovementDistanceX;
      moveToY += randomMovementDistanceY;
      if(moveToX > this.game.world.width){
        moveToX = this.game.world.width - this.width;
      }
      if(moveToY > this.game.world.height){
        moveToY = this.game.world.height - this.height;
      }
    }

    this.movementAnimationRunning = true;

    var movementTween = this.game.add.tween(this).to({ x: moveToX, y: moveToY }, movementTime, Phaser.Easing.Linear.None, true);
    movementTween.onComplete.addOnce(this.tweenMovementEnd, this);
  }
};

BasicGame.Actor.prototype.tweenMovementEnd = function() {
  this.movementAnimationRunning = false;
  this.move();
  console.log("tween end");
};






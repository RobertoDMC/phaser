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
  this.moveRightNextTick = false;
  this.moveDownNextTick = false;
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
    var moveLeft = false;
    var moveUp = false;

    if(Math.random() < 0.5){
      moveLeft = true;
    }
    if(Math.random() < 0.5){
      moveUp = true;
    }

    if(moveLeft && !this.moveRightNextTick){
      moveToX -= randomMovementDistanceX;
      if(moveToX < 0){
        moveToX = this.body.width;
        this.moveRightNextTick = true;
      }
    }else{
      moveToX += randomMovementDistanceX;
      this.moveRightNextTick = false;
      if(moveToX > this.game.world.width){
        moveToX = this.game.world.width - this.body.width;
      }
    }

    if(moveUp && !this.moveDownNextTick){
      moveToY -= randomMovementDistanceY;
      if(moveToY < 0){
        moveToY =  this.body.height;
        this.moveDownNextTick = true;
      }
    }else{
      moveToY += randomMovementDistanceY;
      this.moveDownNextTick = false;
      if(moveToY > this.game.world.height){
        moveToY = this.game.world.height - this.body.height;
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






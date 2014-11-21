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
  this.movementTween = null;
  this.isAggro = false; //e.g. if a player is in range
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
  
  var distanceToPlayer = this.game.physics.arcade.distanceBetween(this, this.game.player.sprite);
  var movementSpeed = this.movementSpeed;
  if(distanceToPlayer < 300 && !this.isAggro){
    this.isAggro = true;
    movementSpeed *= 3;
    this.movementTween.stop();
    this.movementAnimationRunning = false;
  }else if(distanceToPlayer > 300){
    this.isAggro = false;
  }
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

    if(this.isAggro){
      moveToX = this.game.player.sprite.x;
      moveToY = this.game.player.sprite.y;
    }else {
      if (moveLeft && !this.moveRightNextTick) {
        moveToX -= randomMovementDistanceX;
        if (moveToX < 0) {
          console.log("moveToX < 0");
          moveToX = this.body.width / 2;
          this.moveRightNextTick = true;
        }
      } else {
        moveToX += randomMovementDistanceX;
        this.moveRightNextTick = false;
        if (moveToX > this.game.world.width) {
          console.log("moveToX > world");
          moveToX = this.game.world.width - this.body.width / 2;
        }
      }

      if (moveUp && !this.moveDownNextTick) {
        moveToY -= randomMovementDistanceY;
        if (moveToY < 0) {
          console.log("moveToY < 0");
          moveToY = this.body.height / 2;
          this.moveDownNextTick = true;
        }
      } else {
        moveToY += randomMovementDistanceY;
        this.moveDownNextTick = false;
        if (moveToY > this.game.world.height) {
          console.log("moveToY > world");
          moveToY = this.game.world.height - this.body.height / 2;
        }
      }
    }

    this.movementAnimationRunning = true;

    this.movementTween = this.game.add.tween(this).to({ x: moveToX, y: moveToY }, movementTime, Phaser.Easing.Linear.None, true);
    this.movementTween.onComplete.addOnce(this.tweenMovementEnd, this);
  }
};

BasicGame.Actor.prototype.tweenMovementEnd = function() {
  this.movementAnimationRunning = false;
  this.move();
  console.log("tween end");
};






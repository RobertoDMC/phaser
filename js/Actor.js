BasicGame.Actor = function(game, x, y, imageRef){
  this.game = game;
  this.health = 0;

  Phaser.Sprite.call(this, this.game, x, y, imageRef);

  this.game.physics.arcade.enable(this);
  this.anchor.setTo(0.5, 0.5);
  this.movementAnimationRunning = false;
  this.movementType = null;
  this.minMovementDistanceX = null;
  this.maxMovementDistanceY = null;
  this.movementSpeed = null;
  this.moveRightNextTick = false;
  this.moveDownNextTick = false;
  this.movementTween = null;
  this.isAggro = false; //e.g. if a player is in range
  this.aggroRange = null;
  this.healthBarShape = null;
  this.isEnemy = null;
  this.givesXP = null;
};

BasicGame.Actor.prototype = Object.create(Phaser.Sprite.prototype);
BasicGame.Actor.prototype.constructor = BasicGame.Actor;

BasicGame.Actor.prototype.parentPreload = function(){
};

BasicGame.Actor.prototype.parentCreate = function(){
  this.health = this.maxHealth;
  console.log(this.screenName + " created");
};

BasicGame.Actor.prototype.parentUpdate = function(){
  this.game.debug.body(this);
};

BasicGame.Actor.prototype.move = function(){

  var distanceToPlayer = this.game.physics.arcade.distanceBetween(this, this.game.player);
  var movementSpeed = this.movementSpeed;
  if(distanceToPlayer < this.aggroRange && !this.isAggro){
    this.isAggro = true;
    if(this.movementTween) {
      this.movementTween.stop();
    }
    this.movementAnimationRunning = false;
  }else if(distanceToPlayer > this.aggroRange){
    this.isAggro = false;
  }
  if(this.isAggro) {
    movementSpeed *= 1.5;
  }
  if(!this.movementAnimationRunning){
    var randomMovementDistanceX = (Math.random() + 1) * this.minMovementDistanceX;
    var randomMovementDistanceY = Math.random() * this.maxMovementDistanceY;
    var moveToX = this.x;
    var moveToY = this.y;
    var movementTime = randomMovementDistanceX / movementSpeed;
    var moveLeft = false;
    var moveUp = false;

    if(Math.random() < 0.5){
      moveLeft = true;
    }
    if(Math.random() < 0.5){
      moveUp = true;
    }

    if(this.isAggro){
      moveToX = this.game.player.x;
      moveToY = this.game.player.y;
    }else {
      if (moveLeft && !this.moveRightNextTick) {
        moveToX -= randomMovementDistanceX;
        if (moveToX < 0) {
          console.log("moveToX < 0");
          moveToX = this.body.width / 2;
          console.log("moving to " + moveToX);
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

    this.movementTween = this.game.add.tween(this.body).to({ x: moveToX, y: moveToY }, movementTime, Phaser.Easing.Linear.None, true);
    this.movementTween.onComplete.addOnce(this.tweenMovementEnd, this);
  }
};

BasicGame.Actor.prototype.tweenMovementEnd = function() {
  this.movementAnimationRunning = false;
  if(this.body) {
    this.move();
  }
  console.log("tween end");
};

BasicGame.Actor.prototype.drawHealthBar = function (color) {
  if(!color){
    color = 0xFFFF0B;
  }
  if(this.healthBarShape || this.health <= 0) {
    this.healthBarShape.destroy();
  }
  var healthBarShapeWidth = this.health * this.width / this.maxHealth;
  this.healthBarShape = this.game.add.graphics(0, 0);  //init rect

  //shape.lineStyle(2, 0x0000FF, 1);
  this.healthBarShape.beginFill(color, 1);
  this.healthBarShape.drawRect(this.x - healthBarShapeWidth / 2, this.y - this.height - 10, healthBarShapeWidth, 6); // (x, y, w, h)
};

BasicGame.Actor.prototype.receiveDamage = function(damage) {
  this.health -= damage;

  if(this.health <= 0){
    if(this.isEnemy){
      this.game.player.xpSystem.addXp(this.givesXP);
    }
    console.log("dead!");
    this.destroy();
    this.healthBarShape.destroy();
  }
};

BasicGame.Actor.prototype.fire = function () {

  if (this.game.time.now > this.nextFire) {
    //  Grab the first bullet we can from the pool
    var bullet = this.bulletsGroup.getFirstExists(false);

    if (bullet) {
      //  And fire it
      bullet.reset(this.x, this.y - bullet.height);
      this.game.physics.arcade.moveToPointer(bullet, 300);
      this.nextFire = this.game.time.now + 200;
    }
  }

};






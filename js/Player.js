BasicGame.Player = function(game){
  this.game = game;
  this.sprite = null;
  this.cursors = null;
  this.score = 0;
  this.cursors = 0;

};

BasicGame.Player.prototype = {

  preload: function(){
    this.game.load.spritesheet("dude", "images/dude.png", 32, 48);
  },

  create: function(){

    //keyboard input
    this.cursors = this.game.input.keyboard.createCursorKeys();

    //sprite
    this.sprite = this.game.add.sprite(32, this.game.world.height - 130, "dude");
    this.game.physics.arcade.enable(this.sprite);
    this.sprite.body.bounce.y = 0.2;
    this.sprite.body.gravity.y = 300;
    this.sprite.body.collideWorldBounds = true;
    this.sprite.animations.add("left", [0,1,2,3], 10, true);
    this.sprite.animations.add("right", [5,6,7,8], 10, true);
  },

  update: function(){
    this.sprite.body.velocity.x = 0;

    if(this.cursors.left.isDown){
      this.sprite.body.velocity.x = -150;
      this.sprite.animations.play("left");
    }else if(this.cursors.right.isDown){
      this.sprite.body.velocity.x = 150;
      this.sprite.animations.play("right");
    }else{
      this.sprite.animations.stop();
      this.sprite.frame = 4;
    }
    if(this.cursors.up.isDown && this.sprite.body.touching.down){
      console.log("up");
      this.sprite.body.velocity.y = -350;
    }
  },

  incrementScore: function (incScore){
    this.score += incScore;
  },

  getScore: function(){
    return this.score;
  },

  collectStar: function(playerSprite, star){
    star.kill();
    this.incrementScore(10);
    console.log("star ep:" + star.ep);
  }
}
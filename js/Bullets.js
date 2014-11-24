BasicGame.Bullets = function(game){
  this.game = game;
};

BasicGame.Bullets.prototype = {

  getBullets: function(count){
    var bullets = this.game.add.group();
    bullets.enableBody = true;
    bullets.createMultiple(count, 'bullet');
    bullets.setAll('anchor.x', 0.5);
    bullets.setAll('anchor.y', 0.5);
    bullets.setAll('checkWorldBounds', true);
    bullets.setAll('outOfBoundsKill', true);
    bullets.setAll('damage', 10);

    return bullets;
  },

  getSpecialBullets: function(){
    var bullets = this.game.add.group();
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;
    bullets.createMultiple(30, 'specialBullet');
    bullets.setAll('anchor.x', 0.5);
    bullets.setAll('anchor.y', 1);
    bullets.setAll('outOfBoundsKill', true);
    bullets.setAll('checkWorldBounds', true);

    return bullets;
  }

}
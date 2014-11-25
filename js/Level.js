BasicGame.Level = function () {
  //this constructor gets overwritten and properties are never set!!!
  //properties must be set in parentCreate()
};

BasicGame.Level.prototype.parentPreload = function () {
  this.game.showPreloadBar(this);
};

BasicGame.Level.prototype.parentCreate = function () {

  //init
  this.chosenEnemies = Array();
  this.enemiesGroup = Array();
  //this.map = null;
  //this.mapLayer = null;

  //hide preloader
  this.game.hidePreloadBar(this);

  //create map
  //all these properties must be set by the .json files properties
  this.map = this.game.add.tilemap("map"); // Preloaded tilemap
  this.map.addTilesetImage("map_tileset"); // Preloaded tileset
  this.mapLayer = this.map.createLayer("Tile Layer 1"); // This is the default name of the first layer in Tiled
  //this.mapLayer.debug = true;
  this.map.setCollisionBetween(1, 4, true, this.mapLayer); // If you use 'collide' function with the layer, then the tiles from the first (ID 0) tile till the 100th element will collide with the other sprite
  this.mapLayer.resizeWorld(); // Sets the world size to match the size of this layer.
  //map.setTileIndexCallback(255, this.awesomeEvent, this); // event if touching tile id 255


  //create player
  this.game.player = new BasicGame.Player(this.game, 150, 150);
  this.game.player.create();

  //create enemies
  this.createEnemies();

  //hud
  this.game.hud.setLevelName(this.levelName);
  this.game.hud.create();
};

BasicGame.Level.prototype.parentUpdate = function () {
  this.game.player.update();
  this.game.hud.update();


};

BasicGame.Level.prototype.createEnemies = function () {
  this.setChosenEnemies();

  var arEnemiesClassNames = this.getChosenEnemies();
  var coordinateVal = 0; //TODO: random placement

  this.enemiesGroup = this.game.add.group();
  this.enemiesGroup.enableBody = true;

  for (var i = 0; i < arEnemiesClassNames.length; i++) {
    var enemyClassName = arEnemiesClassNames[i];
    console.log(enemyClassName);
    coordinateVal += 300;
    var enemy = new BasicGame[enemyClassName](this.game, -120, -120);
    enemy.anchor.setTo(0.5, 0.5);
    enemy.x = coordinateVal;
    enemy.y = coordinateVal;
    enemy.body.collideWorldBounds = true;
    this.enemiesGroup.add(enemy);
  }
  this.game.add.enemiesGroup;

};

BasicGame.Level.prototype.setChosenEnemies = function () {
  this.chosenEnemies.push("Enemy_Spider");
  this.chosenEnemies.push("Enemy_Spider");
  this.chosenEnemies.push("Enemy_Skeleton");
};

BasicGame.Level.prototype.getChosenEnemies = function () {
  return this.chosenEnemies;
};

BasicGame.Level.prototype.playerBulletTouchingEnemy = function (bullet, enemy) {
  enemy.receiveDamage(50);
  bullet.kill();
  console.log("playerBulletTouchingEnemy!");
};

BasicGame.Level.prototype.playerTouchingEnemy = function (player, enemy) {
  player.receiveDamage(enemy.damage);
  console.log("playerTouchingEnemy!");
};



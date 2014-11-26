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
  this.mapLayerFloorAndWalls = null;

  //hide preloader
  this.game.hidePreloadBar(this);

  //create map
  //all these properties must be set by the .json files properties
  this.map = this.game.add.tilemap("map");
  //tilesets
  this.map.addTilesetImage("dungeon_tileset");
  this.map.addTilesetImage("objects_tilset");
  //layers
  this.mapLayerFloorAndWalls = this.map.createLayer("floor_and_walls");
  this.mapLayerDoors = this.map.createLayer("doors");
  this.mapLayerWallInventory = this.map.createLayer("wallinventory");
  this.mapLayerObstaclesShadows = this.map.createLayer("obstacles_shadows");
  this.mapLayerObstacles = this.map.createLayer("obstacles");
  this.map.setCollisionBetween(9, 88, true, this.mapLayerFloorAndWalls);
  this.map.setCollision(Array(91, 198), true, this.mapLayerObstacles); //TODO: look at level2.json and Tiler => where do those ids come from?


  //this.mapLayerObstacles.debug = true;
  //map.setTileIndexCallback(255, this.awesomeEvent, this); // event if touching tile id 255


  //create player
  this.game.player = new BasicGame.Player(this.game, 90, 160);
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
    coordinateVal += 350;
    var enemy = new BasicGame[enemyClassName](this.game, -120, -120);
    enemy.anchor.setTo(0.5, 0.5);
    enemy.x = coordinateVal;
    enemy.y = coordinateVal / 2;
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



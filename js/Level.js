BasicGame.Level = function () {
  //this constructor gets overwritten and properties are never set!!!
  //properties must be set in parentCreate()
};

BasicGame.Level.prototype.parentPreload = function () {
  this.game.showPreloadBar(this);
};

BasicGame.Level.prototype.parentCreate = function () {

  this.chosenEnemies = Array();
  this.enemiesGroup = Array();

  this.game.hidePreloadBar(this);

  //player
  this.game.player = new BasicGame.Player(this.game, 100, 400);
  this.game.player.create();

  //enemies
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
    coordinateVal += 200;
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



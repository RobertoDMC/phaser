BasicGame.Level = function(){
};

BasicGame.Level.prototype = {
  game: null,
  levelNumber: null, //use e.g. for determine random enemy choosing
  chosenEnemies: Array(),
  enemiesGroup: null,

  parentPreload: function(){
  },

  parentCreate: function(){
    //player
    this.game.player.create();

    //hud
    this.game.hud.setLevelName(this.levelName);
    this.game.hud.create();

  },

  parentUpdate: function(){
    this.game.player.update();
    this.game.hud.update();
  },

  createEnemies: function(){
    this.setChosenEnemies();

    var arEnemiesClassNames = this.getChosenEnemies();
    this.enemiesGroup = this.game.add.group();
    this.enemiesGroup.enableBody = true;

    j = 0;
    for (var i=0; i<arEnemiesClassNames.length; i++) {
      var enemyClassName = arEnemiesClassNames[i];
      console.log(enemyClassName);
      j+= 200;
      var enemy = new BasicGame[enemyClassName](this.game, -120, -120);
      enemy.anchor.setTo(0.5, 0.5);
      enemy.x = j;
      enemy.y = j;
      enemy.body.collideWorldBounds = true;
      this.enemiesGroup.add(enemy);
      //this.game.add.existing(enemy);
    }

  },

  setChosenEnemies: function(){
    this.chosenEnemies.push("Enemy_Spider");
    this.chosenEnemies.push("Enemy_Spider");
    this.chosenEnemies.push("Enemy_Skeleton");
  },

  getChosenEnemies: function(){
    return this.chosenEnemies;
  }
}
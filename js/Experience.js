BasicGame.Experience = function (player) {

  this.player = player;
  this.currentLevel = 0;
  this.level = 1; //player level
  this.xp = 0;
  this.nextLevelUpExperience = null;
};

BasicGame.Experience.prototype.update = function(){
  this.calculateNextLevelUpExperience();

  if(this.xp > this.nextLevelUpExperience){
    this.level += 1;
  }

};

BasicGame.Experience.prototype.calculateNextLevelUpExperience = function(){

  var a=0;
  for(var x=1; x < this.level + 1; x++) {
    this.nextLevelUpExperience += Math.floor(x+300*Math.pow(2, (x/7)));
  }
  this.nextLevelUpExperience = Math.floor(this.nextLevelUpExperience / 4);

  return this.nextLevelUpExperience;
};

BasicGame.Experience.prototype.addXp = function(amount){
  this.xp += amount;
};
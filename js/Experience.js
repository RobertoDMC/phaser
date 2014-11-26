BasicGame.Experience = function (player) {
  this.player = player;
  this.currentLevel = 0;
  this.level = 0; //player level
  this.previousCalculatedXpLevel = 0;
  this.previousCalculatedXp = 0;
  this.xp = 0;
  this.nextLevelUpExperience = -1;
  this.lastDeltaXp = null;
  this.lastDeltaNextXp = null;
};

BasicGame.Experience.prototype.update = function(){

  this.lastDeltaXp = this.xp - this.previousCalculatedXpLevel;
  this.lastDeltaNextXp = this.nextLevelUpExperience - this.previousCalculatedXpLevel;

  if(this.xp > this.nextLevelUpExperience){
    this.level += 1;
    this.previousCalculatedXpLevel = this.nextLevelUpExperience;
    this.setNextLevelUpExperience();
  }

};

BasicGame.Experience.prototype.setNextLevelUpExperience = function(){
  var a=0;
  for(var x=1; x < this.level + 1; x++) {
    this.nextLevelUpExperience += Math.floor(x+100*Math.pow(2, (x/2)));
  }
  this.nextLevelUpExperience = Math.floor(this.nextLevelUpExperience / 4);

};

BasicGame.Experience.prototype.addXp = function(amount){
  this.xp += amount;
};
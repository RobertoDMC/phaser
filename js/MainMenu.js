BasicGame.MainMenu = function (game) {

  this.music = null;
  this.playButton = null;

};

BasicGame.MainMenu.prototype = {

  create: function () {

    //this.music = this.add.audio('titleMusic');
    //this.music.play();

    this.add.sprite(0, 0, 'titlepage');

    this.createStartButton();

  },

  createStartButton: function(){
    startButton = this.game.add.text(this.game.width/2, this.game.height/2, "Start", {
      font: "30px Arial",
      fill: "#fff",
      align: "center"
    });
    startButton.inputEnabled = true;
    startButton.events.onInputDown.add(this.startGame, this);
  },

  update: function () {

    //	Do some nice funky main menu effect here

  },

  startGame: function (pointer) {

    //	Ok, the Play Button has been clicked or touched, so let's stop the music (otherwise it'll carry on playing)
    this.music.stop();

    //	And start the actual game
    this.state.start('Game');

  }

};
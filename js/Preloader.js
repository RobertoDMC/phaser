BasicGame.Preloader = function (game) {

  this.background = null;
  this.preloadBar = null;
  this.ready = false;

};

BasicGame.Preloader.prototype = {

  preload: function () {

    this.background = this.add.sprite(300, 400, 'preloaderBackground');
    this.preloadBar = this.add.sprite(300, 400, 'preloaderBar');

    this.load.setPreloadSprite(this.preloadBar);

    this.load.image('titlepage', 'images/title.jpg');
    //this.load.audio('titleMusic', ['audio/main_menu.mp3']);

  },

  create: function () {
    //	Once the load has finished we disable the crop because we're going to sit in the update loop for a short while as the music decodes
    this.preloadBar.cropEnabled = false;

  },

  update: function () {

    //if (this.cache.isSoundDecoded('titleMusic') && this.ready == false)
    //{
      this.ready = true;
      this.state.start('MainMenu');
    //}

  }

};
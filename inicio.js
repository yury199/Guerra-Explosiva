//musica
var music;
//FONDO
var bg;
//PLAY
var play;


var inicio = {
  preload: function () {
    
    //juagador
    game.load.spritesheet("PLAY", "Sprites/PLAY.png", 150, 64);
   
    //explosionmina
    game.load.spritesheet("inicio", "Sprites/inicio.png", 1000, 800);

    //SONIDO
    game.load.audio("batalla", "sonidos/batalla.mp3");
  },
  create: function () {
    //-------------------------------------------------------------
    music = game.add.audio("batalla");
    music.play();
    //----------------------background
    bg = game.add.tileSprite(0, 0, 1000, 800, "inicio");
    bg.fixedToCamera = true;
    //---botton------
    play = game.add.button(game.world.centerX -40, 460, 'PLAY', nukeButton, this, 2, 1, 0);

    //-------------------------------------------------------
   function nukeButton() {

    game.state.start("instruciones", instruciones);

}

    
  },
  update: function () {


  

    
  },
}; //yyyyyyyyyyyyyyyyyyyyyyyyyyyy


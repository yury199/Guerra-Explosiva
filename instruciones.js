//musica
var music;
//FONDO
var bg;
//PLAY
var siguiente;


var instruciones = {
  preload: function () {
    
    //juagador
    game.load.spritesheet("siguiente", "Sprites/sguiente.png", 55, 55);
   
    //explosionmina
    game.load.spritesheet("instrucciones", "Sprites/instrucciones.png", 1000, 800);

    //SONIDO
    game.load.audio("batalla", "sonidos/batalla.mp3");
  },
  create: function () {
    //-------------------------------------------------------------
    music = game.add.audio("batalla");
    //music.play();
    //----------------------background
    bg = game.add.tileSprite(0, 0, 1000, 800, "instrucciones");
    bg.fixedToCamera = true;
    //---botton------
    siguiente = game.add.button(game.world.centerX+370, 720, 'siguiente', nukeButton, this, 2, 1, 0);

    //-------------------------------------------------------
   function nukeButton() {

    game.state.start("nivel", nivel1);

}

    
  },
  update: function () {


  

    
  },
}; //yyyyyyyyyyyyyyyyyyyyyyyyyyyy


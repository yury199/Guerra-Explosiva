//tiles
var map;

var layer;

//variable de texto
var text = null;
//variable de sonido

var music;

//bala------------
var bullets;
var bulletTime = 0;
var bullet;
var fireButton;
//--tiempo-del juego------------------
var counter = 60;
var text = 0;

//jugador
var player;
var saludd1;
//amigos
var amigos;

var cruzs;
//botiquines
var botiquines;
var curas = 0;
var aleluya = 0;
//enemigo
var enemigos;
//minas
var minas;
var mina;
var contadormina = 0;
var relojvisible = false;
//balas enemigo
var contador = 0;
var enemyBullet;
//puntaje
var score = 0;
var scoreString = "";
//aviso
var busca = "";

//FONDO
var bg;
//estadosss
var stateText;

//
var tiempoenemigo = 0;
var cursors;
var facing = "left";

var nivel2 = {
  preload: function () {
    //tiledmap
    game.load.tilemap("map", "tiled/m1_mapa.csv", null, Phaser.Tilemap.CSV);
    //patron
    game.load.image("tiles", "tiled/tiledmap.png");
    //juagador
    game.load.spritesheet("dude", "Sprites/s1.png", 65, 100);
    //vida del jugador
    game.load.image("vida", "Sprites/vida.png");
    game.load.image("vida1", "Sprites/vida1.png");
    //soldado herido
    game.load.spritesheet(
      "soldadoherido",
      "Sprites/soldadoherido.png",
      62,
      100
    );
    //botiqui
    game.load.image("botiquin", "Sprites/curar.png");
    game.load.image("cruz", "Sprites/cruz.png");
    //hoyo
    game.load.image("hoyo", "Sprites/hoyo.png");
    //piedra
    game.load.image("piedra", "Sprites/piedra.png");
    //enemigos
    game.load.spritesheet("malo", "Sprites/malo.png", 65, 100);
    //bala de enemigos
    game.load.image("enemyBullet", "Sprites/bala.png");
    //BALA
    game.load.image("bullet", "Sprites/missile.png");
    //explosionminacarga
    game.load.spritesheet("cargabomba", "Sprites/cargabomba.png", 90, 88);
    //explosionmina
    game.load.spritesheet("bum", "Sprites/bum.png", 132, 110);
    //explosionsangre
    game.load.spritesheet("kaboom", "Sprites/explode.png", 100, 100);
    //Soldadocaido
    game.load.spritesheet("caido", "Sprites/disparomalo.png", 100, 96);
    //explosionmina
    game.load.spritesheet("FONDO", "Sprites/FONDO.png", 132, 110);

    //SONIDO
    //  Firefox doesn't support mp3 files, so use ogg
    game.load.audio("Sbala", "sonidos/bala.wav");
    game.load.audio("Svida", "sonidos/vida.wav");
    game.load.audio("Sdolor", "sonidos/dolor.wav");
    game.load.audio("Sbotiquin", "sonidos/botiquin.wav");
    game.load.audio("Sexplosion", "sonidos/explosion.wav");
    game.load.audio("Scargamina", "sonidos/cargamina.wav");
    game.load.audio("batalla", "sonidos/batalla.mp3");
  },
  create: function () {
    //-------------------------------------------------------------
      //music = game.add.audio("batalla");
      //music.play();
    //----------------------background
    bg = game.add.tileSprite(0, 0, 720, 495, "FONDO");
    bg.fixedToCamera = true;

    //-------------------------------------------------------
    minas = game.add.physicsGroup();

    for (var i = 0; i < 50; i++) {
      var mina = minas.create(
        5900 * Math.random(),
        900 * Math.random(),
        "hoyo"
      );

      mina.anchor.setTo(0.5, 0.5);
      mina.activado = false;
    }

    //mapa______________________________________________________________
    //------------------------------------------------------------------

    map = game.add.tilemap("map", 100, 100);

    //  Now add in the tileset
    map.addTilesetImage("tiles");

    //  cargar la capa 0
    layer = map.createLayer(0);

    //  Resize the world
    layer.resizeWorld();

    //-----------------obtaculos

    piedras = game.add.physicsGroup();

    for (var i = 0; i < 30; i++) {
      var piedra = piedras.create(
        100 * (60 * Math.random()),
        100 * (10 * Math.random()),
        "piedra"
      );
      piedra.anchor.setTo(0.5, 0.5);
      piedra.activado = false;
    }
    piedras.setAll("body.immovable", true);

    //------------------------------------------------------------------

    game.input.touch.preventDefault = false;

    game.physics.startSystem(Phaser.Physics.ARCADE);

    //-----jugador------------------------------------------------------
    player = game.add.sprite(65, 90, "dude"); //posicion y cual sprite voy a usar
    game.physics.enable(player, Phaser.Physics.ARCADE);
    player.body.gravity.y = 0; //GRAVEDAD EN Y
    player.body.bounce.y = 0; //rebote en y
    player.body.collideWorldBounds = true;

    player.vida = 10;
    //cajita invisible que hace las colision
    player.animations.add("right", [0, 1, 2, 3, 4, 5], 25, true);
    player.animations.add("turn", [0], 20, true);
    player.animations.add("left", [6, 7, 8, 9, 10, 11], 25, true);

    //----

    cursors = game.input.keyboard.createCursorKeys();
    //para las balas

    bullets = game.add.group();
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;

    for (var i = 0; i < 1000; i++) {
      var b = bullets.create(0, 0, "bullet");
      b.name = "bullet" + i;
      b.exists = false;
      b.visible = false;
      b.checkWorldBounds = true;
      b.events.onOutOfBounds.add(resetBullet, this); //aca muere
    }
    //--------amigo---------------------------------------------------

    amigos = game.add.physicsGroup();
    for (var i = 0; i < 3; i++) {
      //var amigo = amigos.create( 1800*i,  900*Math.random(), 'soldadoherido');
      var amigo = amigos.create(
        100 * (50 * Math.random()),
        90 * (10 * Math.random()),
        "soldadoherido"
      );
      amigo.anchor.setTo(0.5, 0.5);
      amigo.animations.add("sano", [1, 2], 15, true);
      amigo.frame = 0;
      amigo.herido = true;
      amigo.curado = false;
      amigo.yacurado = false;
    }
    //--------amigo---------------------------------------------------

    botiquines = game.add.physicsGroup();
    for (var i = 1; i < 4; i++) {
      var botiquin = botiquines.create(
        1400 * i,
        900 * Math.random(),
        "botiquin"
      );
      botiquin.anchor.setTo(0.5, 0.5);
    }
    //--------enemigo---------------------------------------------------

    enemigos = game.add.physicsGroup();
    for (var i = 1; i < 12; i++) {
      var enemigo = enemigos.create(500 * i, 900 * Math.random(), "malo");
      enemigo.anchor.setTo(0.5, 0.5);
      enemigo.animations.add("rightE", [0, 1, 2, 3, 4, 5], 15, true);
      enemigo.animations.add("leftE", [6, 7, 8, 9, 10, 11], 15, true);
    }
    enemigos.setAll("body.immovable", true);
    //balas enemigos----------------------------------------------------
    // The enemy's bullets
    enemyBullets = game.add.group();
    enemyBullets.enableBody = true;
    enemyBullets.physicsBodyType = Phaser.Physics.ARCADE;
    enemyBullets.createMultiple(1000, "enemyBullet");
    enemyBullets.setAll("anchor.x", 0.5);
    enemyBullets.setAll("anchor.y", 1);
    enemyBullets.setAll("outOfBoundsKill", true);
    enemyBullets.setAll("checkWorldBounds", true);
    //soldadocaido
    soldadocaido = game.add.group();
    soldadocaido.createMultiple(30, "caido");
    soldadocaido.forEach(setupSoldado, this);

    //explosion de sangre
    explosions = game.add.group();
    explosions.createMultiple(30, "kaboom");
    explosions.forEach(setupInvader, this);

    cargar = game.add.sprite(10000, 10000, "cargabomba");
    cargar.animations.add("carg", [0, 1, 2, 3, 4], 5, true);
    cargar.visible = relojvisible;
    //Explosio

    m = game.add.sprite(10000, 10000, "bum");
    m.animations.add("mm", [0, 1, 2, 3, 4], 5, true);

    //explosion mina
    bumminas = game.add.group();
    bumminas.createMultiple(30, "bum");
    bumminas.forEach(setupbum, this);

    //--------------------------------------------------vida
    salud = game.add.physicsGroup();
    var saludd = salud.create(10, 10, "vida");
    salud.fixedToCamera = true;

    saludd1 = game.add.sprite(40, 10, "vida1");
    saludd1.fixedToCamera = true;
    //------------------
    
     cruzs = game.add.group();
    for (var i = 0; i < 5; i++)
    {
        var cruz = cruzs.create(i * 40 + 880, 25, 'cruz');
        cruz.fixedToCamera = true;
    }

    //_____Sonidos________________________________________________
    sonidobala = game.add.audio("Sbala");
    sonidovida = game.add.audio("Svida");
    sonidoexplosion = game.add.audio("Sexplosion");
    sonidobotiquin = game.add.audio("Sbotiquin");
    sonidodolor = game.add.audio("Sdolor");
    sonidocargamina = game.add.audio("Scargamina");
    

    //__________________tiempo del juego_________________________________

    game.stage.backgroundColor = "#6688ee";

    text = game.add.text(100, 770, "Tiempo: 0", {
      font: "20px Arial Black",
      fill: "#000000",
      align: "center",
    });
    text.anchor.setTo(0.5, 0.5);

    game.time.events.loop(Phaser.Timer.SECOND, updateCounter, this);
    text.fixedToCamera = true;

    //--------------puntaje

    //  The score
    scoreString = "Puntaje : ";
    scoreText = game.add.text(850, 770, scoreString + score, {
      font: "20px Arial Black",
      fill: "#ff0000",
    });
    scoreText.fixedToCamera = true;
    //---------------------------------

    //  The score
    busca = "Encuentra : ";
    buscar = game.add.text(730, 12, busca, {
      font: "20px Arial Black",
      fill: "#ff0000",
    });
    buscar.fixedToCamera = true;
    //

    //  Text
    stateText = game.add.text(500, 400, " ", {
      font: "84px Arial Black",
      fill: "#ffffff",
    });
    stateText.anchor.setTo(0.5, 0.5);
    stateText.visible = false;
    stateText.fixedToCamera = true;
  },
  update: function () {
    if (aleluya == 3) {
 game.state.start("nivel3", nivel3);
    }


 
    saludd1.scale.x = player.vida / 10;
    cargar.visible = relojvisible;
    enemigos.forEach(IA, this);
    amigos.forEach(sano, this);

    soldadocaido.forEach(muerteSoldado, this);
    //----------------------------------
       if(score==100 && saludd1.scale.x<1){
        saludd1.scale.x=1
        score
        

    }


    //-----------------------colision----------------

    game.physics.arcade.overlap(bullets,enemigos,collisionHandler,null,this );
    game.physics.arcade.overlap( player,botiquines,guardarbotiquin,null,this);
    game.physics.arcade.overlap(player, amigos, curaramigo, null, this);

    game.physics.arcade.overlap(enemyBullets,player,enemyHitsPlayer,null,this);
    game.physics.arcade.overlap(player, minas, minaa, null, this);

    game.physics.arcade.overlap(botiquines, piedras, correse, null, this);
    game.physics.arcade.overlap(minas, piedras, correse, null, this);
    game.physics.arcade.overlap(amigos, piedras, correse, null, this);
    

    game.physics.arcade.collide(player, piedras);
    game.physics.arcade.collide(player, enemigos);
    game.physics.arcade.collide(enemigos, piedras);
    game.physics.arcade.collide(player, layer);
    game.physics.arcade.collide(enemigos, layer);

    game.physics.arcade.collide(enemigos, enemigos);
    //___________________________
    game.camera.follow(player);
    //_______________________________
    contador++;

    if (contador >= 25) {
      contador = 0;
      enemigos.forEach(disparo, this);
    }

    //-------------------------------------

    //-------------------------------------

    player.body.velocity.x = 0;
    player.body.velocity.y = 0;

    //----------------------
    if (cursors.right.isDown) {
      player.body.velocity.x = 350;
      player.animations.play("right");
      facing = "right";
    } else if (cursors.left.isDown) {
      player.body.velocity.x = -350;
      player.animations.play("left");
      facing = "left";
    } else if (cursors.up.isDown) {
      if (facing == "right") {
        player.body.velocity.y = -350;
        player.animations.play("right");
      } else {
        player.body.velocity.y = -350;
        player.animations.play("left");
      }
    } else if (cursors.down.isDown) {
      if (facing == "right") {
        player.body.velocity.y = 350;
        player.animations.play("right");
      } else {
        player.body.velocity.y = 350;
        player.animations.play("left");
      }
    } else {
      player.animations.stop();
      if (facing == "right") {
        player.frame = 15;
      } else {
        player.frame = 17;
      }
    }

    if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
      fireBullet();
    }
  },
}; //yyyyyyyyyyyyyyyyyyyyyyyyyyyy


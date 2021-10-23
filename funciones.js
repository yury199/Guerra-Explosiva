

function updateCounter() {
  
  counter--;

  text.setText("Tiempo: 0" + counter);

  if (counter == 0) {
    player.kill();
    counter=60;

    stateText.text = " GAME OVER";
    stateText.visible = true;

    game.time.events.add(Phaser.Timer.SECOND * 3, terminar, this);
  }
}

//bummina
function setupbum(bumm) {
  bumm.anchor.x = 0.5;
  bumm.anchor.y = 0.5;
  bumm.animations.add("bum");
}
//cargabomba
function setupcarga(carga) {
  carga.anchor.x = 0.5;
  carga.anchor.y = 0.5;
  carga.animations.add("cargabomba");
}
//sangre
function setupInvader(invader) {
  invader.anchor.x = 0.5;
  invader.anchor.y = 0.5;
  invader.animations.add("kaboom");
}
//muerte soldado
function setupSoldado(scaido) {
  scaido.anchor.x = 0.5;
  scaido.anchor.y = 0.5;
  scaido.animations.add("caido");
}

//_____correse si sale en un layer_______________
function correse(pepe, piedra) {
  piedra.kill();
  console.log("lo logro señor");
}
//---disparo de enemigo
function disparo(enemigoLocal) {
  var circle11 = { radius: 50, x: player.position.x, y: player.position.x };
  var circle21 = {
    radius: 50,
    x: enemigoLocal.position.x,
    y: enemigoLocal.position.y,
  };

  var dx1 = circle11.x - circle21.x;
  var dy1 = circle11.y - circle21.y;
  var distancie = Math.sqrt(dx1 * dx1 + dy1 * dy1);

  enemyBullet = enemyBullets.getFirstExists(false);

  if (distancie < 500) {
    enemyBullet.reset(enemigoLocal.position.x, enemigoLocal.position.y + 20);

    game.physics.arcade.moveToObject(enemyBullet, player, 1000);

    enemyBullet.body.velocity.y = 0;
    enemyBullet.body.velocity.x = Math.sign(enemyBullet.body.velocity.x) * 500;
  }
}

//_____colision bala con malo________________
function collisionHandler(bullet, enemigo) {
  bullet.kill();
  enemigo.kill();
  enemyBullet.kill();
  sonidodolor.play();

  score += 20;
  scoreText.text = scoreString + score;

  if (tiempoenemigo < 5000) {
    var soldadocaid = soldadocaido.getFirstExists(false);

    soldadocaid.scale.x = -1;
    soldadocaid.reset(enemigo.body.x + 10, enemigo.body.y + 50);
    soldadocaid.play("caido", 30, false, true);
  }

  if (tiempoenemigo >= 5000) {
    var soldadocaid = soldadocaido.getFirstExists(false);
    soldadocaid.reset(enemigo.body.x + 10, enemigo.body.y + 50);
    soldadocaid.play("caido", 30, false, true);
  }

}

function enemyHitsPlayer(player, bullet) {
  bullet.kill();
  sonidodolor.play();
  player.vida--;

  var explosion = explosions.getFirstExists(false);
  explosion.reset(player.body.x + 20, player.body.y + 50);
  explosion.play("kaboom", 30, false, true);

  if (saludd1.scale.x == 0) {
    player.kill();

    stateText.text = " GAME OVER";
    stateText.visible = true;
    counter=60;

    game.time.events.add(Phaser.Timer.SECOND * 3, terminar, this);
  }
}

//funcion bala_____________________________________________
function fireBullet() {
  sonidobala.play();

  if (game.time.now > bulletTime) {
    //tiempo actual/tiempo de bala
    bullet = bullets.getFirstExists(false);

    if (bullet) {
      bullet.reset(player.x + 30, player.y + 67);
      if (facing == "right") {
        bullet.body.velocity.x = 400; //velocidad hacia derecha
      } else if (facing == "left") {
        bullet.body.velocity.x = -400; //velocidad hacia izquierda
      }

      bulletTime = game.time.now + 300;
    }
  }
}

//--mina ante persona--------------------------------------

function minaa(player, mina) {
  contadormina++;

  console.log(contadormina);

  relojvisible = true;

  cargar.position.x = mina.position.x - 50;
  cargar.position.y = mina.position.y - 50;
  cargar.play("carg");

  if (contadormina == 120) {
    relojvisible = false;

    var bummina = bumminas.getFirstExists(false);
    bummina.reset(mina.position.x, mina.position.y);
    bummina.play("bum", 30, false, true);

    player.kill();

    sonidoexplosion.play();
    stateText.text = " GAME OVER";
    stateText.visible = true;
    counter=60;
    game.time.events.add(Phaser.Timer.SECOND * 3, terminar, this);

    
  }

  var minita = { radius: 50, x: mina.position.x - 50, y: mina.position.y - 50 };
  var jugadorr = { radius: 50, x: player.position.x, y: player.position.y };

  var dx = minita.x - jugadorr.x;
  var dy = minita.y - jugadorr.y;
  var distance = Math.sqrt(dx * dx + dy * dy);

  if (distance > minita.radius + jugadorr.radius) {
    contadormina = 0;
    relojvisible = false;
  }

 
}



function guardarbotiquin(player, botiquines) {
  sonidobotiquin.play();
  curas++;
  botiquines.kill();
}



function curaramigo(player, amigo) {
  if (curas > 0 && amigo.herido == true) {
    amigo.herido = false;
    curas--;
  }
  if (amigo.herido == false) {
    amigo.animations.play("sano");
    sonidovida.play();
    amigo.curado = true;
    if (amigo.curado == true && amigo.yacurado == false) {
      aleluya += 1;
      amigo.yacurado = true;

    

    live = cruzs.getFirstAlive();

    if (live)
    {
        live.kill();
    }
    }
  }
}

function resetBullet(bullet) {
  bullet.kill();
}

function IA(enemigoLocal) {
  tiempoenemigo++;
  if (tiempoenemigo < 5000) {
    enemigoLocal.body.velocity.x = -100;
    enemigoLocal.play("leftE");
  }
  if (tiempoenemigo >= 5000) {
    enemigoLocal.body.velocity.x = 100;
    enemigoLocal.play("rightE");
  }
  if (tiempoenemigo == 10000) {
    tiempoenemigo = 0;
  }
}

function NA(activacion) {
  if (activacion.activado == true) {
    player.kill();
  }
}

function sano(sanito) {
  if (sanito.frame == 2) {
    sanito.animations.stop();
  }
}

function muerteSoldado(enemigoLocal) {
  if (enemigoLocal.frame == 3) {
    enemigoLocal.animations.stop();
  }
}

 function terminar() {

    game.state.start("nivel", nivel1);
  }
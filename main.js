
var game = new Phaser.Game(1000, 800, Phaser.CANVAS, 'phaser-example');

game.state.add("nivel", nivel1);
game.state.add("nivel2", nivel2);
game.state.add("nivel3", nivel3);
game.state.add("inicio", inicio);
game.state.add("instruciones", instruciones);



game.state.start("inicio", inicio);

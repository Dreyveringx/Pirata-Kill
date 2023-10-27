const Phaser = require('phaser');

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

function preload() {
    this.load.image('zombie', 'img/zombie1.png');
    this.anims.create({
        key: 'walk',
        frames: this.anims.generateFrameNumbers('zombie', { start: 0, end: 5 }),
        frameRate: 10,
        repeat: -1
    });
    // Aquí cargarás las imágenes de tus zombies y definirás sus animaciones.
}

function create() {
    var zombie = this.add.sprite(400, 300, 'zombie');
    zombie.play('walk');
    // Aquí crearás a tus zombies como sprites y los animarás.
}

function update() {
    // Aquí controlarás la lógica de juego, movimiento y animaciones.
}





const scene = document.getElementById('scene');
const weapon = document.getElementById('weapon');
const weaponSound = new Audio('soursces/sound/arma.mp3');
const zombieEliminationSound = new Audio('soursces/sound/muerte.mp3');
const zombieImages = [
    'soursces/img/zombie1.png',
    'soursces/img/zombie2.png',
];

const zombieImagesLvl2 = [
    'soursces/img/zombie1.png',
    'soursces/img/zombie2.png',
    'soursces/img/zombie4.png',
    'soursces/img/zombie5.png',
    'soursces/img/zombie6.png',
];

let zombiesEliminados = 0;
const contador = document.getElementById('counter');
const zombieSounds = {};

function mostrarMensaje(mensaje) {
    const mensajeElement = document.getElementById('message');
    mensajeElement.textContent = mensaje;
    mensajeElement.style.display = 'block';
}

mostrarMensaje('lvl 1');

let isWeaponAnimating = false;

document.addEventListener('click', () => {
    if (!isWeaponAnimating) {
        isWeaponAnimating = true;
        weaponSound.play();
        weaponSound.volume = 0.5;

        weapon.classList.add('active');

        weapon.removeEventListener('click', weaponClickHandler); 

        setTimeout(() => {
            weapon.classList.remove('active');
            isWeaponAnimating = false;
            weapon.addEventListener('click', weaponClickHandler); 
        }, 1000); 
    }
});

function weaponClickHandler(event) {

    event.stopPropagation();
}

document.addEventListener('mousemove', (event) => {
    const sceneRect = scene.getBoundingClientRect();
    const sceneWidth = sceneRect.width;
    const weaponWidth = weapon.clientWidth;
    const mouseX = event.clientX - sceneRect.left;

    let weaponX = mouseX - weaponWidth / 2;
    weaponX = Math.max(0, weaponX);
    weaponX = Math.min(sceneWidth - weaponWidth, weaponX);

    weapon.style.left = weaponX + 'px';
});

scene.addEventListener('click', (event) => {
    if (event.target.classList.contains('zombie')) {
        const zombie = event.target;
        const zombieSound = zombie.zombieSound;
        
        if (zombieSound) {
            zombieSound.pause();
            delete zombieSounds[zombie.id];
        }

        zombie.style.display = 'none';
        zombiesEliminados++;
        actualizarContador();

        zombieEliminationSound.play();
        zombieEliminationSound.volume = 0.5;
    }
});

function actualizarContador() {
    contador.textContent = `Total Kill: ${zombiesEliminados}`;
}

function moveZombie(zombie) {
    let scale = 0.1;
    let posX = parseFloat(zombie.style.left) || 0;
    let posY = parseFloat(zombie.style.top) || 0;

    function animate() {
        scale += 0.002;
        posX += 1;
        posY += 1;

        zombie.style.transform = `scale(${scale})`;
        zombie.style.left = posX + 'px';
        zombie.style.top = posY + 'px';

        if (scale < 1.0) {
            requestAnimationFrame(animate);
        }
    }

    animate();
}

let currentLevel = 1;

function createZombie() {
    let zombieImagesList = zombieImages;

    if (currentLevel === 2) {
        zombieImagesList = zombieImagesLvl2;
    }

    if (zombieImagesList.length > 0) {
        const zombie = document.createElement('img');
        const imageSrc = zombieImagesList[0];
        zombieImagesList.push(zombieImagesList.shift());
        zombie.src = imageSrc;
        zombie.classList.add('zombie');

        const maxX = scene.clientWidth - zombie.width - 10;
        const maxY = scene.clientHeight - zombie.height - 10;

        const randomX = Math.random() * maxX;
        const randomY = Math.random() * maxY;

        zombie.style.left = randomX + 'px';
        zombie.style.top = randomY + 'px';


        scene.appendChild(zombie);

        zombie.addEventListener('load', () => {
            moveZombie(zombie);
        });
    }
}

const interval = setInterval(() => {
    createZombie();
}, 1000);

setTimeout(() => {
    currentLevel = 2;
    mostrarMensaje('lvl 2');
}, 15000);

setTimeout(() => {
    currentLevel = 2;
    mostrarMensaje('lvl 3');
}, 45000);

setTimeout(() => {
    clearInterval(interval);
    mostrarMensaje('Juego Finalizado');
}, 55000);


const gameSound = document.getElementById("gameSound");
const gameSoundControlButton = document.getElementById("gameSoundControlButton");

gameSound.addEventListener("loadedmetadata", function () {
    gameSound.play();
});

gameSoundControlButton.addEventListener("click", function () {
    if (gameSound.muted) {
        gameSound.muted = false;
        gameSoundControlButton.textContent = "🔊";
        isGameSoundMuted = false; 
    } else {
        gameSound.muted = true;
        gameSoundControlButton.textContent = "🔇";
        isGameSoundMuted = true; 
    }
});

gameSound.play();


function createRain() {
    const rain = document.getElementById("rain");
    const totalDrops = 200; // Ajusta este número según la cantidad deseada de gotas

    for (let i = 0; i < totalDrops; i++) {
        const raindrop = document.createElement("div");
        raindrop.className = "raindrop";
        rain.appendChild(raindrop);

        // Coloca cada gota de lluvia en una posición y velocidad aleatoria
        const positionX = Math.random() * window.innerWidth;
        const positionY = Math.random() * window.innerHeight;
        const animationDuration = Math.random() * 1.5 + 0.5; // Duración de la animación entre 0.5 y 2 segundos
        const delay = Math.random() * 3; // Delay de inicio de animación entre 0 y 3 segundos

        raindrop.style.left = `${positionX}px`;
        raindrop.style.top = `${positionY}px`;
        raindrop.style.animationDuration = `${animationDuration}s`;
        raindrop.style.animationDelay = `${delay}s`;
    }
}

// Función para activar la tormenta
// Función para activar la tormenta
function activateStorm() {
    const rain = document.getElementById("rain");
    const thunder = document.createElement("div");
    thunder.className = "thunder";
    rain.appendChild(thunder);

    // Reproducir sonido de trueno
    playThunderSound();

    // Muestra un relámpago
    showLightning();

    // Después de un tiempo, desactivar la tormenta
    setTimeout(deactivateStorm, 3000);
}

// Función para mostrar un relámpago
function showLightning() {
    const lightning = document.createElement("div");
    lightning.className = "lightning";
    const gameContainer = document.getElementById("game-container");
    gameContainer.appendChild(lightning);

    // Oculta el relámpago después de un corto período
    setTimeout(() => {
        gameContainer.removeChild(lightning);
    }, 500); // Ajusta la duración del relámpago según sea necesario
}

// Función para reproducir el sonido de trueno (debes proporcionar la lógica real para reproducir el sonido)
function playThunderSound() {
    // Tu lógica para reproducir el sonido de trueno aquí
}

// Inicialización del juego
function startGame() {
    createRain();
    // Llama a activateStorm para desencadenar la tormenta cuando lo desees.
}

// Inicia el juego cuando se cargue la página
window.onload = startGame;




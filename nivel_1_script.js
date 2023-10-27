const movableElement = document.getElementById("movableElement");
const gunGif = document.getElementById("gunGif");
let gifPlaying = false; // Variable para rastrear si el GIF está en reproducción

gunGif.style.animationPlayState = "paused"; // Pausa la animación por defecto del GIF

gunGif.addEventListener("click", () => {
    if (gifPlaying) {
        gunGif.style.animationPlayState = "paused"; // Detener la animación
    } else {
        gunGif.style.animationPlayState = "running"; // Iniciar la animación
    }
    gifPlaying = !gifPlaying; // Cambiar el estado del GIF
});

document.addEventListener("mousemove", (event) => {
    const xPosition = event.clientX;
    const windowWidth = window.innerWidth;
    const elementWidth = movableElement.offsetWidth;
    const maxX = windowWidth - elementWidth;
    const newX = Math.min(maxX, Math.max(0, xPosition - elementWidth / 2));

    movableElement.style.transform = `translateX(${newX}px)`;
});


// Selecciona el botón de reset
const resetButton = document.getElementById("reset-button");

// Agrega un evento al botón para volver al principio de la página
resetButton.addEventListener("click", () => {
    // Usa el método 'scrollTo' para volver al principio
    window.scrollTo(0, 0);
});


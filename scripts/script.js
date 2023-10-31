const shotgunSound = document.getElementById("shotgun-audio");

document.addEventListener("click", () => {
    // Reproduce el sonido de la escopeta al hacer clic en cualquier parte de la pantalla
    shotgunSound.play();
});

const gunGif = document.getElementById("gunGif");
const klipartz = document.getElementById("klipartz");
let gifPlaying = false;

gunGif.addEventListener("click", () => {
    if (!gifPlaying) {
        gunGif.style.display = "none"; // Oculta la imagen estática
        klipartz.style.display = "none"; // Oculta la imagen klipartz
        gunGif.style.animationPlayState = "running"; // Inicia la animación del GIF
        shotgunSound.play();
    } else {
        gunGif.style.display = "block"; // Muestra la imagen estática de nuevo
        klipartz.style.display = "block"; // Muestra la imagen klipartz
        gunGif.style.animationPlayState = "paused"; // Detiene la animación del GIF
        // Pausa la reproducción del sonido
        shotgunSound.pause();
         // Reinicia el sonido al principio
        shotgunSound.currentTime = 0;
    }
    gifPlaying = !gifPlaying;
});

document.addEventListener("mousemove", (event) => {
    const xPosition = event.clientX;
    const windowWidth = window.innerWidth;
    const elementWidth = gunGif.offsetWidth;
    const maxX = windowWidth - elementWidth;
    const newX = Math.min(maxX, Math.max(0, xPosition - elementWidth / 2));

    gunGif.style.transform = `translateX(${newX}px)`;
});

const resetButton = document.getElementById("reset");

resetButton.addEventListener("click", () => {
    window.scrollTo(0, 0);
});

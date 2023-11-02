const playerNameInput = document.getElementById("player-name");
const addPlayerButton = document.getElementById("add-player-button");
const startGameButton = document.getElementById("start-game-button");
const playersList = document.getElementById("players-list");
const gameContainer = document.getElementById("game-container");

const players = [];

addPlayerButton.addEventListener("click", () => {
    const playerName = playerNameInput.value.trim();
    if (playerName !== "") {
        players.push(playerName);
        playerNameInput.value = "";
        updatePlayerList();
    }
});
 
let soundEnabled = true;

function toggleSound() {
    soundEnabled = !soundEnabled;
    const soundButton = document.getElementById("sound-button");
    if (soundEnabled) {
        soundButton.textContent = "🔊 Sound";
       
    } else {
        soundButton.textContent = "🔇 Mute";
       
    }
}

const soundButton = document.getElementById("sound-button");
const gameSound = document.getElementById("game-sound");

function toggleSound() {
    if (gameSound.paused) {
        gameSound.play();
        soundButton.textContent = "🔊 Sound";
    } else {
        gameSound.pause();
        soundButton.textContent = "🔇 Mute";
    }
}



function updatePlayerList() {
    playersList.innerHTML = "";
    players.forEach((player, index) => {
        const playerItem = document.createElement("li");
        playerItem.textContent = player;

        // Agregar imagen de eliminación en lugar de texto
        const removeIcon = document.createElement("img");
        removeIcon.src = "img/basura2.png"; // Ruta a tu imagen de eliminación
        removeIcon.className = "remove-icon";
        removeIcon.addEventListener("click", () => {
            eliminarElemento(index);
        });

        playerItem.appendChild(removeIcon);
        playersList.appendChild(playerItem);
    });



    // Habilita el botón de inicio si hay al menos 2 jugadores
    if (players.length >= 2) {
        startGameButton.disabled = false;
    } else {
        startGameButton.disabled = true;
    }
    updatePlayerTable();
}


startGameButton.addEventListener("click", () => {
    // Aquí puedes iniciar el juego con los jugadores disponibles
    // Por ejemplo, puedes generar una lista aleatoria de jugadores o realizar otras acciones de inicio.
    alert("¡Juego iniciado con " + players.length + " jugadores!");
});

function eliminarElemento(index) {
    players.splice(index, 1);
    updatePlayerList();
}
function iniciarJuego() {
    if (players.length >= 2) {
        const playerNames = players.join(", ");
        alert(`¡Juego iniciado con ${players.length} jugadores!\nNombres de los jugadores: ${playerNames}`);
        // Agrega aquí la lógica para comenzar tu juego
    } else {
        alert("Debes tener al menos 2 jugadores para iniciar el juego.");
    }
}

// Asigna la función 'iniciarJuego' al evento 'click' del botón 'PLAY'
startGameButton.addEventListener("click", iniciarJuego);

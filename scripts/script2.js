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
        removeIcon.src = "soursces/img/basura2.png"; // Ruta a tu imagen de eliminación
        removeIcon.className = "remove-icon";
        removeIcon.addEventListener("click", () => {
            eliminarElemento(index);
        });

        playerItem.appendChild(removeIcon);
        playersList.appendChild(playerItem);
    });



    if (players.length >= 2) {
        startGameButton.disabled = false;
    } else {
        startGameButton.disabled = true;
    }
    updatePlayerTable();
}


startGameButton.addEventListener("click", () => {
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
        
    } else {
        alert("Debes tener al menos 2 jugadores para iniciar el juego.");
    }
}


startGameButton.addEventListener("click", iniciarJuego);

// Ejemplo de detección de orientación
window.addEventListener("orientationchange", function() {
    if (window.orientation === 90 || window.orientation === -90) {
        // Estás en orientación horizontal
        // Realizar acciones específicas
    } else {
        // Estás en orientación vertical
        // Realizar acciones específicas
    }
});

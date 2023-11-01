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

        localStorage.setItem("players", JSON.stringify(players));
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


        const removeIcon = document.createElement("img");
        removeIcon.src = "img/basura2.png"; 
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
    if (players.length >= 2) {
        const playerNames = players.join(",");
        localStorage.setItem("players", JSON.stringify(players)); // Almacena los nombres en localStorage
        const gameLink = document.getElementById("start-game-link");
        gameLink.click();
    } else {
        alert("Debes tener al menos 2 jugadores para iniciar el juego.");
    }
});




const exitButton = document.getElementById("exit-button");
exitButton.addEventListener("click", () => {
    location.href = "index.html";
});



function eliminarElemento(index) {
    players.splice(index, 1);
    updatePlayerList();
}
function iniciarJuego() {
    if (players.length >= 2) {
        currentPlayerIndex = 0; 
        const currentPlayer = players[currentPlayerIndex];
        mostrarMensaje(`Nivel 1 - Jugador actual: ${currentPlayer}`);
      
    } else {
        alert("Debes tener al menos 2 jugadores para iniciar el juego.");
    }
}



startGameButton.addEventListener("click", iniciarJuego);


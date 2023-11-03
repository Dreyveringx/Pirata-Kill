document.addEventListener("DOMContentLoaded", function() {
    const scene = document.getElementById('scene');
    const weapon = document.getElementById('weapon');
    const weaponSound = new Audio('resources/sound/arma.mp3');
    const gameOverPopup = document.getElementById("game-over-popup");
    const exitGameButton = document.getElementById("exit-game-button");
    const nextPlayerButton = document.getElementById("next-player-button");


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


    const playerNames = JSON.parse(localStorage.getItem("players"));
    
    if (playerNames && playerNames.length > 0) {
        mostrarMensaje(`Nivel 1 - Jugadores: ${playerNames.join(", ")}`);
    } else {
        mostrarMensaje('Nivel 1 - Jugadores: ');
    }

    let currentPlayerIndex = 0;
    let isGameActive = true;
 
  
    


    const zombieEliminationSound = new Audio('resources/sound/zombie-death.mp3');

    const playersAlive = [...playerNames]; 
    const playersDead = [];

    function mostrarMensajeEmergente() {
        const isGameActive = false; 
        const popup = document.createElement('div');
        popup.className = 'popup';
        const quitButton = document.createElement('button');
        quitButton.textContent = 'Salir';
        const nextPlayerButton = document.createElement('button');
        nextPlayerButton.textContent = 'Siguiente Jugador';
    
        quitButton.addEventListener('click', () => {
            // Redirige a index.html
            window.location.href = 'index.html';
        });
    
        nextPlayerButton.addEventListener('click', () => {

            popup.style.display = 'none';

            switchToNextPlayer();
            isGameActive = true; 
        });
    
        popup.appendChild(quitButton);
        popup.appendChild(nextPlayerButton);
    
        document.body.appendChild(popup);
    }
    
    exitGameButton.addEventListener("click", () => {
      gameOverPopup.style.display = "none";

      this.location.href = "index.html";
  });

    
    function jugadorMuere() {
        const jugadorActual = playersAlive[currentPlayerIndex];
        playersDead.push(jugadorActual); 
        playersAlive.splice(currentPlayerIndex, 1); 
    
        mostrarMensajeEmergente(`¡${jugadorActual} ha muerto!`);
        
        if (playersAlive.length > 0) {
            
            currentPlayerIndex = (currentPlayerIndex + 1) % playersAlive.length;
            const nextPlayer = playersAlive[currentPlayerIndex];
            mostrarMensaje(`Nivel ${currentRound} - Jugador actual: ${nextPlayer}`);
            
        } else {
            
            currentRound++;

            isGameActive = false;
           
        }
    }
    

    const zombieImages = [
      'resources/img/zombie1.png',
      'resources/img/zombie2.png',
    ];
  
    const zombieImagesLvl2 = [
      'resources/img/zombie1.png',
      'resources/img/zombie2.png',
      'resources/img/zombie4.png',
      'resources/img/zombie5.png',
      'resources/img/zombie6.png',
    ];
  
    let currentRound = 1;
    let zombiesEliminados = 0;

    const contador = document.getElementById('counter');
    const zombieSounds = {};
  
    function mostrarMensaje(mensaje) {
      const mensajeElement = document.getElementById('message');
      mensajeElement.textContent = mensaje;
      mensajeElement.style.display = 'block';
    }
  
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

    function createZombie() {
      if (isGameActive) {
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
    }}
  
    const interval = setInterval(() => {
      createZombie();
    }, 1000);
  
    setTimeout(() => {
        currentLevel = 2;
        mostrarMensaje(`Nivel ${currentLevel}`);
        isGameActive = true;
      }, 15000);
      
      setTimeout(() => {
        currentLevel = 3;
        mostrarMensaje(`Nivel ${currentLevel}`);
        isGameActive = true; 
      }, 45000);
      
      setTimeout(() => {
        clearInterval(interval);
        mostrarMensaje('Juego Finalizado');
      }, 55000);
  
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
          } else {

            jugadorMuere();
          }
        }
      
        animate();
      }
      
  
    let currentLevel = 1;
     
  });
  
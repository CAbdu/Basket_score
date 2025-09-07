// Variables pour stocker les scores
let homeScore = 0;
let guestScore = 0;
let currentPeriod = 1;

// Variables pour le timer
let timerTime = 12 * 60; // 12 minutes en secondes
let timerInterval = null;
let isTimerRunning = false;

// Variables pour les fautes
let homeFouls = 0;
let guestFouls = 0;

// Sélectionner les éléments de score
let homeScoreElement = document.querySelector(".home_score .red_score");
let guestScoreElement = document.querySelector(".guest_score .red_score");
const homeSquare = document.getElementById("home-square");
const guestSquare = document.getElementById("guest-square");
let newGame = document.querySelector(".new_game");

// Sélectionner les carrés des quart-temps
const periodSquares = document.querySelectorAll(".period-square");

// Sélectionner les éléments du timer
const timerDisplay = document.querySelector(".timer-display");
const startBtn = document.querySelector(".start-btn");
const pauseBtn = document.querySelector(".pause-btn");
const resetBtn = document.querySelector(".reset-btn");

// Sélectionner les éléments des fautes
const homeFoulsDisplay = document.querySelector("#home-fouls");
const guestFoulsDisplay = document.querySelector("#guest-fouls");
const foulButtons = document.querySelectorAll(".foul-btn");

// Sélectionner tous les boutons de points
let homeButtons = document.querySelectorAll(".home_score .points button");
let guestButtons = document.querySelectorAll(".guest_score .points button");

// Fonction pour mettre à jour l'affichage des quart-temps
function updatePeriodDisplay() {
    periodSquares.forEach((square, index) => {
        const periodNumber = index + 1;
        square.classList.remove('active', 'completed');
        
        if (periodNumber < currentPeriod) {
            square.classList.add('completed');
        } else if (periodNumber === currentPeriod) {
            square.classList.add('active');
        }
    });
}

// Fonction pour passer au quart-temps suivant
function nextPeriod() {
    if (currentPeriod < 4) {
        currentPeriod++;
        updatePeriodDisplay();
    }
}

// Fonction pour revenir au quart-temps précédent
function previousPeriod() {
    if (currentPeriod > 1) {
        currentPeriod--;
        updatePeriodDisplay();
    }
}

// Initialiser l'affichage des quart-temps
updatePeriodDisplay();

// Fonctions pour le timer
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}

function updateTimerDisplay() {
    timerDisplay.textContent = formatTime(timerTime);
}

function startTimer() {
    if (!isTimerRunning && timerTime > 0) {
        isTimerRunning = true;
        timerInterval = setInterval(() => {
            timerTime--;
            updateTimerDisplay();
            
            if (timerTime <= 0) {
                stopTimer();
                // Optionnel : passer automatiquement au quart-temps suivant
                if (currentPeriod < 4) {
                    nextPeriod();
                    resetTimer();
                }
            }
        }, 1000);
        
        startBtn.disabled = true;
        pauseBtn.disabled = false;
    }
}

function pauseTimer() {
    if (isTimerRunning) {
        stopTimer();
        startBtn.disabled = false;
        pauseBtn.disabled = true;
    }
}

function stopTimer() {
    isTimerRunning = false;
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
}

function resetTimer() {
    stopTimer();
    timerTime = 12 * 60; // 12 minutes
    updateTimerDisplay();
    startBtn.disabled = false;
    pauseBtn.disabled = true;
}

// Initialiser l'affichage du timer
updateTimerDisplay();

// Fonctions pour les fautes
function updateFoulsDisplay(team) {
    const foulsDisplay = team === 'home' ? homeFoulsDisplay : guestFoulsDisplay;
    const fouls = team === 'home' ? homeFouls : guestFouls;
    
    const emojis = foulsDisplay.querySelectorAll('.foul-emoji');
    emojis.forEach((emoji, index) => {
        if (index < fouls) {
            emoji.classList.add('active');
        } else {
            emoji.classList.remove('active');
        }
    });
}

function addFoul(team) {
    if (team === 'home' && homeFouls < 4) {
        homeFouls++;
        updateFoulsDisplay('home');
    } else if (team === 'guest' && guestFouls < 4) {
        guestFouls++;
        updateFoulsDisplay('guest');
    }
}

function removeFoul(team) {
    if (team === 'home' && homeFouls > 0) {
        homeFouls--;
        updateFoulsDisplay('home');
    } else if (team === 'guest' && guestFouls > 0) {
        guestFouls--;
        updateFoulsDisplay('guest');
    }
}

// Initialiser l'affichage des fautes
updateFoulsDisplay('home');
updateFoulsDisplay('guest');

// Ajouter des event listeners pour les carrés des quart-temps
periodSquares.forEach((square, index) => {
    square.addEventListener('click', () => {
        currentPeriod = index + 1;
        updatePeriodDisplay();
    });
});

// Ajouter des event listeners pour les boutons du timer
startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);

// Ajouter des event listeners pour les boutons de fautes
foulButtons.forEach(button => {
    button.addEventListener('click', () => {
        const team = button.getAttribute('data-team');
        const action = button.classList.contains('add-foul') ? 'add' : 'remove';
        
        if (action === 'add') {
            addFoul(team);
        } else {
            removeFoul(team);
        }
    });
});

// Fonction pour mettre à jour l'affichage du score
function updateScoreDisplay(team, newScore) {
    if (team === 'home') {
        homeScoreElement.textContent = newScore;
    } else if (team === 'guest') {
        guestScoreElement.textContent = newScore;
    }
    homeSquare.classList.remove("winner");
    guestSquare.classList.remove("winner");

    // ajouter la classe au gagnant
    if (homeScore > guestScore) {
      homeSquare.classList.add("winner");
    } else if (guestScore > homeScore) {
      guestSquare.classList.add("winner");
    }
}

// Fonction pour ajouter des points
function addPoints(team, points) {
    if (team === 'home') {
        homeScore += points;
        updateScoreDisplay('home', homeScore);
    } else if (team === 'guest') {
        guestScore += points;
        updateScoreDisplay('guest', guestScore);
    }
}

// Fonction pour déclencher l'animation de clic
function triggerClickAnimation(button) {
    button.classList.add('clicked');
    setTimeout(() => {
        button.classList.remove('clicked');
    }, 300); // Durée de l'animation
}

// Ajouter les event listeners pour les boutons HOME
homeButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        const points = index + 1; // +1, +2, +3
        addPoints('home', points);
        triggerClickAnimation(button);
    });
});

// Ajouter les event listeners pour les boutons GUEST
guestButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        const points = index + 1; // +1, +2, +3
        addPoints('guest', points);
        triggerClickAnimation(button);
    });
});



newGame.addEventListener('click', () => {
    homeScore = 0;
    guestScore = 0;
    currentPeriod = 1;
    homeFouls = 0;
    guestFouls = 0;
    homeScoreElement.textContent = 0;
    guestScoreElement.textContent = 0;
    updateScoreDisplay();
    updatePeriodDisplay();
    updateFoulsDisplay('home');
    updateFoulsDisplay('guest');
    resetTimer();
})

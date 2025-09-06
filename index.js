// Variables pour stocker les scores
let homeScore = 0;
let guestScore = 0;

// Sélectionner les éléments de score
let homeScoreElement = document.querySelector(".home_score .red_score");
let guestScoreElement = document.querySelector(".guest_score .red_score");

// Sélectionner tous les boutons de points
let homeButtons = document.querySelectorAll(".home_score .points button");
let guestButtons = document.querySelectorAll(".guest_score .points button");

// Fonction pour mettre à jour l'affichage du score
function updateScoreDisplay(team, newScore) {
    if (team === 'home') {
        homeScoreElement.textContent = newScore;
    } else if (team === 'guest') {
        guestScoreElement.textContent = newScore;
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

// Ajouter les event listeners pour les boutons HOME
homeButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        const points = index + 1; // +1, +2, +3
        addPoints('home', points);
    });
});

// Ajouter les event listeners pour les boutons GUEST
guestButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        const points = index + 1; // +1, +2, +3
        addPoints('guest', points);
    });
});


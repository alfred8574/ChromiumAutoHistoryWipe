const INACTIVITY_LIMIT = 60 * 60 * 1000; // 1 heure en millisecondes

let lastActivityTime = Date.now();

// Met à jour l'heure de la dernière activité
function updateActivity() {
    lastActivityTime = Date.now();
}

// Vérifie l'inactivité et supprime l'historique si 1h est passée
function checkInactivity() {
    if (Date.now() - lastActivityTime >= INACTIVITY_LIMIT) {
        clearHistory();
    }
}

// Supprime l'historique
function clearHistory() {
    chrome.browsingData.remove({
        since: 0
    }, {
        history: true
    }, () => {
        console.log("Historique supprimé après inactivité ou après 1 heure");
    });
}

// Écoute les interactions de l'utilisateur
chrome.tabs.onActivated.addListener(updateActivity);
chrome.tabs.onUpdated.addListener(updateActivity);
chrome.windows.onFocusChanged.addListener(updateActivity);

// Vérifie l'inactivité toutes les minutes
setInterval(checkInactivity, 60 * 1000);

// Supprime l'historique au démarrage
chrome.runtime.onStartup.addListener(clearHistory);

// Supprime l'historique à la fermeture
chrome.runtime.onSuspend.addListener(clearHistory);

// Supprime l'historique toutes les heures, en plus de l'inactivité
setInterval(clearHistory, 60 * 60 * 1000);

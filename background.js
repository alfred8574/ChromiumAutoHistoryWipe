const INACTIVITY_LIMIT = 60 * 60 * 1000;

let lastActivityTime = Date.now();

// Détecte le navigateur
function detectBrowser() {
    if (typeof chrome !== "undefined" && typeof browser === "undefined") {
        return "chrome"; // Chrome, Edge, Opera (Chromium-based)
    } else if (typeof browser !== "undefined") {
        return "firefox"; // Firefox
    } else {
        return "unknown"; // Autres navigateurs non supportés
    }
}

const browserType = detectBrowser();

// Si le navigateur n'est pas basé sur Chromium, arrêter l'exécution
if (browserType !== "chrome") {
    console.warn("Navigateur non pris en charge. Le script ne sera pas exécuté.");
    return;
}

function updateActivity() {
    lastActivityTime = Date.now();
}

function checkInactivity() {
    if (Date.now() - lastActivityTime >= INACTIVITY_LIMIT) {
        clearHistory();
        lastActivityTime = Date.now();
    }
}

function clearHistory() {
    const sinceTime = Date.now() - INACTIVITY_LIMIT;

    chrome.browsingData.remove({
        since: sinceTime
    }, {
        history: true
    }, () => {
        console.log("Historique supprimé (Chrome/Chromium).");
    });
}

function clearHistoryHourly() {
    chrome.browsingData.remove({
        since: 0
    }, {
        history: true
    }, () => {
        console.log("Historique supprimé toutes les heures (Chrome/Chromium).");
    });
}

chrome.tabs.onActivated.addListener(updateActivity);
chrome.tabs.onUpdated.addListener(updateActivity);
chrome.windows.onFocusChanged.addListener(updateActivity);

setInterval(checkInactivity, 60 * 1000);

chrome.runtime.onStartup.addListener(() => {
    clearHistory();
    chrome.alarms.create("hourlyClearHistory", { periodInMinutes: 60 });
});

chrome.runtime.onSuspend.addListener(clearHistory);

chrome.alarms.create("clearHistoryAlarm", { periodInMinutes: 60 });
chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === "clearHistoryAlarm") {
        clearHistory();
    } else if (alarm.name === "hourlyClearHistory") {
        clearHistoryHourly();
    }
});

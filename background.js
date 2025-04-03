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

    if (browserType === "chrome") {
        chrome.browsingData.remove({
            since: sinceTime
        }, {
            history: true
        }, () => {
            console.log("Historique supprimé (Chrome/Chromium).");
        });
    } else if (browserType === "firefox") {
        browser.browsingData.remove({
            since: sinceTime
        }, {
            history: true
        }).then(() => {
            console.log("Historique supprimé (Firefox).");
        }).catch((error) => {
            console.error("Erreur lors de la suppression de l'historique (Firefox) :", error);
        });
    } else {
        console.warn("Navigateur non supporté. Impossible de supprimer l'historique.");
    }
}

function clearHistoryHourly() {
    if (browserType === "chrome") {
        chrome.browsingData.remove({
            since: 0
        }, {
            history: true
        }, () => {
            console.log("Historique supprimé toutes les heures (Chrome/Chromium).");
        });
    } else if (browserType === "firefox") {
        browser.browsingData.remove({
            since: 0
        }, {
            history: true
        }).then(() => {
            console.log("Historique supprimé toutes les heures (Firefox).");
        }).catch((error) => {
            console.error("Erreur lors de la suppression de l'historique (Firefox) :", error);
        });
    } else {
        console.warn("Navigateur non supporté. Impossible de supprimer l'historique.");
    }
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

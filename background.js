const INACTIVITY_LIMIT = 60 * 60 * 1000;

let lastActivityTime = Date.now();

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
    chrome.browsingData.remove({
        since: Date.now() - INACTIVITY_LIMIT
    }, {
        history: true
    }, () => {
        console.log("Historique supprimé.");
    });
}

function clearHistoryHourly() {
    chrome.browsingData.remove({
        since: 0
    }, {
        history: true
    }, () => {
        console.log("Historique supprimé toutes les heures.");
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

chrome.runtime.onStartup.addListener(() => {
    chrome.browsingData.remove({
        since: 0
    }, {
        history: true
    }, () => {
        console.log("Historique supprimé au démarrage");
    });
});

chrome.runtime.onSuspend.addListener(() => {
    chrome.browsingData.remove({
        since: 0
    }, {
        history: true
    }, () => {
        console.log("Historique supprimé à la fermeture");
    });
});
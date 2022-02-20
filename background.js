var notTitle = "";

chrome.alarms.onAlarm.addListener((alarm) => {

    chrome.storage.local.get([alarm.name], (result) => {
        notTitle = result.uid.title;
        console.log('name: ' + alarm.name + '_title' + ' - title: ' + notTitle);
    });

    chrome.notifications.create(alarm.name, {
        type: "basic",
        title: notTitle + " - Tab Summoner",
        message: notTitle,
        iconUrl: "assets/images/icon.png"
    });
});

chrome.notifications.onClicked.addListener((notificationId) => {
    chrome.storage.local.get(notificationId, (result) => {
        chrome.tabs.create({url: result.uid.url});
    });
});
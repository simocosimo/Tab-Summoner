const storageKey = 'ts-list';
const alarmKey = 'ts-alarm';

chrome.alarms.onAlarm.addListener((alarm) => {

    if(alarm.name === alarmKey) {
        chrome.storage.local.get([storageKey], (result) => {
            result = JSON.parse(result);
            const e = result.shift();

            chrome.notifications.create(e.e_uid, {
                type: "basic",
                title: e.title + " - Tab Summoner",
                message: e.title,
                iconUrl: "assets/images/icon.png"
            });

            // creates the alarm for the next event
            if(result.lenght !== 0)
                chrome.alarms.create(alarmKey, {when: result[0].when.getTime()});
        });
    }
});

//TODO: change listener to be able to retrieve link to open from event
chrome.notifications.onClicked.addListener((notificationId) => {
    chrome.storage.local.get([storageKey], (result) => {
        result = JSON.parse(result);
        result.find((e) => e.e_uid === notificationId);
        chrome.tabs.create({url: result.uid.url});
    });
});
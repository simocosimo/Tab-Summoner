const title = document.getElementById('ftitle');
const url = document.getElementById('furl');
const datetime = document.getElementById('fdate');
const errorfield = document.getElementById('error-field');
const goodfield = document.getElementById('good-field');
const button = document.getElementById('ts-button');
const reset = document.getElementById('ts-reset');

function checkDate() {
    var inputDate = new Date(datetime.value);
    var date = new Date();
    return (inputDate < date);
}

button.addEventListener('click', () => {
    if(title.value !== "" && url.value !== "" && checkDate()) {
        const uid = title.value.replace(/ /g, '') + Math.floor(Math.random() * 100).toString();
        const storageKey = 'ts-list';
        const alarmKey = 'ts-alarm';
        // needed to create the alarm
        const dateFromEpoch = new Date(datetime.value).getTime();
        // add notification True/False support
        const e = {e_uid: uid, title: title.value, url: url.value, when: new Date(datetime.value)}

        errorfield.innerText = "";
        goodfield.innerText = 'uid is ' + uid;
        console.log('Date from epoch is ' + dateFromEpoch + ' from date ' + datetime.value);
        // chrome.storage.local.set({'uid': valuesToMem}, () => {console.log('Added a notification title as ' + valuesToMem.title + ' and ' + valuesToMem.url)});

        chrome.storage.local.get([storageKey], (result) => {
            result = JSON.parse(result);
            result.push(e);
            result.sort((a, b) => a.when < b.when);
            chrome.storage.local.set({storageKey: JSON.stringify(result)}, () => {console.log(`JSON saved to local storage: ${JSON.stringify(result)}`)})
        })
        // setting the alarm
        chrome.alarms.create(alarmKey, {when: dateFromEpoch});
    } else {
        errorfield.innerText = "Fields cannot be empty and date needs to be in the future!";
        goodfield.innerText = "";
    }
});

reset.addEventListener('click', () => {
    title.value = "";
    url.value = "";
    datetime.value = "";
});


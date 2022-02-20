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
    if(inputDate < date) {
        return 0;
    } else {
        return 1;
    }
}

button.addEventListener('click', () => {
    if(title.value != "" && url.value != "" && checkDate()) {
        const uid = title.value.replace(/ /g, '') + Math.floor(Math.random() * 100).toString();
        const valuesToMem = {title: title.value, url: url.value}
        var dateFromEpoch = new Date(datetime.value).getTime();
        errorfield.innerText = "";
        goodfield.innerText = 'uid is ' + uid;
        console.log('Date from epoch is ' + dateFromEpoch + ' from date ' + datetime.value);
        // TODO: storage set just doesn't work
        chrome.storage.local.set({'uid': valuesToMem}, () => {console.log('Added a notification title as ' + valuesToMem.title + ' and ' + valuesToMem.url)});
        // setting the alarm
        chrome.alarms.create('uid', {when: dateFromEpoch});
    } else {
        errorfield.innerText = "Fields cannot be empty and date needs to be in the future!";
        goodfield.innerText = "";
    }
});

reset.addEventListener('click', () => {
    title.value = "";
    url.value = "";
    //TODO: null the date field
});


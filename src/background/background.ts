import { resetDailyTweetCount, setStoredTweetCount } from "../utils/storage";

chrome.runtime.onInstalled.addListener(() => {
    setStoredTweetCount(0, 0);
});

// TODO change to utc+8 12nn
const utcTime = new Date();
utcTime.setUTCHours(11); // 11:00 am utc
utcTime.setUTCMinutes(30);
utcTime.setUTCSeconds(0);
utcTime.setUTCMilliseconds(0);

chrome.alarms.create("resetDailyCount", {
    when: utcTime.getTime(),
});

chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === "resetDailyCount") {
        console.log("resetting count");
        resetDailyTweetCount();
    }
});

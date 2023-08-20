import {
    setExtensionState,
    setStoredAllTimeTweetCount,
} from "../utils/storage";

chrome.runtime.onInstalled.addListener(() => {
    setStoredAllTimeTweetCount(0);
    setExtensionState(true);
});

// TODO change UTC hours to 4
// const utcTime = new Date();
// utcTime.setUTCHours(2);
// utcTime.setUTCMinutes(23);
// utcTime.setUTCSeconds(0);
// utcTime.setUTCMilliseconds(0);

// chrome.alarms.create("resetDailyCount", {
//     when: utcTime.getTime(),
// });

// chrome.alarms.onAlarm.addListener((alarm) => {
//     if (alarm.name === "resetDailyCount") {
//         resetDailyTweetCount().then(() => {
//             console.log("Daily tweet count has been reset!");
//         });
//     }
// });

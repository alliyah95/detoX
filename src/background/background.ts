import { setExtensionState, setStoredAllTimeTweetCount } from "../utils";

chrome.runtime.onInstalled.addListener(() => {
    setStoredAllTimeTweetCount(0);
    setExtensionState(true);
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "checkTwitter") {
        const currentTab = sender.tab;
        const isTwitter =
            currentTab &&
            currentTab.url &&
            currentTab.url.includes("twitter.com");
        sendResponse({ isTwitter });
    }
});

const handleTweetProcessingState = (message) => {
    if (message.action === "tweetProcessingError") {
        chrome.action.setBadgeText({ text: "!" }, () => {});
    } else if (message.action === "tweetProcessingSuccess") {
        chrome.action.setBadgeText({ text: "" }, () => {});
    }
};

chrome.runtime.onMessage.addListener(handleTweetProcessingState);
chrome.action.setBadgeBackgroundColor({ color: [201, 48, 48, 255] });

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

import { setExtensionState } from "../utils";
import { ProcessingStateObject } from "../utils/types";

chrome.runtime.onInstalled.addListener(() => {
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

const handleTweetProcessingState = (message: ProcessingStateObject): void => {
    if (message.action === "tweetProcessingError") {
        chrome.action.setBadgeText({ text: "!" }, () => {});
    } else if (message.action === "tweetProcessingSuccess") {
        chrome.action.setBadgeText({ text: "" }, () => {});
    }
};

chrome.runtime.onMessage.addListener(handleTweetProcessingState);
chrome.action.setBadgeBackgroundColor({ color: [201, 48, 48, 255] });

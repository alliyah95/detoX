import { setExtensionState } from "../utils";

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

type ProcessingState = "tweetProcessingError" | "tweetProcessingSuccess";
interface Message {
    action?: ProcessingState;
}

const handleTweetProcessingState = (message: Message): void => {
    if (message.action === "tweetProcessingError") {
        chrome.action.setBadgeText({ text: "!" }, () => {});
    } else if (message.action === "tweetProcessingSuccess") {
        chrome.action.setBadgeText({ text: "" }, () => {});
    }
};

chrome.runtime.onMessage.addListener(handleTweetProcessingState);
chrome.action.setBadgeBackgroundColor({ color: [201, 48, 48, 255] });

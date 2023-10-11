import { setExtensionState, sendTweetToServer } from "../utils";
import { ProcessingStateObject } from "../utils/types";

/**
 * Turns the extension on upon installation.
 */
chrome.runtime.onInstalled.addListener(() => {
    sendTweetToServer("");
    setExtensionState(true);
});

/**
 * Checks the currently active tab in the user's browser
 */
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

/**
 * Updates the browser extension's badge when an error occurs
 * @param message - An object containing a key "action" that can either equal to
 *                 "tweetProcessingError" or "tweetProcessingSuccess"
 */
const handleTweetProcessingState = (message: ProcessingStateObject): void => {
    if (message.action === "tweetProcessingError") {
        chrome.action.setBadgeText({ text: "!" }, () => {});
    } else if (message.action === "tweetProcessingSuccess") {
        chrome.action.setBadgeText({ text: "" }, () => {});
    }
};
chrome.runtime.onMessage.addListener(handleTweetProcessingState);
chrome.action.setBadgeBackgroundColor({ color: [201, 48, 48, 255] });

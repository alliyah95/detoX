import {
    sendTweetToServer,
    getExtensionState,
    getCurrentUsername,
    isAccountPrivate,
    isPostedByCurrentUser,
    isFromNewsOutlet,
    extractTweetBody,
    createOverlayElement,
    getTwitterTheme,
    isElectionRelated,
    initialScroll,
} from "../utils";

import { TwitterTheme } from "../utils/types";

/**
 * Retrieves the currently loaded tweets on the active Twitter webpage.
 */
const detectNewTweets = async (): Promise<void> => {
    const theme: TwitterTheme = getTwitterTheme();

    const elements = document.getElementsByClassName(theme);
    for (let index = 0; index < elements.length; index++) {
        const currentUser = `@${getCurrentUsername()}`;
        const tweet = elements[index] as HTMLDivElement;

        if (
            tweet.hasAttribute("data-tweet-processed") ||
            isAccountPrivate(tweet) ||
            isPostedByCurrentUser(tweet, currentUser) ||
            isFromNewsOutlet(tweet) ||
            !isElectionRelated(tweet)
        ) {
            continue;
        }

        try {
            tweet.setAttribute("data-tweet-processed", "true");
            const tweetBodyWrapper = tweet.querySelector(
                'div.css-1dbjc4n > div[data-testid="tweetText"]'
            ) as HTMLDivElement;
            const tweetBody = extractTweetBody(tweetBodyWrapper);

            if (tweetBody) {
                const result = await sendTweetToServer(tweetBody);

                if (result === 1) {
                    const overlayElement = createOverlayElement(tweet);
                    tweet.style.position = "relative";
                    tweet.style.paddingTop = "20px";
                    tweet.style.paddingBottom = "24px";
                    tweet.appendChild(overlayElement);
                }
                chrome.runtime.sendMessage({
                    action: "tweetProcessingSuccess",
                });
            }
        } catch (err) {
            chrome.runtime.sendMessage({ action: "tweetProcessingError" });
        }
    }
};

/**
 * Enables the extension by adding event listeners to the docoument and window objects.
 */
const enableExtension = (): void => {
    document.addEventListener("DOMContentLoaded", detectNewTweets);
    window.addEventListener("scroll", detectNewTweets);
    initialScroll();
};

/**
 * Disables the extension by removing the event listeners from the docoument and window objects.
 */
const disableExtension = (): void => {
    document.removeEventListener("DOMContentLoaded", detectNewTweets);
    window.removeEventListener("scroll", detectNewTweets);
};

/**
 * Retrieves the stored extension state from the Chrome storage and configures it accordingly.
 */
const setInitialExtensionState = async (): Promise<void> => {
    const isExtensionEnabled = await getExtensionState();
    if (isExtensionEnabled) {
        enableExtension();
    } else {
        disableExtension();
    }
};
setInitialExtensionState();

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.state !== undefined) {
        const state = message.state;
        if (state) {
            enableExtension();
        } else {
            disableExtension();
        }
    }
});

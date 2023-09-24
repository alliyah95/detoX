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
} from "../utils";

import { TwitterTheme } from "../utils/types";

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

const scrollFunction = (): void => {
    chrome.runtime.sendMessage({ action: "checkTwitter" }, (response) => {
        if (response.isTwitter) {
            setInterval(() => {
                window.scrollBy(0, 1 / 2);
            }, 1000);
        }
    });
};

const enableExtension = (): void => {
    document.addEventListener("DOMContentLoaded", detectNewTweets);
    window.addEventListener("scroll", detectNewTweets);
};

const disableExtension = (): void => {
    document.removeEventListener("DOMContentLoaded", detectNewTweets);
    window.removeEventListener("scroll", detectNewTweets);
};

const setInitialExtensionState = async (): Promise<void> => {
    const isExtensionEnabled = await getExtensionState();
    if (isExtensionEnabled) {
        enableExtension();
        scrollFunction();
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
            scrollFunction();
        } else {
            disableExtension();
        }
    }
});
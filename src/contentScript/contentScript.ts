import {
    sendTweetToServer,
    setStoredAllTimeTweetCount,
    getStoredAllTimeTweetCount,
    getExtensionState,
    getCurrentUsername,
    isAccountPrivate,
    isPostedByCurrentUser,
    isFromNewsOutlet,
    extractTweetBody,
    createOverlayElement,
    getTwitterTheme,
} from "../utils";

let initialAllTimeTweetCount = 0;
let sessionTweetCount = 0;

getStoredAllTimeTweetCount().then((count) => {
    initialAllTimeTweetCount = count.allTimeTweetCount;
});

const detectNewTweets = async (): Promise<void> => {
    const theme = getTwitterTheme();
    const themes = {
        white: "css-1dbjc4n r-j5o65s r-qklmqi r-1adg3ll r-1ny4l3l",
        dim: "css-1dbjc4n r-1ila09b r-qklmqi r-1adg3ll r-1ny4l3l",
        dark: "css-1dbjc4n r-1igl3o0 r-qklmqi r-1adg3ll r-1ny4l3l",
    };
    const classNames = themes[theme] || themes.dark;

    const elements = document.getElementsByClassName(classNames);
    for (let index = 0; index < elements.length; index++) {
        const currentUser = `@${getCurrentUsername()}`;
        const tweet = elements[index] as HTMLDivElement;

        if (
            // TODO
            // check if tweet is election-related before sending to server
            isFromNewsOutlet(tweet) ||
            isPostedByCurrentUser(tweet, currentUser) ||
            isAccountPrivate(tweet) ||
            tweet.hasAttribute("data-tweet-processed")
        ) {
            continue;
        }

        try {
            tweet.setAttribute("data-tweet-processed", "true");
            const tweetBody = extractTweetBody(tweet);
            const result = await sendTweetToServer(tweetBody);

            if (result === 1) {
                const overlayElement = createOverlayElement(tweet);
                tweet.style.position = "relative";
                tweet.style.paddingTop = "20px";
                tweet.style.paddingBottom = "24px";
                tweet.appendChild(overlayElement);

                sessionTweetCount++;
                setStoredAllTimeTweetCount(
                    initialAllTimeTweetCount + sessionTweetCount
                );
            }
            chrome.runtime.sendMessage({ action: "tweetProcessingSuccess" });
        } catch (err) {
            chrome.runtime.sendMessage({ action: "tweetProcessingError" });
        }
    }
};

const scrollFunction = (): void => {
    setTimeout(() => {
        window.scrollBy(10, 10);
    }, 1000);
};

const enableExtension = (): void => {
    document.addEventListener("DOMContentLoaded", detectNewTweets);
    window.addEventListener("load", scrollFunction);
    window.addEventListener("scroll", detectNewTweets);

    // const handleStorageChange = (changes: any, namespace: string) => {
    //     if (changes.dailyTweetCount && namespace === "local") {
    //         if (changes.dailyTweetCount.newValue === 0) {
    //             sessionDailyTweetCount = 0;
    //             sessionAllTimeTweetCount = 0;
    //             initialDailyTweetCount = 0;
    //             initialAllTimeTweetCount = 0;
    //         }
    //     }
    // };
    // chrome.storage.onChanged.addListener(handleStorageChange);
};

const disableExtension = (): void => {
    document.removeEventListener("DOMContentLoaded", detectNewTweets);
    window.removeEventListener("load", scrollFunction);
    window.removeEventListener("scroll", detectNewTweets);
};

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

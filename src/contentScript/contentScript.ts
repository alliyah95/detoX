import {
    sendTweetToServer,
    setStoredAllTimeTweetCount,
    getStoredAllTimeTweetCount,
    getExtensionState,
    getCurrentUsername,
    isAccountPrivate,
    isPostedByCurrentUser,
} from "../utils";

let initialAllTimeTweetCount = 0;
let sessionTweetCount = 0;

getStoredAllTimeTweetCount().then((count) => {
    initialAllTimeTweetCount = count.allTimeTweetCount;
});

const detectNewTweets = async (): Promise<void> => {
    const elements = document.getElementsByClassName(
        "css-1dbjc4n r-1igl3o0 r-qklmqi r-1adg3ll r-1ny4l3l"
    );

    for (let index = 0; index < elements.length; index++) {
        const currentUser = `@${getCurrentUsername()}`;
        const tweet = elements[index] as HTMLDivElement;

        if (
            isPostedByCurrentUser(tweet, currentUser) ||
            isAccountPrivate(tweet) ||
            tweet.hasAttribute("data-tweet-processed")
        ) {
            continue;
        }

        try {
            tweet.setAttribute("data-tweet-processed", "true");

            // TODO
            // check if tweet is election-related before sending to server

            const result = await sendTweetToServer(tweet.textContent);
            if (result === 1) {
                // TODO
                // hide tweet instead of just changing the background color
                tweet.style.backgroundColor = "red";

                sessionTweetCount++;
                setStoredAllTimeTweetCount(
                    initialAllTimeTweetCount + sessionTweetCount
                );
            }
        } catch (err) {}
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

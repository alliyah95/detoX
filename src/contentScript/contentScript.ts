import { sendTweetToServer } from "../utils/api";
import { setStoredTweetCount, getStoredTweetCount } from "../utils/storage";

let initialDailyTweetCount = 0;
let initialAllTimeTweetCount = 0;
let sessionTweetCount = 0;

getStoredTweetCount().then((count) => {
    initialDailyTweetCount = count.dailyTweetCount;
    initialAllTimeTweetCount = count.allTimeTweetCount;
});

const detectNewTweets = async (): Promise<void> => {
    const elements = document.getElementsByClassName(
        "css-1dbjc4n r-1igl3o0 r-qklmqi r-1adg3ll r-1ny4l3l"
    );

    for (let index = 0; index < elements.length; index++) {
        const tweet = elements[index] as HTMLDivElement;

        if (tweet.hasAttribute("data-tweet-processed")) {
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
                setStoredTweetCount(
                    sessionTweetCount + initialDailyTweetCount,
                    sessionTweetCount + initialAllTimeTweetCount
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

    const handleStorageChange = (changes: any, namespace: string) => {
        if (changes.dailyTweetCount && namespace === "local") {
            if (changes.dailyTweetCount.newValue === 0) {
                // TODO fix:
                // pag nireset yung sessionTweetCount naaapektuhan yung
                // AllTimeTweetCount
                sessionTweetCount = 0;
                initialDailyTweetCount = 0;
            }
        }
    };
    chrome.storage.onChanged.addListener(handleStorageChange);
};

enableExtension();

const disableExtension = (): void => {
    document.removeEventListener("DOMContentLoaded", detectNewTweets);
    window.removeEventListener("load", scrollFunction);
    window.removeEventListener("scroll", detectNewTweets);
};

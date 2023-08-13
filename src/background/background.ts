import { setStoredTweetCount } from "../utils/storage";

chrome.runtime.onInstalled.addListener(() => {
    // default count to 0
    setStoredTweetCount(0, 0);
});

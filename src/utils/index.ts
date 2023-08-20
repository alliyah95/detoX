import { sendTweetToServer } from "./api";
import {
    getCurrentTab,
    getCurrentUsername,
    sendExtensionStateToContentScript,
} from "./general";
import {
    setExtensionState,
    getExtensionState,
    setStoredAllTimeTweetCount,
    getStoredAllTimeTweetCount,
} from "./storage";

export {
    sendTweetToServer,
    sendExtensionStateToContentScript,
    getExtensionState,
    setExtensionState,
    getStoredAllTimeTweetCount,
    setStoredAllTimeTweetCount,
    getCurrentTab,
    getCurrentUsername,
};

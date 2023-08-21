import { sendTweetToServer } from "./api";
import {
    getCurrentTab,
    getCurrentUsername,
    sendExtensionStateToContentScript,
    isAccountPrivate,
    isPostedByCurrentUser,
    extractTweetAuthor,
} from "./general";
import {
    setExtensionState,
    getExtensionState,
    setStoredAllTimeTweetCount,
    getStoredAllTimeTweetCount,
} from "./storage";
import { isFromNewsOutlet } from "./filters";
import { mediaDirectory } from "./media-directory";

export {
    sendTweetToServer,
    sendExtensionStateToContentScript,
    getExtensionState,
    setExtensionState,
    getStoredAllTimeTweetCount,
    setStoredAllTimeTweetCount,
    getCurrentTab,
    getCurrentUsername,
    extractTweetAuthor,
    isAccountPrivate,
    isPostedByCurrentUser,
    isFromNewsOutlet,
    mediaDirectory,
};

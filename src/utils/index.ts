import { sendTweetToServer } from "./api";
import { getCurrentTab, sendExtensionStateToContentScript } from "./general";
import {
    setExtensionState,
    getExtensionState,
    setStoredAllTimeTweetCount,
    getStoredAllTimeTweetCount,
} from "./storage";
import {
    isElectionRelated,
    isFromNewsOutlet,
    isAccountPrivate,
    isPostedByCurrentUser,
} from "./filters";
import { mediaDirectory } from "./media-directory";
import {
    getCurrentUsername,
    extractTweetAuthor,
    extractTweetBody,
    createOverlayElement,
    getTwitterTheme,
} from "./dom";

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
    extractTweetBody,
    createOverlayElement,
    getTwitterTheme,
    isElectionRelated,
    isAccountPrivate,
    isPostedByCurrentUser,
    isFromNewsOutlet,
    mediaDirectory,
};

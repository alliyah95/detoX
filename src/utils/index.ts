import { sendTweetToServer } from "./api";
import {
    getCurrentTab,
    sendExtensionStateToContentScript,
    initialScroll,
} from "./general";
import { setExtensionState, getExtensionState } from "./storage";
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
    initialScroll,
    getExtensionState,
    setExtensionState,
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

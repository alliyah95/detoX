import { mediaDirectory, extractTweetAuthor, extractTweetBody } from "../utils";
import { electionDirectory } from "./election-directory";

/**
 * Checks whether a tweet contains any of the keywords listed in electionDirectory
 * @param tweet - the HTML markup of a tweet
 * @returns true if the tweet contains any of the keywords listed in electionDirectory, otherwise false
 */
const isElectionRelated = (tweet: HTMLDivElement): boolean => {
    const tweetBody = extractTweetBody(tweet);

    for (const substring of electionDirectory) {
        if (String(tweetBody).toLowerCase().includes(substring.toLowerCase())) {
            return true;
        }
    }
    return false;
};

/**
 * Checks whether the author of a tweet is in mediaDirectory
 * @param tweet - the HTML markup of a tweet
 * @returns true if the tweet's author is listed in mediaDirectory, otherwise false
 */
const isFromNewsOutlet = (tweet: HTMLDivElement): boolean => {
    const tweetAuthor = extractTweetAuthor(tweet);
    return mediaDirectory.includes(tweetAuthor);
};

/**
 * Checks whether a tweet is authored by a private account
 * @param tweet - the HTML markup of a tweet
 * @returns true if a tweet is authored by a private account, otherwise false
 */
const isAccountPrivate = (tweet: HTMLDivElement): boolean => {
    return (
        tweet.querySelectorAll('[aria-label="Protected account"]').length > 0
    );
};

/**
 * Checks whether a tweet is posted by the currently logged in user
 * @param tweet  - the HTML markup of a tweet
 * @param currentUser - the username of the currently logged in user
 * @returns true if the author of the tweet and the currently logged in user are the same, otherwise false
 */
const isPostedByCurrentUser = (
    tweet: HTMLDivElement,
    currentUser: string
): boolean => {
    const tweetAuthor = extractTweetAuthor(tweet);
    return currentUser === tweetAuthor;
};

export {
    isElectionRelated,
    isFromNewsOutlet,
    isAccountPrivate,
    isPostedByCurrentUser,
};

import { mediaDirectory, extractTweetAuthor, extractTweetBody} from "../utils";
import { electionDirectory } from "./election-directory";

const isElectionRelated = (tweet: HTMLDivElement): boolean => {
    const tweetBody = extractTweetBody(tweet);

        for (const substring of electionDirectory) {
            if (String(tweetBody).toLowerCase().includes(substring.toLowerCase())) {
                return true;
            }
        }
        return false;
}

const isFromNewsOutlet = (tweet: HTMLDivElement): boolean => {
    const tweetAuthor = extractTweetAuthor(tweet);
    return mediaDirectory.includes(tweetAuthor);
};

const isAccountPrivate = (tweet: HTMLDivElement): boolean => {
    return (
        tweet.querySelectorAll('[aria-label="Protected account"]').length > 0
    );
};

const isPostedByCurrentUser = (
    tweet: HTMLDivElement,
    currentUser: string
): boolean => {
    const tweetAuthor = extractTweetAuthor(tweet);
    return currentUser === tweetAuthor;
};

export { isElectionRelated, isFromNewsOutlet, isAccountPrivate, isPostedByCurrentUser };

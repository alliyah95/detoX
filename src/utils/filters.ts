import { mediaDirectory, extractTweetAuthor } from "../utils";

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

export { isFromNewsOutlet, isAccountPrivate, isPostedByCurrentUser };

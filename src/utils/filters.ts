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
    const tweetContent = tweet.innerText.split("\n");
    const tweetAuthor =
        tweetContent[tweetContent[0].includes("reposted") ? 2 : 1];
    return currentUser === tweetAuthor;
};

export { isFromNewsOutlet, isAccountPrivate, isPostedByCurrentUser };

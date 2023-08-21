import { mediaDirectory, extractTweetAuthor } from "../utils";

const isFromNewsOutlet = (tweet: HTMLDivElement): boolean => {
    const tweetAuthor = extractTweetAuthor(tweet);
    return mediaDirectory.includes(tweetAuthor);
};

export { isFromNewsOutlet };

import { nanoid } from "nanoid";
import { TwitterTheme, TweetBodyWrapper } from "./types";

/**
 * Retrieves the username of the currently logged in user
 * @returns the username of the currently logged in user
 */
const getCurrentUsername = (): string => {
    const loggedInIndicator = document.querySelector(
        '[data-testid="SideNav_AccountSwitcher_Button"]'
    );

    if (loggedInIndicator) {
        const usernameContainer = document.querySelector(
            '[data-testid^="UserAvatar-Container-"]'
        );

        if (usernameContainer) {
            const dataTestId = usernameContainer.getAttribute("data-testid");
            const username = dataTestId.split("-").pop();
            return username;
        }
    }
};

/**
 * Retrieves the author of a tweet. If tweet is a repost, the author
 * of the orignal tweet is retrieved.
 * @param tweet - the HTML markup of the tweet.
 * @returns the author of a tweet.
 */
const extractTweetAuthor = (tweet: HTMLDivElement): string => {
    const tweetContent = tweet.innerText.split("\n");
    const tweetAuthor =
        tweetContent[tweetContent[0].includes("reposted") ? 2 : 1];
    return tweetAuthor;
};

/**
 * Extracts the text content of a tweet
 * @param tweetBodyWrapper : the HTML markup of the tweet
 * @returns the text content of a tweet with segemented hashtags and masked URLs and usernames
 */
const extractTweetBody = (tweetBodyWrapper: TweetBodyWrapper): string => {
    try {
        let text = "";
        const childNodes = tweetBodyWrapper.childNodes;

        childNodes.forEach((child) => {
            if (child.nodeType === Node.TEXT_NODE) {
                text += child.textContent.replace(/\n/g, "");
            } else if (child.nodeType === Node.ELEMENT_NODE) {
                text += extractTweetBody(child);
            }
        });

        const extractedHashtags = text.replace(/(^|\s)(#)+/g, "$1 ");
        let maskedUsernames = extractedHashtags.replace(
            /@\w+\b/g,
            "[USERNAME]"
        );

        const urlRegex = /https?:\/\/\S+/g;
        const urls = maskedUsernames.match(urlRegex);
        if (urls) {
            urls.forEach((url) => {
                maskedUsernames = maskedUsernames.replace(url, "[URL]");
            });
        }

        return maskedUsernames;
    } catch (err) {
        return " ";
    }
};

/**
 * Removes the warning screen placed over the tweet
 * @param overlayId - the nanoid generated and assigned to a processed tweet
 */
const handleViewBtn = (overlayId: string): void => {
    const targetElement = document.querySelector(
        `[data-overlay-for="${overlayId}"]`
    ) as HTMLDivElement;
    targetElement.remove();
};

/**
 * Creates a paragraph element containing the message for the warning screen
 * @returns a paragraph element containing the message for the warning screen
 */
const createMessageElement = (): HTMLParagraphElement => {
    const message = document.createElement("p");
    message.innerHTML =
        "This tweet has been hidden by <b><span style='text-decoration: underline;'>detoX<span></b> as it potentially contains hateful content.";
    message.style.color = "#ffffff";
    message.style.padding = "0 20px";
    message.style.textAlign = "center";
    message.style.fontFamily = "Arial, sans-serif";
    message.style.fontSize = "14px";
    message.style.maxWidth = "300px";

    return message;
};

/**
 * Creates a button element for the warning screen
 * @returns a button element for the warning screen
 */
const createBtnElement = (): HTMLButtonElement => {
    const viewBtn = document.createElement("button");
    viewBtn.style.backgroundColor = "#ffffff";
    viewBtn.style.color = "#1D9BF0";
    viewBtn.style.border = "none";
    viewBtn.style.padding = "10px 20px";
    viewBtn.style.borderRadius = "999px";
    viewBtn.style.cursor = "pointer";
    viewBtn.style.fontFamily = "Arial, sans-serif";
    viewBtn.style.fontSize = "14px";
    viewBtn.style.marginTop = "2px";
    viewBtn.style.display = "flex";
    viewBtn.style.alignItems = "center";
    viewBtn.style.justifyContent = "center";
    viewBtn.style.gap = "4px";
    viewBtn.style.fontSize = "14px";
    viewBtn.style.fontWeight = "bold";
    viewBtn.textContent = "Show tweet anyway";

    return viewBtn;
};

/**
 * Creates the warning screen
 * @param tweet - the HTML markup of a tweet
 * @returns an HTML Div element that will serve as a warning screen for tweets identified as hate speech
 */
const createOverlayElement = (tweet: HTMLDivElement): HTMLDivElement => {
    const overlayElement = document.createElement("div");
    overlayElement.style.position = "absolute";
    overlayElement.style.top = "0";
    overlayElement.style.left = "0";
    overlayElement.style.width = "100%";
    overlayElement.style.height = "100%";
    overlayElement.style.backgroundColor = "#1D9BF0";

    overlayElement.style.display = "flex";
    overlayElement.style.flexDirection = "column";
    overlayElement.style.alignItems = "center";
    overlayElement.style.justifyContent = "center";

    const message = createMessageElement();
    const viewBtn = createBtnElement();

    const overlayId = nanoid();
    overlayElement.setAttribute("data-overlay-for", overlayId);
    viewBtn.setAttribute("data-btn-for", overlayId);
    viewBtn.addEventListener("click", () => {
        handleViewBtn(overlayId);
        tweet.style.paddingTop = "initial";
        tweet.style.paddingBottom = "initial";
    });

    overlayElement.appendChild(message);
    overlayElement.appendChild(viewBtn);

    return overlayElement;
};

/**
 * Retrieves the Twitter theme of the user
 * @returns the selectors used for retrieving tweets based from the user's Twitter theme
 */
const getTwitterTheme = (): TwitterTheme => {
    const bodyBackgroundColor = getComputedStyle(document.body).backgroundColor;
    if (bodyBackgroundColor === "rgb(21, 32, 43)") {
        return TwitterTheme.Dim;
    } else if (bodyBackgroundColor === "rgb(255, 255, 255)") {
        return TwitterTheme.White;
    } else {
        return TwitterTheme.Dark;
    }
};

export {
    getCurrentUsername,
    extractTweetAuthor,
    extractTweetBody,
    createOverlayElement,
    getTwitterTheme,
};

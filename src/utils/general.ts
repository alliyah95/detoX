const sendExtensionStateToContentScript = (state: boolean) => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        const activeTab = tabs[0];
        if (activeTab) {
            chrome.tabs.sendMessage(activeTab.id, {
                state: state,
            });
        }
    });
};

const getCurrentTab = async () => {
    let queryOptions = { active: true, lastFocusedWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
};

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

const extractTweetAuthor = (tweet: HTMLDivElement): string => {
    const tweetContent = tweet.innerText.split("\n");
    const tweetAuthor =
        tweetContent[tweetContent[0].includes("reposted") ? 2 : 1];
    return tweetAuthor;
};

const extractTweetBody = (tweet: HTMLDivElement): string => {
    const tweetBodyWrapper = tweet.querySelector(
        'div.css-1dbjc4n > div[data-testid="tweetText"]'
    );

    try {
        const spanElements = tweetBodyWrapper.getElementsByTagName("span");
        const tweetBody = [];

        [...spanElements].forEach((element: HTMLSpanElement) => {
            const text = element.innerText;
            const noNewLines = text.replace(/\n/g, " ");

            if (noNewLines.trim().length > 0) {
                tweetBody.push(noNewLines);
            }
        });

        return tweetBody.join(" ");
    } catch (err) {
        return "";
    }
};

const createOverlayElement = (): HTMLDivElement => {
    const overlayElement = document.createElement("div");
    overlayElement.style.position = "absolute";
    overlayElement.style.top = "0";
    overlayElement.style.left = "0";
    overlayElement.style.width = "100%";
    overlayElement.style.height = "100%";
    overlayElement.style.backgroundColor = "#0051ce";

    overlayElement.style.display = "flex";
    overlayElement.style.alignItems = "center";
    overlayElement.style.justifyContent = "center";

    const message = document.createElement("p");
    message.innerHTML =
        "This tweet has been hidden by detoX as <br>it potentially contains hateful content";
    message.style.color = "#ffffff";
    message.style.padding = "20px";
    message.style.textAlign = "center";
    message.style.fontFamily = "Arial, sans-serif";

    overlayElement.appendChild(message);
    return overlayElement;
};

export {
    getCurrentTab,
    getCurrentUsername,
    sendExtensionStateToContentScript,
    extractTweetAuthor,
    extractTweetBody,
    createOverlayElement,
};

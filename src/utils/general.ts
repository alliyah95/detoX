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
export {
    getCurrentTab,
    getCurrentUsername,
    sendExtensionStateToContentScript,
    extractTweetAuthor,
    extractTweetBody,
};

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

export {
    getCurrentTab,
    getCurrentUsername,
    isAccountPrivate,
    isPostedByCurrentUser,
    sendExtensionStateToContentScript,
};

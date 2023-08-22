import { nanoid } from "nanoid";

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

const handleViewBtn = (overlayId: string): void => {
    const targetElement = document.querySelector(
        `[data-overlay-for="${overlayId}"]`
    ) as HTMLDivElement;
    targetElement.remove();
};

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

export {
    getCurrentTab,
    getCurrentUsername,
    sendExtensionStateToContentScript,
    extractTweetAuthor,
    extractTweetBody,
    createOverlayElement,
};

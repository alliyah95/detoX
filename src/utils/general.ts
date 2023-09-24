/**
 * Sends the extension state to configure the browser extension accordingly
 * @param state - true if extension is enabled, otherwise false
 */
const sendExtensionStateToContentScript = (state: boolean): void => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        const activeTab = tabs[0];
        if (activeTab) {
            chrome.tabs.sendMessage(activeTab.id, {
                state: state,
            });
        }
    });
};

/**
 * Retrieves the currently active tab in the user's browser
 * @returns information about the currently active tab
 */
const getCurrentTab = async () => {
    let queryOptions = { active: true, lastFocusedWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
};

export { getCurrentTab, sendExtensionStateToContentScript };

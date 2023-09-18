interface LocalStorage {
    extensionEnabled?: boolean;
}

const setExtensionState = (extensionEnabled: boolean): Promise<void> => {
    return new Promise<void>((resolve) => {
        const vals: LocalStorage = {
            extensionEnabled,
        };
        chrome.storage.local.set(vals, () => {
            resolve();
        });
    });
};

const getExtensionState = (): Promise<boolean> => {
    return new Promise((resolve) => {
        chrome.storage.local.get("extensionEnabled", (result) => {
            const state = result.extensionEnabled;
            resolve(state);
        });
    });
};

export { setExtensionState, getExtensionState };

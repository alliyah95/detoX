interface LocalStorage {
    allTimeTweetCount?: number;
    extensionEnabled?: boolean;
}

type LocalStorageKeys = keyof LocalStorage;

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

const setStoredAllTimeTweetCount = (
    allTimeTweetCount: number
): Promise<void> => {
    const vals: LocalStorage = {
        allTimeTweetCount,
    };
    return new Promise((resolve) => {
        chrome.storage.local.set(vals, () => {
            resolve();
        });
    });
};

const getStoredAllTimeTweetCount = (): Promise<LocalStorage> => {
    const keys: LocalStorageKeys[] = ["allTimeTweetCount"];
    return new Promise((resolve) => {
        chrome.storage.local.get(keys, (res: LocalStorage) => {
            const allTimeTweetCount = res.allTimeTweetCount;
            resolve({ allTimeTweetCount });
        });
    });
};

export {
    setStoredAllTimeTweetCount,
    getStoredAllTimeTweetCount,
    setExtensionState,
    getExtensionState,
};

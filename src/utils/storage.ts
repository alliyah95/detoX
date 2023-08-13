interface LocalStorage {
    detectedTweetsCount: number;
}

type LocalStorageKeys = keyof LocalStorage;

const setStoredTweetCount = (detectedTweetsCount: number): Promise<void> => {
    const vals: LocalStorage = {
        detectedTweetsCount,
    };
    return new Promise((resolve) => {
        chrome.storage.local.set(vals, () => {
            resolve();
        });
    });
};

const getStoredTweetCount = (): Promise<number> => {
    const keys: LocalStorageKeys[] = ["detectedTweetsCount"];
    return new Promise((resolve) => {
        chrome.storage.local.get(keys, (res: LocalStorage) => {
            resolve(res.detectedTweetsCount);
        });
    });
};

export { LocalStorage, setStoredTweetCount, getStoredTweetCount };

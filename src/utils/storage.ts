interface LocalStorage {
    dailyTweetCount: number;
    allTimeTweetCount: number;
}

type LocalStorageKeys = keyof LocalStorage;

const setStoredTweetCount = (
    dailyTweetCount: number,
    allTimeTweetCount: number
): Promise<void> => {
    const vals: LocalStorage = {
        dailyTweetCount,
        allTimeTweetCount,
    };
    return new Promise((resolve) => {
        chrome.storage.local.set(vals, () => {
            resolve();
        });
    });
};

const getStoredTweetCount = (): Promise<LocalStorage> => {
    const keys: LocalStorageKeys[] = ["dailyTweetCount", "allTimeTweetCount"];
    return new Promise((resolve) => {
        chrome.storage.local.get(keys, (res: LocalStorage) => {
            const dailyTweetCount = res.dailyTweetCount;
            const allTimeTweetCount = res.allTimeTweetCount;
            resolve({ dailyTweetCount, allTimeTweetCount });
        });
    });
};

export { LocalStorage, setStoredTweetCount, getStoredTweetCount };

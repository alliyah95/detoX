interface LocalStorage {
    allTimeTweetCount: number;
}

type LocalStorageKeys = keyof LocalStorage;

// const resetDailyTweetCount = (): Promise<void> => {
//     const newData = {
//         dailyTweetCount: 0,
//     };

//     console.log("here");

//     return new Promise((resolve) => {
//         chrome.storage.local.set(newData, () => {
//             console.log("reset func");
//             resolve();
//         });
//     });
// };

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

export { LocalStorage, setStoredAllTimeTweetCount, getStoredAllTimeTweetCount };

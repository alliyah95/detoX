import React, { useEffect, useState } from "react";
import { LocalStorage } from "../utils/storage";
import { getStoredTweetCount } from "../utils/storage";

export const ExtensionDataContext = React.createContext<LocalStorage>({
    detectedTweetsCount: 0,
});

export const ExtensionDataProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [tweetCount, setTweetCount] = useState<number | null>(null);

    useEffect(() => {
        getStoredTweetCount().then((count) => {
            setTweetCount(count);
        });

        const handleStorageChange = (changes: any, namespace: string) => {
            if (changes.detectedTweetsCount && namespace === "local") {
                console.log(changes.detectedTweetsCount.newValue);
                setTweetCount(changes.detectedTweetsCount.newValue);
            }
        };
        chrome.storage.onChanged.addListener(handleStorageChange);

        return () => {
            chrome.storage.onChanged.removeListener(handleStorageChange);
        };
    }, []);

    const extensionDataObj: LocalStorage = {
        detectedTweetsCount: tweetCount,
    };

    return (
        <ExtensionDataContext.Provider value={extensionDataObj}>
            {children}
        </ExtensionDataContext.Provider>
    );
};

import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./popup.css";
import { BodyWrapper, CounterCard, Header } from "./components";
import {
    getExtensionState,
    getStoredAllTimeTweetCount,
} from "../utils/storage";

type CountState = "fetching" | "ready";

const App: React.FC<{}> = () => {
    const [sessionTweetCount, setSessionTweetCount] = useState<number>(0);
    const [allTimeTweetCount, setAllTimeTweetCount] = useState<number | null>(
        null
    );
    const [countState, setCountState] = useState<CountState>("fetching");
    const [extensionState, setExtensionState] = useState<boolean | null>(null);

    useEffect(() => {
        getStoredAllTimeTweetCount().then((tweetCounts) => {
            const allTimeCount = tweetCounts.allTimeTweetCount;

            setAllTimeTweetCount(allTimeCount);
            setCountState("ready");
        });

        getExtensionState().then((state) => {
            setExtensionState(state);
        });

        // storage listener
        const handleStorageChange = (changes: any, namespace: string) => {
            if (changes.allTimeTweetCount && namespace === "local") {
                if (
                    changes.allTimeTweetCount &&
                    changes.allTimeTweetCount.newValue
                ) {
                    setAllTimeTweetCount(changes.allTimeTweetCount.newValue);
                }
            }
        };
        chrome.storage.onChanged.addListener(handleStorageChange);

        return () => {
            chrome.storage.onChanged.removeListener(handleStorageChange);
        };
    }, []);

    return (
        <div>
            <Header extensionState={extensionState} />
            <BodyWrapper>
                <CounterCard
                    heading="ON THIS PAGE"
                    tweetCount={
                        countState === "ready"
                            ? sessionTweetCount
                            : "Loading..."
                    }
                />
                <CounterCard
                    heading="SINCE INSTALL"
                    tweetCount={
                        countState === "ready"
                            ? allTimeTweetCount
                            : "Loading..."
                    }
                />
            </BodyWrapper>
        </div>
    );
};

const container = document.createElement("div");
document.body.appendChild(container);
const root = createRoot(container);
root.render(<App />);

import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./popup.css";
import { BodyWrapper, CounterCard, Header } from "./components";
import { getStoredTweetCount } from "../utils/storage";

type CountState = "fetching" | "ready";

const App: React.FC<{}> = () => {
    const [dailyTweetCount, setDailyTweetCount] = useState<number | null>(null);
    const [allTimeTweetCount, setAllTimeTweetCount] = useState<number | null>(
        null
    );
    const [countState, setCountState] = useState<CountState>("fetching");

    useEffect(() => {
        getStoredTweetCount().then((tweetCounts) => {
            const dailyCount = tweetCounts.dailyTweetCount;
            const allTimeCount = tweetCounts.allTimeTweetCount;

            setDailyTweetCount(dailyCount);
            setAllTimeTweetCount(allTimeCount);
            setCountState("ready");
        });

        // storage listener
        const handleStorageChange = (changes: any, namespace: string) => {
            if (
                (changes.dailyTweetCount || changes.allTimeTweetCount) &&
                namespace === "local"
            ) {
                if (
                    changes.dailyTweetCount &&
                    changes.dailyTweetCount.newValue
                ) {
                    setDailyTweetCount(changes.dailyTweetCount.newValue);
                }

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
            <Header />
            <BodyWrapper>
                <CounterCard
                    heading="TODAY"
                    tweetCount={
                        countState === "ready" ? dailyTweetCount : "Loading..."
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

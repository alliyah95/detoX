import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./popup.css";
import { BodyWrapper, CounterCard, Header } from "./components";
import { getStoredTweetCount } from "../utils/storage";

type CountState = "fetching" | "ready";

const App: React.FC<{}> = () => {
    const [detectedTweetsCount, setDetectedTweetsCount] = useState<
        number | null
    >(null);
    const [countState, setCountState] = useState<CountState>("fetching");

    useEffect(() => {
        getStoredTweetCount().then((count) => {
            setDetectedTweetsCount(count);
            setCountState("ready");
        });

        // storage listener
        const handleStorageChange = (changes: any, namespace: string) => {
            if (changes.detectedTweetsCount && namespace === "local") {
                setDetectedTweetsCount(changes.detectedTweetsCount.newValue);
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
                        countState === "ready"
                            ? detectedTweetsCount
                            : "Loading..."
                    }
                />
                <CounterCard
                    heading="SINCE INSTALL"
                    tweetCount={
                        countState === "ready"
                            ? detectedTweetsCount
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

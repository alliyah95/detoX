import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./popup.css";
import {
    BodyWrapper,
    CounterCard,
    ErrorMessage,
    Header,
    HeaderWrapper,
    Toggle,
} from "./components";
import {
    getExtensionState,
    getStoredAllTimeTweetCount,
    sendExtensionStateToContentScript,
    getCurrentTab,
} from "../utils";

type CountState = "fetching" | "ready";

const App: React.FC<{}> = () => {
    const [sessionTweetCount, setSessionTweetCount] = useState<number>(0);
    const [allTimeTweetCount, setAllTimeTweetCount] = useState<number | null>(
        null
    );
    const [countState, setCountState] = useState<CountState>("fetching");
    const [extensionState, setExtensionState] = useState<boolean | null>(false);
    const [isTabOnTwitter, setIsTabOnTwitter] = useState<boolean>(true);

    const checkActiveTab = async (): Promise<void> => {
        const activeTab = await getCurrentTab();

        setIsTabOnTwitter(
            activeTab && activeTab.url && activeTab.url.includes("twitter.com")
        );
    };

    useEffect(() => {
        getStoredAllTimeTweetCount().then((tweetCounts) => {
            const allTimeCount = tweetCounts.allTimeTweetCount;

            setAllTimeTweetCount(allTimeCount);
            setCountState("ready");
        });

        getExtensionState().then((state) => {
            setExtensionState(state);
        });

        checkActiveTab();

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

    const handleExtensionState = (newState: boolean): void => {
        setExtensionState(newState);
        sendExtensionStateToContentScript(newState);
    };

    return (
        <div>
            <HeaderWrapper>
                <Header />
                <Toggle isOn={extensionState} onChange={handleExtensionState} />
            </HeaderWrapper>

            <BodyWrapper>
                {!isTabOnTwitter && <ErrorMessage />}
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

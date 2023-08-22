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
    const [errorOccured, setErrorOccurred] = useState<boolean>(false);

    const checkActiveTab = async (): Promise<void> => {
        const activeTab = await getCurrentTab();

        setIsTabOnTwitter(
            activeTab && activeTab.url && activeTab.url.includes("twitter.com")
        );
    };

    const initializeErrorListener = (): void => {
        const handleTweetProcessingState = (message) => {
            if (message.action === "tweetProcessingError") {
                setErrorOccurred(true);
            } else if (message.action === "tweetProcessingSuccess") {
                setErrorOccurred(false);
            }
        };

        chrome.runtime.onMessage.addListener(handleTweetProcessingState);
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
        initializeErrorListener();

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
                {!isTabOnTwitter && (
                    <ErrorMessage
                        message="The current tab is not on Twitter. Please return to Twitter to
                continue detecting hate speech."
                        key={1}
                    />
                )}
                {isTabOnTwitter && errorOccured && (
                    <ErrorMessage
                        message="The detoX API is currently down. Please try again later."
                        key={2}
                    />
                )}

                <div className="heading-wrapper bg-white">
                    <h2 className="font-bold text-center text-blue">
                        Hidden Tweets
                    </h2>
                </div>

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

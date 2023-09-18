import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./popup.css";
import {
    BodyWrapper,
    ErrorMessage,
    Header,
    HeaderWrapper,
    Toggle,
} from "./components";
import {
    getExtensionState,
    sendExtensionStateToContentScript,
    getCurrentTab,
} from "../utils";

const App: React.FC<{}> = () => {
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
        getExtensionState().then((state) => {
            setExtensionState(state);
        });

        checkActiveTab();
        initializeErrorListener();
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
                        message="This extension only works on Twitter."
                        key={1}
                    />
                )}
                {isTabOnTwitter && errorOccured && (
                    <ErrorMessage
                        message="The detoX server is currently down. Please try again later."
                        key={2}
                    />
                )}
            </BodyWrapper>
        </div>
    );
};

const container = document.createElement("div");
document.body.appendChild(container);
const root = createRoot(container);
root.render(<App />);

import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./popup.css";
import {
    BodyWrapper,
    MessageBox,
    Header,
    HeaderWrapper,
    Toggle,
    InfoButton,
} from "./components";
import {
    getExtensionState,
    sendExtensionStateToContentScript,
    getCurrentTab,
} from "../utils";

import { ProcessingStateObject } from "../utils/types";

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
        const handleTweetProcessingState = (message: ProcessingStateObject) => {
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
                <div className="header-toggle">
                    <Toggle
                        isOn={extensionState}
                        onChange={handleExtensionState}
                    />
                    <InfoButton />
                </div>
            </HeaderWrapper>

            <BodyWrapper>
                {!isTabOnTwitter && (
                    <MessageBox
                        message="This extension only works on Twitter."
                        type="error"
                        key={1}
                        forceMultiline={true}
                    />
                )}
                {isTabOnTwitter && errorOccured && (
                    <MessageBox
                        message="The detoX server may be down right now or is still loading. Please wait for a moment."
                        type="error"
                        key={2}
                        forceMultiline={false}
                    />
                )}
                {isTabOnTwitter && !errorOccured && (
                    <MessageBox
                        message="A detoX a day keeps the hate speech away."
                        type="info"
                        key={3}
                        forceMultiline={true}
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

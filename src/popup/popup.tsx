import React, { useContext, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./popup.css";
import { BodyWrapper, CounterCard, Header } from "./components";
import {
    ExtensionDataProvider,
    ExtensionDataContext,
} from "../context/extension-data";
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
    }, []);

    return (
        <ExtensionDataProvider>
            <div>
                <Header />
                <BodyWrapper>
                    <CounterCard
                        tweetCount={
                            countState === "fetching"
                                ? countState
                                : detectedTweetsCount
                        }
                    />
                </BodyWrapper>
            </div>
        </ExtensionDataProvider>
    );
};

const container = document.createElement("div");
document.body.appendChild(container);
const root = createRoot(container);
root.render(<App />);

import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./popup.css";
import { BodyWrapper, CounterCard, Header } from "./components";
import { getStoredTweetCount } from "../utils/storage";

const App: React.FC<{}> = () => {
    const [detectedTweetsCount, setDetectedTweetsCount] = useState<number>(0);

    useEffect(() => {
        getStoredTweetCount().then((tweetCount) =>
            setDetectedTweetsCount(tweetCount)
        );
    }, []);

    return (
        <div>
            <Header />

            <BodyWrapper>
                <CounterCard tweetCount={detectedTweetsCount} />
            </BodyWrapper>
        </div>
    );
};

const container = document.createElement("div");
document.body.appendChild(container);
const root = createRoot(container);
root.render(<App />);

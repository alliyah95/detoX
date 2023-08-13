import React, { useContext } from "react";
import { createRoot } from "react-dom/client";
import "./popup.css";
import { BodyWrapper, CounterCard, Header } from "./components";
import {
    ExtensionDataProvider,
    ExtensionDataContext,
} from "../context/extension-data";

const App: React.FC<{}> = () => {
    const { detectedTweetsCount } = useContext(ExtensionDataContext);

    return (
        <ExtensionDataProvider>
            <div>
                <Header />
                <BodyWrapper>
                    <CounterCard tweetCount={detectedTweetsCount} />
                </BodyWrapper>
            </div>
        </ExtensionDataProvider>
    );
};

const container = document.createElement("div");
document.body.appendChild(container);
const root = createRoot(container);
root.render(<App />);

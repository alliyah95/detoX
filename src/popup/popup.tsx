import React from "react";
import { createRoot } from "react-dom/client";
import "./popup.css";
import { BodyWrapper, CounterCard, Header } from "./components";

const App: React.FC<{}> = () => {
    return (
        <div>
            <Header />

            <BodyWrapper>
                <CounterCard tweetCount={29} />
            </BodyWrapper>
        </div>
    );
};

const container = document.createElement("div");
document.body.appendChild(container);
const root = createRoot(container);
root.render(<App />);

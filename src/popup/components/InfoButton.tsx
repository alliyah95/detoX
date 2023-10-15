import React from "react";
import { QuestionMark } from "./icons";

const InfoButton: React.FC<{}> = () => {
    const handleButton = (): void => {
        chrome.tabs.create({ url: "options.html" });
    };

    return (
        <button onClick={handleButton}>
            <QuestionMark />
        </button>
    );
};

export default InfoButton;

import React from "react";
import { MessageBoxProps } from "../../utils/types";

const MessageBoxProps: React.FC<MessageBoxProps> = ({
    message,
    forceMultiline,
    icon,
}) => {
    return (
        <div
            className={`message-box-wrapper text-center ${
                forceMultiline ? "multiline" : ""
            }`}
        >
            <div className="message-icon">{icon}</div>
            <p className="message">{message}</p>
        </div>
    );
};

export default MessageBoxProps;

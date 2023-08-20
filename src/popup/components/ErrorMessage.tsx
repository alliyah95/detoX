import React from "react";

const ErrorMessage: React.FC<{}> = () => {
    return (
        <div className="error-message-wrapper text-center">
            <p className="error-message">
                The current tab is not on Twitter. Please return to Twitter to
                continue detecting hate speech.
            </p>
        </div>
    );
};

export default ErrorMessage;

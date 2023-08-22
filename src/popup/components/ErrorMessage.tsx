import React from "react";

interface ErrorMessageProps {
    message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
    return (
        <div className="error-message-wrapper text-center">
            <p className="error-message">{message}</p>
        </div>
    );
};

export default ErrorMessage;

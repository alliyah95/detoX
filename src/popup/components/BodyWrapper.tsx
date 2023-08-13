import React from "react";

const BodyWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="body-wrapper">
            <div className="heading-wrapper bg-white">
                <h2 className="font-bold text-center text-blue">
                    Hidden Tweets
                </h2>
            </div>

            {children}
        </div>
    );
};

export default BodyWrapper;

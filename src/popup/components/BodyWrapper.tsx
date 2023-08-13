import React from "react";

const BodyWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return <div className="body-wrapper">{children}</div>;
};

export default BodyWrapper;

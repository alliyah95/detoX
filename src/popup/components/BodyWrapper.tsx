import React from "react";
import { ReactNode } from "../../utils/types";

const BodyWrapper: React.FC<ReactNode> = ({ children }) => {
    return <div className="body-wrapper">{children}</div>;
};

export default BodyWrapper;

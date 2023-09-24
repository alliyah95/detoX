import React from "react";
import { ReactNode } from "../../utils/types";

const HeaderWrapper: React.FC<ReactNode> = ({ children }) => {
    return (
        <div className="header__wrapper bg-white text-center">{children}</div>
    );
};

export default HeaderWrapper;

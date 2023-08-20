import React from "react";

const HeaderWrapper: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    return (
        <div className="header__wrapper bg-white text-center">{children}</div>
    );
};

export default HeaderWrapper;

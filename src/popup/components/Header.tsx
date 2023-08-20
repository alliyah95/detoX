import React from "react";
import Toggle from "./Toggle";

const Header: React.FC<{}> = () => {
    return (
        <div className="header__wrapper bg-white text-center">
            <h1 className="header__title text-blue">detoX</h1>
            <Toggle />
        </div>
    );
};

export default Header;

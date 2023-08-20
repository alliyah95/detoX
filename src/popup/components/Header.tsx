import React from "react";
import Toggle from "./Toggle";

interface HeaderProps {
    extensionState: boolean;
}

const Header: React.FC<HeaderProps> = ({ extensionState }) => {
    return (
        <div className="header__wrapper bg-white text-center">
            <h1 className="header__title text-blue">detoX</h1>
            <Toggle state={extensionState} />
        </div>
    );
};

export default Header;

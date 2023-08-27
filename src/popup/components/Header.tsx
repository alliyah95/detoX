import React from "react";

const Header: React.FC<{}> = () => {
    return (
        <div className="logo-title-wrapper">
            <img className="header__logo" src="icon.png" alt="detoX logo" />
            <h1 className="header__title text-blue">detoX</h1>
        </div>
    );
};

export default Header;

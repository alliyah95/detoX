import React from "react";

const Nav: React.FC<{}> = () => {
    return (
        <nav className="bg-white">
            <div className="container">
                <div className="container--inner">
                    <div className="header">
                        <a className="header__left" href="#section-hero">
                            <img
                                src="icon.png"
                                alt="detoX logo"
                                className="header__logo"
                            />
                            <p className="header__text">detoX</p>
                        </a>

                        <div className="header__right">
                            <a href="#section-about" className="header__link">
                                About
                            </a>
                            <a
                                href="#section-tutorial"
                                className="header__link"
                            >
                                How to Use
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Nav;

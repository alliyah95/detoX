import React from "react";

const Footer: React.FC<{}> = () => {
    return (
        <footer>
            <div className="container">
                <div className="container--inner">
                    Copyright © 2023 <span className="text-blue">detoX </span>|
                    All Rights Reserved
                </div>
            </div>
        </footer>
    );
};

export default Footer;

import React from "react";
import { CTAProps } from "../../utils/types";

const CTA: React.FC<CTAProps> = ({ linkTo, buttonText }) => {
    return (
        <div className="cta-btn-wrapper">
            <a href={linkTo} className="primary-btn">
                {buttonText}
            </a>
        </div>
    );
};

export default CTA;

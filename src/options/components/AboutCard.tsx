import React from "react";
import { AboutCardProps } from "../../utils/types";

const AboutCard: React.FC<AboutCardProps> = ({
    heading,
    description,
    icon,
}) => {
    return (
        <div className="about-card box-shadow-transition">
            <div className="about-card__icon">{icon}</div>
            <h3>{heading}</h3>
            <p>{description}</p>
        </div>
    );
};

export default AboutCard;

import React from "react";
import CTA from "./CTA";

const Hero: React.FC<{}> = () => {
    return (
        <section className="section-hero" id="section-hero">
            <div className="container">
                <div className="container--inner">
                    <div className="hero-img">
                        <img src="detox-hero.webp" alt="detoX" />
                    </div>
                    <div className="hero-info">
                        <h1 className="text">
                            Detoxify Your
                            <span className="text-blue"> Twitter</span> Feed
                            with detoX
                        </h1>
                        <div className="hero-info__subheading">
                            Experience a Safer and More Positive Twitter
                            Environment
                        </div>
                    </div>
                    <CTA linkTo="#section-about" buttonText="Get Started" />
                </div>
            </div>
        </section>
    );
};

export default Hero;

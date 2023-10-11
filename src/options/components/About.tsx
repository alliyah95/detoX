import React from "react";
import AboutCard from "./AboutCard";
import { Building, Gear, Shield, Twitter } from "./card-icons";
import CTA from "./CTA";

const About: React.FC<{}> = () => {
    return (
        <section className="section-about" id="section-about">
            <div className="container">
                <div className="container--inner">
                    <h2>
                        About <span className="text-blue">detoX</span>
                    </h2>

                    <div className="about-cards-container">
                        <AboutCard
                            icon={<Gear />}
                            heading="What is it?"
                            description="detoX is a browser extension for detecting and hiding 2022 Philippine Elections-related tweets with hate speech in the form of text on Twitter."
                        />
                        <AboutCard
                            icon={<Twitter />}
                            heading="Why Twitter/X?"
                            description="During the 2022 Philippine Elections, Twitter became a political battleground and hate speech flourished. Despite having its own hate speech detection techniques, the platform's support for the Filipino language and its unique contextual challenges remain limited."
                        />
                        <AboutCard
                            icon={<Building />}
                            heading="Why election-related hate speech?"
                            description="Election-related hate speech holds significant post-election relevance as it tends to persist beyond political events, becoming a recurring issue. Addressing this ongoing challenge is essential for sustaining civil discourse and fostering an informed, inclusive political environment."
                        />
                        <AboutCard
                            icon={<Shield />}
                            heading="Why use detoX?"
                            description="Enhance your Twitter experience by encountering less hate and focusing on tweets that truly matter, making your online interactions more enjoyable and positive."
                        />
                    </div>

                    <CTA
                        linkTo="#section-tutorial"
                        buttonText="How to use it"
                    />
                </div>
            </div>
        </section>
    );
};

export default About;

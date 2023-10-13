import React from "react";

const HowToUse: React.FC<{}> = () => {
    return (
        <section className="section-tutorial" id="section-tutorial">
            <div className="container">
                <div className="container--inner">
                    <h2>
                        How to use <span className="text-blue">detoX</span>
                    </h2>

                    <div className="how-to-use box-shadow-transition">
                        <div className="how-to-use__preview">
                            <img src="detoX-preview.gif" alt="detoX Preview" />
                        </div>

                        <p>
                            Using detoX is
                            <span className="text-blue"> effortless</span> 😉.
                            Once you've installed it, it's automatically
                            enabled. Just head to Twitter and start scrolling
                            through your feed. detoX works seamlessly as you
                            scroll down your timeline. Tweets are collected and
                            sent to our server for hate speech detection. If a
                            tweet is identified as containing hate speech, it
                            will be hidden from your timeline.
                        </p>

                        <br />
                        <p>
                            Note: The browser extension works{" "}
                            <span className="text-blue">locally</span> on your
                            browser. Hence, only your Twitter feed is affected
                            when using it.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HowToUse;

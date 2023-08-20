import React from "react";

interface CounterCardProps {
    tweetCount: number | string;
    heading: string;
}

const CounterCard: React.FC<CounterCardProps> = ({ tweetCount, heading }) => {
    return (
        <div className="counter-card bg-white text-center">
            <p className="counter-card__title text-gray">{heading}</p>
            <p className="counter-card__count text-blue font-bold">
                {tweetCount}
            </p>
        </div>
    );
};

export default CounterCard;

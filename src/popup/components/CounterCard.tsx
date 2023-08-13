import React from "react";

interface CounterCardProps {
    tweetCount: number | string;
}

const CounterCard: React.FC<CounterCardProps> = ({ tweetCount }) => {
    return (
        <div className="counter-card bg-white text-center">
            <p className="text-gray">TODAY</p>
            <h2 className="counter-card__title font-bold">Blocked Tweets</h2>
            <p className="counter-card__count text-blue font-bold">
                {tweetCount}
            </p>
        </div>
    );
};

export default CounterCard;

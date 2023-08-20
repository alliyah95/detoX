import React from "react";

interface ToggleProps {
    state: boolean;
}

const Toggle: React.FC<ToggleProps> = ({ state }) => {
    return (
        <div className="checkbox_wrapper">
            <input type="checkbox" id="toggle-switch" checked={state} />
        </div>
    );
};

export default Toggle;

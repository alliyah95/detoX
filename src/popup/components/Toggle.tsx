import React from "react";
import { setExtensionState } from "../../utils";
import { ToggleProps } from "../../utils/types";

const Toggle: React.FC<ToggleProps> = ({ isOn, onChange }) => {
    const handleToggleChange = () => {
        onChange(!isOn);
        setExtensionState(!isOn);
    };

    return (
        <div className="checkbox_wrapper">
            <input
                type="checkbox"
                id="toggle-switch"
                checked={isOn}
                onChange={handleToggleChange}
            />
        </div>
    );
};

export default Toggle;

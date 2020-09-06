import React from "react";
import './Step1.scss';

export const Step1 = props => {

    if (props.currentStep !== 1) {
        return null
    }

    return (
        <div>
            <p className="welcome"> Welcome to your dashboard, let's get you setup in 2 easy steps </p>
            <div className="innerform">
                <p> Your name </p>
                <input type="text" />
                <p id="country-label"> Country </p>
                <select className="countries">
                    <option value="et">Ethiopia</option>
                    <option value="gm">Germany</option>
                    <option value="us">United States</option>
                    <option value="nd">Netherland</option>
                    <option value="gb">England</option>
                    <option value="rs">Russia</option>
                </select>
            </div>
        </div>
    );
}
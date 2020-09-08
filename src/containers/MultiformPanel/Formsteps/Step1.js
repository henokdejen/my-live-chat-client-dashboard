import React from "react";
import './Step1.scss';

export const Step1 = props => {

    if (props.currentStep !== 1) {
        return null
    }

    const handleName = (e) => {
        props.setName(e.target.value);
    }

    const handleCountries = (e) => {
        props.setCountry(e.target.value);
    }

    return (
        <div>
            <p className="welcome"> Welcome to your dashboard, let's get you setup in 2 easy steps </p>
            <div className="innerform">
                <p> Your name </p>
                <input type="text" placeholder="Jhon Doe" value={props.name} onChange={handleName} required/>
                <p id="country-label"> Country </p>
                <select className="countries" onChange={handleCountries} value={props.country}>
                    <option value="Ethiopia">Ethiopia</option>
                    <option value="Netherlands">Netherlands</option>
                    <option value="Germany">Germany</option>
                    <option value="USA">United States</option>
                    <option value="England">England</option>
                    <option value="Russia">Russia</option>
                </select>
            </div>
        </div>
    );
}
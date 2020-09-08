import React from "react";
import './Step1.scss';

export const Step2 = props => {

    if (props.currentStep !== 2) {
        return null
    }

    const handleSiteName = (e) => {
        props.setSiteName(e.target.value);
    }

    const handleSiteURL = (e) => {
        props.setSiteURL(e.target.value);
    }

    return (
        <div>
        <p className="welcome"> Property Details </p>
        <div className="innerform">
            <p> Website name </p>
            <input type="text" placeholder="example" value={props.siteName} onChange={handleSiteName} required/>
            <p> Website address </p>
            <input type="text" placeholder="www.example.com" value={props.siteURL} onChange={handleSiteURL} required/>
        </div>
    </div>
    );
}
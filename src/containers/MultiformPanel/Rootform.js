import React from "react";
import './Rootform.scss';

import { Step1 } from './Formsteps/Step1';
import { Step2 } from './Formsteps/Step2';
import { validURL } from '../../Utils/index';

export const Rootform = props => {

    const [currentStep, setCurrentStep] = React.useState(1);
    const [name, setName] = React.useState("");
    const [country, setCountry] = React.useState('Ethiopia');
    const [siteName, setSiteName] = React.useState("");
    const [siteURL, setSiteURL] = React.useState("");

    const goForward = () => {
        if(currentStep == 1){
            if(name) setCurrentStep(2);
        }
        if(currentStep == 2){
            const isurl = validURL(siteURL);
            if(siteName && isurl) {
                //goto main board
            }
        }
      }
        
    const goBack = () => {
        setCurrentStep(1);
      }
      
    return (
        <div className="rootcontainer">
            <div className="progressbar">
                <p><span> Step {currentStep}</span> / 2</p>
                <div className="dotcontainer">
                    <span className="dot-active"></span>
                    <span className={`${currentStep == 2 ? "dot-active" : "dot"}`}></span>
                </div>
            </div>
            <form>
            <div className="stepsContainer">
                <Step1 currentStep={currentStep} name={name} setName={setName} country={country} setCountry={setCountry}/>
                <Step2 currentStep={currentStep} siteName={siteName} setSiteName={setSiteName} siteURL={siteURL} setSiteURL={setSiteURL}/>
            </div>
            <div className="nav-buttons">
               {currentStep == 2 && <button className="gobk" onClick={goBack}> Go back </button>}
                <button className="gofd" onClick={goForward} type="submit"> Continue </button>
            </div>
            </form>
         </div>
    );
}
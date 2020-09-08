import React from "react";
import './Panelform.scss';

import { Step1 } from './Formsteps/Step1';
import { Step2 } from './Formsteps/Step2';
import { validURL } from '../../Utils/index';

export const Panelform = props => {

    const [currentStep, setCurrentStep] = React.useState(1);

    const goForward = (e) => {
        // e.preventDefault();
        if(currentStep == 1){
            if(props.name){
                if(props.name.length > 7) setCurrentStep(2);
                else e.target.setCustomValidity("please use minimum 8 characters for name");
            }
            else e.target.setCustomValidity("please fill enter all the feilds");
        }
        if(currentStep == 2){
            const isurl = validURL(props.siteURL);
            if(props.siteName && isurl) props.goToHome();
            if(!isurl) e.target.setCustomValidity("please enter a valid URL");
            else e.target.setCustomValidity("please fill enter all the feilds");
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
                <Step1 currentStep={currentStep} name={props.name} setName={props.setName} country={props.country} setCountry={props.setCountry}/>
                <Step2 currentStep={currentStep} siteName={props.siteName} setSiteName={props.setSiteName} siteURL={props.siteURL} setSiteURL={props.setSiteURL}/>
            </div>
            <div className="nav-buttons">
               {currentStep == 2 && <button className="gobk" onClick={goBack}> Go back </button>}
                <button className="gofd" onClick={goForward} type="submit"> Continue </button>
            </div>
            </form>
         </div>
    );
}
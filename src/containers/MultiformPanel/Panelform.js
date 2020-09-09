import React from "react";
import './Panelform.scss';

import Step1 from './Formsteps/Step1';
import Step2 from './Formsteps/Step2';

export const Panelform = props => {

    const [currentStep, setCurrentStep] = React.useState(1);

    const goForward = (stepvalues) => {
        if(currentStep == 1) {
            props.setName(stepvalues.username);
            props.setCountry(stepvalues.country);
            setCurrentStep(2);
        }
        if(currentStep == 2) {
            props.goToHome(stepvalues.websitename, stepvalues.websiteurl);
        }
      }
        
    const goBack = () => setCurrentStep(1);
      
    return (
        <div className="panelrootcontainer">
            <div className="panelprogressbar">
                <p><span> Step {currentStep}</span> / 2</p>
                <div className="paneldotcontainer">
                    <span className="paneldot-active"></span>
                    <span className={`${currentStep == 2 ? "paneldot-active" : "paneldot"}`}></span>
                </div>
            </div>
          
            <div className="panelstepsContainer">
                <Step1 currentStep={currentStep} goForward={goForward}/>
                <Step2 currentStep={currentStep} goBack={goBack} goForward={goForward}/>
            </div>
         </div>
    );
}
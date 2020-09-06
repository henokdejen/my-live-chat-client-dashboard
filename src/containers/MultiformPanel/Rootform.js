import React from "react";
import './Rootform.scss';

import { Step1 } from './Formsteps/Step1';
import { Step2 } from './Formsteps/Step2';

export const Rootform = props => {

    const [currentStep, setCurrentStep] = React.useState(1);

    const goForward = () => {
        setCurrentStep(2);
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
            <form className="stepsContainer">
                <Step1 currentStep={currentStep}/>
                <Step2 currentStep={currentStep}/>
            </form>
            <div className="nav-buttons">
               {currentStep == 2 && <button className="gobk" onClick={goBack}> Go back </button>}
                <button className="gofd" onClick={goForward} type="submit"> Continue </button>
            </div>
         </div>
    );
}
import React from "react";
import './Step2.scss';

export const Step2 = props => {

    if (props.currentStep !== 2) {
        return null
    }

    return (
       <div> 
           <p> Which website would you like to add a chat widget to? </p>
           <p> wide site url </p>
           <p> wide site name </p>
        </div>
    );
}
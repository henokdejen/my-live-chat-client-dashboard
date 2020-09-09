import React from "react";
import './Step1.scss';
import * as Yup from "yup";
import { withFormik, Form, Field } from "formik";

const Step1Component = ({ errors, touched, currentStep }) => {

    if (currentStep !== 1) {
        return null
    }

    return (
        <Form>
            <p className="formStepswelcome"> Welcome to your dashboard, let's get you setup in 2 easy steps </p>
            <div className="formStepsinnerform">
                <p> Your name </p>
                <Field type="text" placeholder="Jhon Doe" name="username"/>
                {touched.username && errors.username && <p className="stepserrormessage">{errors.username}</p>}

                <p id="formStepscountry-label"> Country </p>
                <Field className="formStepscountries" component="select" name="country">
                    <option value="Ethiopia">Ethiopia</option>
                    <option value="Netherlands">Netherlands</option>
                    <option value="Germany">Germany</option>
                    <option value="USA">United States</option>
                    <option value="England">England</option>
                    <option value="Russia">Russia</option>
                </Field>
            </div>
            <div className="panelnav-buttons">
                <button type="submit" className="panelgofd"> Continue </button>
            </div>
        </Form>
    );
}

const Step1 = withFormik({
    mapPropsToValues({username, country}){
      return {
         username: username || '',
         country: country || 'Ethiopia'
      }
    },
  
    validationSchema: Yup.object().shape({
      username: Yup.string().min(8).required("*required"),
    }),
  
    handleSubmit(values, {props}){
      props.goForward(values);
    }
  
  })(Step1Component) 

export default Step1;
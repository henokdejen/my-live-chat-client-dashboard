import React from "react";
import './Step2.scss';
import * as Yup from "yup";
import { withFormik, Form, Field } from "formik";

const Step2Component = ({ errors, touched, currentStep, goBack }) => {

    if (currentStep !== 2) {
        return null
    }

    return (
        <Form>
        <p className="formStepswelcome"> Property Details </p>
        <div className="formStepsinnerform">
            {touched.websitename && errors.websitename && <p className="stepserrormessage">{errors.websitename}</p>}
            <p> Website name </p>
            <Field type="text" placeholder="example" name="websitename"/>
            
            {touched.websiteurl && errors.websiteurl && <p className="stepserrormessage">{errors.websiteurl}</p>}
            <p> Website address </p>
            <Field type="text" placeholder="www.example.com" name="websiteurl"/>
           
        </div>
        <div className="panelnav-buttons">
                <button type="button" onClick={()=>{goBack()}} className="panelgobk"> Go back </button>
                <button type="submit" className="panelgofd"> Continue </button>
        </div>
    </Form>
    );
}


const Step2 = withFormik({
    mapPropsToValues({websitename, websiteurl}){
      return {
         websitename: websitename || '',
         websiteurl: websiteurl || ''
      }
    },
  
    validationSchema: Yup.object().shape({
      websitename: Yup.string().required("*required"),
      websiteurl: Yup.string().matches(/^((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,'Enter correct url!')
      .required('*required'),
    }),
  
    handleSubmit(values, {props}){
      props.goForward(values);
    }
  
  })(Step2Component) 

export default Step2;
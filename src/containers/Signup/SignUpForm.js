import React from "react";
import './Signup.scss';
import * as Yup from "yup";
import { withFormik, Form, Field } from "formik";

const SignUpFormComponent = ({errors, touched, values, formerrormessage}) => {

  return (
      <div className="signupflexcontainer">
        <div className="signupadcontainer">
          <p> Amazing app, super well built at 
              an incredibly fair price. Needed some
              support in switching stores and the 
              support was absolutely brilliant. 
              Well done guys!
              <br/><br/> someone 
          </p>
        </div>

        <div className="signupformcontainer">
          <Form>
            <div className="signupinputfield-container">
              <h1 className="signuptitle">Create a Free Account</h1>
              
              <p className="signupformerror">{formerrormessage}</p>
              {touched.email && errors.email && <p className="signupformerror">{errors.email}</p>}
              <Field type="email" placeholder="Email" name="email"/>
              {touched.password && errors.password && <p className="signupformerror">{errors.password}</p>}
              <Field type="password" placeholder="Password" name="password" />
              {touched.passwordre && errors.passwordre && <p className="signupformerror">{errors.passwordre}</p>}
              <Field type="password" placeholder="Repeat password" name="passwordre"/>
              
              {touched.terms && errors.terms && <p className="signupformerror">{errors.terms}</p>}
              <label className="signupbox-container">
                <Field type="checkbox" name="terms" checked={values.terms}/>
                <p>I agree to These <span className="signuptermslink">Terms & Conditions</span> and <span className="signuptermslink">Privacy Policy</span></p>
              </label>
              
              <button className="signupbtn" type="submit">Create a Free Account</button>
            </div>
          </Form>
        </div>
      </div>
    );
  };

  const SignUpForm = withFormik({
    mapPropsToValues({email, password, passwordre, terms}){
      return {
        email: email || '',
        password: password || '',
        passwordre: passwordre || '',
        terms: terms || false
      }
    },
  
    validationSchema: Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().min(8).max(50).required(),
      passwordre: Yup.string().required().oneOf([Yup.ref('password'), null], 'Passwords must match'),
      terms: Yup.bool().oneOf([true], 'Accept Terms & Conditions is required')
    }),
  
    handleSubmit(values, {props}){
      props.Proceed(values.email, values.password);
    }
    
  })(SignUpFormComponent)

  export default SignUpForm
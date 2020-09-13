import React from "react";
import './Signup.scss';
import * as Yup from "yup";
import { withFormik, Form, Field } from "formik";
import { signupRequested } from '../../../store/actions/auth';
import { connect } from 'react-redux';
import { useHistory } from "react-router-dom";

const SignupComponent = ({errors, touched, values, signupInfo}) => {

  const [firsttimeloading, setFirstTimeLoading] = React.useState(true);
  const [serverError, setServerError] = React.useState('');
  const history = useHistory();

  React.useEffect(() => {
    if(signupInfo.token) {
      history.push('/projectForm');
    };
    
    if(signupInfo.ErrorMessage){
      const err = signupInfo.ErrorMessage;
      if(!firsttimeloading) setServerError(err);
    }

    setFirstTimeLoading(false);
  },[signupInfo]);

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
              
              <p className="signupformerror">{serverError}</p>
              {touched.username && errors.username && <p className="signupformerror">{errors.username}</p>}
              <Field type="text" placeholder="Name" name="username"/>

              {touched.email && errors.email && <p className="signupformerror">{errors.email}</p>}
              <Field type="email" placeholder="Email" name="email"/>
              
              {touched.password && errors.password && <p className="signupformerror">{errors.password}</p>}
              <Field type="password" placeholder="Password" name="password" />
              
              <Field className="signupselectbox" component="select" name="country" placeholder="Country">
                    <option value="Ethiopia">Ethiopia</option>
                    <option value="Netherlands">Netherlands</option>
                    <option value="Germany">Germany</option>
                    <option value="USA">United States</option>
                    <option value="England">England</option>
                    <option value="Russia">Russia</option>
                </Field>
              
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

  const Signup = withFormik({
    mapPropsToValues({email, password, username, terms, country}){
      return {
        email: email || '',
        password: password || '',
        username: username || '',
        terms: terms || false,
        country: country || 'Ethiopia'
      }
    },
  
    validationSchema: Yup.object().shape({
      email: Yup.string().email().required("*required"),
      password: Yup.string().min(8).max(50).required("*required"),
      username: Yup.string().min(8).required("*required"),
      terms: Yup.bool().oneOf([true], "*required")
    }),
  
    handleSubmit(values, {props}){
      props.dispatch(signupRequested({ 
        email : values.email,
        password : values.password,
        country : values.country,
        name: values.username,
    }));
    }
    
  })(SignupComponent)

  const mapStateToProps = (state) => {
    return {
      signupInfo: state.authenticationState
    };
  };
  

  export default connect(mapStateToProps)(Signup)
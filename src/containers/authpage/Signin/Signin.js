import React from "react";
import './Signin.scss';
import * as Yup from "yup";
import { withFormik, Form, Field } from "formik";
import { connect } from 'react-redux';
import { loginRequested } from '../../../store/actions/auth';
import { useHistory } from "react-router-dom";

const SigninComponent = ({errors, touched, loginInfo, setVisible}) => {

  const [serverError, setServerError] = React.useState('');
  const [firsttimeloading, setFirstTimeLoading] = React.useState(true);
  const history = useHistory();
  
  React.useEffect(() => {
    if(loginInfo.token) history.push('/');
    
    if(loginInfo.ErrorMessage){
      const err = loginInfo.ErrorMessage;
      if(!firsttimeloading) setServerError(err);
    }

    setFirstTimeLoading(false);
   
  },[loginInfo]);

  const navToSignup = () => setVisible(true);

  return (
    <div className="signinflexcontainer">
      
      <div className="signinadcontainer">
        <h1 id="signinnoaccount"> Don't have an account?</h1>
        <button onClick={navToSignup} className="">Create a Free Account</button>
      </div>

      <div className="signinformcontainer">
        <Form>
          <div className="signininputfield-container">
            <h1 className="signintitle">Sign In</h1>

            <p className="signinerrormessage">{serverError}</p>
            {touched.email && errors.email && <p className="signinerrormessage">{errors.email}</p>}
            
            <Field type="email" placeholder="Email" name="email"/>
            {touched.password && errors.password && <p className="signinerrormessage">{errors.password}</p>}
            <Field type="password" placeholder="Password" name="password" />
            
            <button type="submit" className="signinbtn">Sign In</button>
            <p className="signincreateaccount">Don't have an account? <span onClick={navToSignup}>Create free account?</span></p>
          </div>
        </Form>
      </div>
    </div>
  );
};

const Signin = withFormik({
  mapPropsToValues({email, password}){
    return {
      email: email || '',
      password: password || ''
    }
  },

  validationSchema: Yup.object().shape({
    email: Yup.string().email().required("*required"),
    password: Yup.string().min(3).max(50).required("*required")
  }),

  handleSubmit(values, {props}){
    props.dispatch(loginRequested(values));
  }

})(SigninComponent)

const mapStateToProps = (state) => {
  return {
    loginInfo: state.authenticationState
  };
};

export default connect(mapStateToProps)(Signin)
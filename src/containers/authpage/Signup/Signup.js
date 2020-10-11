import React from "react";
import './Signup.scss';
import * as Yup from "yup";
import { getListOfCountries } from "../../../API/auth";
import { withFormik, Form, Field } from "formik";
import { signupRequested } from '../../../store/actions/auth';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";

const SignupComponent = ({errors, touched, values, signupInfo}) => {

  const [firsttimeloading, setFirstTimeLoading] = React.useState(true);
  const [serverError, setServerError] = React.useState('');
  const [countrieslist, setCountriesList] = React.useState([]);

  React.useEffect(() => {
    setTimeout(()=>{
      getListOfCountries()
      .then((data) => {
        setCountriesList(data);
      })
      .catch(() => {
        alert("error while loading countries");
      })
      .then(() => {
        //success
      });
    },400);

    if(signupInfo.ErrorMessage){
      const err = signupInfo.ErrorMessage;
      if(!firsttimeloading) setServerError(err);
    }
    setFirstTimeLoading(false);
  },[signupInfo.ErrorMessage]);

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
                    {countrieslist.map((item)=>{
                      return <option key={item.name} value={item.name}>{item.name}</option>;
                    })}
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

  const Signup = withRouter(withFormik({
    mapPropsToValues({email, password, username, terms, country}){
      return {
        email: email || '',
        password: password || '',
        username: username || '',
        terms: terms || false,
        country: country || 'United States'
      }
    },
  
    validationSchema: Yup.object().shape({
      email: Yup.string().email().required("*required"),
      password: Yup.string().min(8).max(50).required("*required"),
      username: Yup.string().min(3).required("*required").test("username", "Name should contain first name and last name", (username) => {
        return username && username.trim().split(" ").length === 2;
      }),
      terms: Yup.bool().oneOf([true], "*required")
    }),
  
    handleSubmit(values, { props }){
      props.dispatch(signupRequested({ 
        email : values.email,
        password : values.password,
        country : values.country,
        name: values.username,
    },props.history));
    }
    
  })(SignupComponent));

  const mapStateToProps = (state) => {
    return {
      signupInfo: state.authenticationState
    };
  };
  

  export default connect(mapStateToProps)(Signup)
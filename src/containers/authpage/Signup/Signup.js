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
  const countrieslist = ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina"
                    ,"Armenia", "Australia", "Austria", "Azerbaijan", "The Bahamas", "Bahrain", "Bangladesh"
                    ,"Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina"
                    ,"Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia"
                    ,"Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros"
                    ,"Congo", "Democratic Republic of the Congo", "Republic of the Costa Rica", "Côte d’Ivoire", "Croatia"
                    ,"Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic"
                    ,"East Timor (Timor-Leste)", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea"
                    ,"Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "The Gambia", "Georgia"
                    ,"Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana" 
                    ,"Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland"
                    ,"Israel", "Italy", "Jamaica", "Japan", "Jordan","Kazakhstan","Kenya","Kiribati","Korea, North","Korea, South"
                    ,"Kosovo","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein"
                    ,"Lithuania","Luxembourg", "Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands"
                    ,"Mauritania","Mauritius","Mexico","Micronesia","Federated States of Moldova","Monaco","Mongolia"
                    ,"Montenegro","Morocco","Mozambique","Myanmar (Burma)", "Namibia","Nauru","Nepal","Netherlands"
                    ,"New Zealand","Nicaragua","Niger","Nigeria","North Macedonia","Norway","Oman","Pakistan","Palau"
                    ,"Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal" ,"Qatar","Romania"
                    ,"Russia","Rwanda","Saint Kitts and Nevis","Saint Lucia","Saint Vincent and the Grenadines","Samoa"
                    ,"San Marino","Sao Tome and Principe","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone"
                    ,"Singapore","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","Spain","Sri Lanka","Sudan"
                    ,"Sudan, South","Suriname","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand"
                    ,"Togo","Tonga","Trinidad and Tobago","Tunisia","Turkey","Turkmenistan","Tuvalu","Uganda","Ukraine"
                    ,"United Arab Emirates","United Kingdom","United States","Uruguay","Uzbekistan","Vanuatu","Vatican City"
                    ,"Venezuela","Vietnam","Yemen","Zambia","Zimbabwe"];

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
                    {countrieslist.map((item)=>{
                      return <option value={item}>{item}</option>;
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

  const Signup = withFormik({
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
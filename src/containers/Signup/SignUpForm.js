import React from "react";
import './Signup.scss';
import { validateEmail } from '../../Utils/index';

export const SignUpForm = props => {

  const [passwordRe, setPasswordRe] = React.useState("");
  const [agree, setAgree] = React.useState(false);

  const handleEmail = (e) => props.setEmail(e.target.value);
  const handlePassword = (e) => props.setPassword(e.target.value);
  const handlePasswordRe = (e) => setPasswordRe(e.target.value);
  const handleCheck = () => setAgree(!agree);

  const handleSignUp = (e) => {
    //  e.preventDefault();
    if(props.password && props.email && passwordRe && agree){
      if(validateEmail(props.email)){
        if(props.password == passwordRe) {
          if(props.password.length > 7)props.Proceed();
          else e.target.setCustomValidity("password should contain minimum 8 characters");
        }
        else e.target.setCustomValidity("The passwords don't match!");
      }
      else e.target.setCustomValidity("please enter a valid email");
    }
    else e.target.setCustomValidity("please fill all the fields");
  }

  return (
      <div className="flexcontainer">
        <div className="adcontainer">
          <p> Amazing app, super well built at 
              an incredibly fair price. Needed some
              support in switching stores and the 
              support was absolutely brilliant. 
              Well done guys!
              <br/><br/> someone 
          </p>
        </div>
        <div className="formcontainer">
          <form>
            <div className="inputfield-container">
              <h1 className="title">Create a Free Account</h1>
              <p id="formerror"> {props.formerrormessage} </p>
              <input type="text" placeholder="Email" name="email" value={props.email} onChange={handleEmail} required />
              <input type="password" placeholder="Password" name="psw" value={props.password} onChange={handlePassword} required />
              <input type="password" placeholder="Repeat password" name="pswr" onChange={handlePasswordRe} value={passwordRe} required />
              <label className="box-container">
                <input type="checkbox" name="terms" checked={agree} onChange={handleCheck} required/>
                <p>I agree to These's <span className="termslink">Terms & Conditions</span> and <span className="termslink">Privacy Policy</span></p>
              </label>
              <button className="signupbtn" onClick={handleSignUp}>Create a Free Account</button>
            </div>
          </form>
        </div>
      </div>
    );
  };
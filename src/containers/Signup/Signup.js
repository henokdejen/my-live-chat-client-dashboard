import React from "react";
import './Signup.scss';

export const Signup = props => {

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
              <input type="text" placeholder="Email" name="email" required />
              <input type="password" placeholder="Password" name="psw" required />
              <input type="text" placeholder="Website" name="url" required />
              <label className="box-container">
                <input type="checkbox" name="terms"/>
                <p>I agree to These's <span className="termslink">Terms & Conditions</span> and <span className="termslink">Privacy Policy</span></p>
              </label>
              <button type="submit" className="signupbtn">Create a Free Account</button>
            </div>
          </form>
        </div>
      </div>
    );
  };
  
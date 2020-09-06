import React from "react";
import './Signin.scss';

export const Signin = props => {

  return (
    <div className="flexcontainer">
      <div className="adcontainer">
        <h1 id="noaccount"> Don't have an account?</h1>
        <button className="">Create a Free Account</button>
      </div>
      <div className="formcontainer">
        <form>
          <div className="inputfield-container">
            <h1 className="title">Sign In</h1>
            <input type="text" placeholder="Email" name="email" required />
            <input type="password" placeholder="Password" name="psw" required />
            <button type="submit" className="signinbtn">Sign In</button>
            <p className="createaccount">Don't have an account? <span>Create free account?</span></p>
          </div>
        </form>
      </div>
    </div>
  );
};

import React from "react";
import './Signin.scss';
import { validateEmail } from '../../Utils/index';

export const Signin = props => {

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleEm = (e) => setEmail(e.target.value);
  const handlePass = (e) => setPassword(e.target.value);
  const navToSignup = () => props.history.push('/signup');
  
  const handleLogin = () => {
    if(validateEmail(email) && password){
      //do sth
    }
    // check for login credebility here
  }

  return (
    <div className="flexcontainer">
      <div className="adcontainer">
        <h1 id="noaccount"> Don't have an account?</h1>
        <button onClick={navToSignup} className="">Create a Free Account</button>
      </div>
      <div className="formcontainer">
        <form>
          <div className="inputfield-container">
            <h1 className="title">Sign In</h1>
            <input type="text" placeholder="Email" name="email" required value={email} onChange={handleEm}/>
            <input type="password" placeholder="Password" name="psw" required value={password} onChange={handlePass}/>
            <button type="submit" className="signinbtn" onClick={handleLogin}>Sign In</button>
            <p className="createaccount">Don't have an account? <span onClick={navToSignup}>Create free account?</span></p>
          </div>
        </form>
      </div>
    </div>
  );
};

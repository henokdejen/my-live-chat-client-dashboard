import React from "react";
import './Signin.scss';
import { validateEmail } from '../../Utils/index';
import { loginRequested } from '../../store/actions/auth';
import { connect } from 'react-redux';

const Signin = props => {

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleEm = (e) => setEmail(e.target.value);
  const handlePass = (e) => setPassword(e.target.value);
  const navToSignup = () => props.history.push('/signup');

  React.useEffect(() => {
    if(props.loginInfo.token){
      props.history.push('/');
    }
    else console.log("something after login here",props.loginInfo.ErrorMessage);
  },[props.loginInfo])
  
  const handleLogin = (e) => {
    e.preventDefault();
    if(validateEmail(email) && password){
      props.dispatch(loginRequested({ 
        email : email,
        password : password
      }));
    }
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
            <button className="signinbtn" onClick={handleLogin}>Sign In</button>
            <p className="createaccount">Don't have an account? <span onClick={navToSignup}>Create free account?</span></p>
          </div>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loginInfo: state.authenticationState
  };
};

export default connect(mapStateToProps)(Signin)
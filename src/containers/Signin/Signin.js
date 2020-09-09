import React from "react";
import './Signin.scss';
import { validateEmail } from '../../Utils/index';
import { loginRequested } from '../../store/actions/auth';
import { connect } from 'react-redux';

const Signin = props => {

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errormsg, setErrorMsg] = React.useState("");

  const handleEm = (e) => setEmail(e.target.value);
  const handlePass = (e) => setPassword(e.target.value);
  const navToSignup = () => props.history.push('/signup');

  React.useEffect(() => {
    if(props.loginInfo.token){
      props.history.push('/');
    }
    else setErrorMsg(props.loginInfo.ErrorMessage);
  },[props.loginInfo]);
  
  const handleLogin = (e) => {
    // e.preventDefault();
    if(validateEmail(email) && password){
      props.dispatch(loginRequested({ 
        email : email,
        password : password
      }));
    }
    if (!validateEmail(email)) e.target.setCustomValidity("please enter a valid email");
    if (!email && !password) e.target.setCustomValidity("please fill all the fields");
    else e.target.setCustomValidity(".");
  }

  return (
    <div className="signinflexcontainer">
      <div className="signinadcontainer">
        <h1 id="signinnoaccount"> Don't have an account?</h1>
        <button onClick={navToSignup} className="">Create a Free Account</button>
      </div>
      <div className="signinformcontainer">
        <form>
          <div className="signininputfield-container">
            <h1 className="signintitle">Sign In</h1>
            <p id="signinerrormessage">{errormsg}</p>
            <input type="text" placeholder="Email" name="email" required value={email} onChange={handleEm}/>
            <input type="password" placeholder="Password" name="psw" required value={password} onChange={handlePass}/>
            <button className="signinbtn" onClick={handleLogin}>Sign In</button>
            <p className="signincreateaccount">Don't have an account? <span onClick={navToSignup}>Create free account?</span></p>
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
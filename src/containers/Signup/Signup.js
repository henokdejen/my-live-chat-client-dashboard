import React from "react";
import SignUpForm from './SignUpForm';
import { Panelform } from '../MultiformPanel/Panelform';
import { signupRequested, emailRequested } from '../../store/actions/auth';
import { connect } from 'react-redux';

const Signup = props => {

  const [visible,setVisible] = React.useState(true);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState("");
  const [country, setCountry] = React.useState('Ethiopia');
  const [formerrormessage, setFormerrormessage] = React.useState('');
  const [firsttimeloading, setFirstTimeLoading] = React.useState(true);

  React.useEffect(() => {
    if(props.signupInfo.token) props.history.push('/');
    
    if(props.signupInfo.ErrorMessage){
      const err = props.signupInfo.ErrorMessage;
      if(!firsttimeloading) setFormerrormessage(err);
    }

    if(props.signupInfo.emailAvailable) setVisible(false);
    
    if(!props.signupInfo.emailAvailable){
      if(!firsttimeloading) setFormerrormessage("email is already in use");
    }
    
    setFirstTimeLoading(false);
  },[props.signupInfo])

  const Proceed = (inemail, inpassword) => {
    setEmail(inemail);
    setPassword(inpassword);

    props.dispatch(emailRequested({
      email:inemail
    }));
  }
  
  const goToHome = (webname, weburl) => {
    props.dispatch(signupRequested({ 
      email : email,
      password : password,
      country : country,
      siteName : webname,
      siteURL: weburl,
      name: name
    }));
  }

  return (
     <>
     {visible ? <SignUpForm 
                  Proceed={Proceed}
                  email={email}
                  setEmail={setEmail}
                  password={password}
                  setPassword={setPassword}
                  formerrormessage={formerrormessage}
     /> : <Panelform 
            goToHome={goToHome}
            setName={setName}
            setCountry={setCountry}
     />}
     </>
     );
  };

  const mapStateToProps = (state) => {
    return {
      signupInfo: state.authenticationState
    };
  };
  
  export default connect(mapStateToProps)(Signup);
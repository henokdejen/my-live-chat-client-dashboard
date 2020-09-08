import React from "react";
import { SignUpForm } from './SignUpForm';
import { Panelform } from '../MultiformPanel/Panelform';
import { signupRequested, emailRequested } from '../../store/actions/auth';
import { connect } from 'react-redux';

const Signup = props => {

  const [visible,setVisible] = React.useState(true);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState("");
  const [country, setCountry] = React.useState('Ethiopia');
  const [siteName, setSiteName] = React.useState("");
  const [siteURL, setSiteURL] = React.useState("");
  const [formerrormessage, setFormerrormessage] = React.useState('');

  React.useEffect(() => {
    if(props.signupInfo.token){
      props.history.push('/');
    }
    if(props.signupInfo.ErrorMessage){
      const err = props.signupInfo.ErrorMessage;
      setFormerrormessage(err);
      //when you handle error handle password min to 8
    }
    if(props.signupInfo.emailAvailable){
      setVisible(false);
    }
  },[props.signupInfo])

  const Proceed = () => {
    props.dispatch(emailRequested({
      email:email
    }));
  }
  
  const goToHome = () => {
    props.dispatch(signupRequested({ 
      email : email,
      password : password,
      country : country,
      siteName : siteName,
      siteURL: siteURL,
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
            name={name}
            setName={setName}
            country={country}
            setCountry={setCountry}
            siteName={siteName}
            setSiteName={setSiteName}
            siteURL={siteURL}
            setSiteURL={setSiteURL}
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
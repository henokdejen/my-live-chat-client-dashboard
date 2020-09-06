import React from "react";
import { SignUpForm } from './SignUpForm';
import { Panelform } from '../MultiformPanel/Panelform';

export const Signup = props => {

  const [visible,setVisible] = React.useState(true);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState("");
  const [country, setCountry] = React.useState('Ethiopia');
  const [siteName, setSiteName] = React.useState("");
  const [siteURL, setSiteURL] = React.useState("");

  const Proceed = () => {
    setVisible(false);
  }
  
  const goToHome = () => {
    props.history.push('/');
  }

  return (
     <>
     {visible ? <SignUpForm 
                  Proceed={Proceed}
                  email={email}
                  setEmail={setEmail}
                  password={password}
                  setPassword={setPassword}
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
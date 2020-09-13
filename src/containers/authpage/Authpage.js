import React from "react";
import Signup from './Signup/Signup';
import Signin from './Signin/Signin';

const Authpage = () => {
  const [visible,setVisible] = React.useState(false);
  return (
     <>
        {visible ? <Signup/> 
              : <Signin setVisible={setVisible}/>}
     </>
     );
  };

  export default Authpage
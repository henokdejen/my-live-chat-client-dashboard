import React from 'react'
import { Redirect } from 'react-router-dom'

class ProtectedRoute extends React.Component {

    render() {
        const Component = this.props.component;
        let isAuthenticated = false;
        
        if(localStorage.getItem("usertoken")){
            isAuthenticated = true;
        }
        return isAuthenticated ? (
            <Component />
        ) : (
            <Redirect to={{ pathname: '/authenticate' }} />
        );
    }
}

export default ProtectedRoute;
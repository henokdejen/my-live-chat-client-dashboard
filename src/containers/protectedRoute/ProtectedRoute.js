import React from 'react'
import { Redirect } from 'react-router-dom'

class ProtectedRoute extends React.Component {

    render() {
        const Component = this.props.component;
        // const isAuthenticated = JSON.parse(localStorage.getItem("pass"));
        // check is authenticated from server in the future
        const isAuthenticated = true;
      
        return isAuthenticated ? (
            <Component />
        ) : (
            <Redirect to={{ pathname: '/signin' }} />
        );
    }
}

export default ProtectedRoute;
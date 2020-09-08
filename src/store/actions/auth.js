import * as types from "../../constants";

export const signupRequested = ({email, password, country, siteName, siteURL, name}) => ({
    type: types.SIGNUP_REQUEST,
    payload: {
        email:email,
        password: password,
        country: country,
        siteName: siteName,
        siteURL: siteURL,
        name: name
    }
});

export const signupResponse = (token, userInfo) => ({
    type: types.SIGNUP_SUCCESS,
    payload: {
        token,
        userInfo
    }
});

export const signupError = (message) => ({
    type: types.SIGNUP_FAILURE,
    payload: {
        message
    }
});

export const loginRequested = ({email, password}) => ({
    type: types.LOGIN_REQUEST,
    payload: {
        email:email,
        password: password,
    }
});

export const loginResponse = (token) => ({
    type: types.LOGIN_SUCCESS,
    payload: {
        token
    }
});

export const loginError = (message) => ({
    type: types.LOGIN_FAILURE,
    payload: {
        message
    }
});

export const emailRequested = ({email}) => ({
    type: types.CHECK_EMAIL_REQUEST,
    payload: {email:email}
});

export const emailResponse = (message) => ({
    type: types.EMAIL_AVAILABLE,
    payload: {
        message
    }
});

// export const logoutRequested = () => ({
//     type: types.LOGOUT_REQUEST,
// });

// export const logoutResponse = () => ({
//     type: types.LOGOUT_SUCCESS
// });

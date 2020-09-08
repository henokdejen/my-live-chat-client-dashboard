import * as types from "../../constants";

const initialState = {
    token: null,
    userInfo: [],
    ErrorMessage: '',
    emailAvailable: false
}

const authenticationReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SIGNUP_SUCCESS:
            localStorage.setItem("usertoken",action.payload.token);
            return {
                token: true,
                userInfo: action.payload.userInfo,
                ErrorMessage: '',
                emailAvailable: state.emailAvailable
            }
        case types.SIGNUP_FAILURE:
            return {
                token: state.token,
                userInfo: state.userInfo,
                ErrorMessage: action.payload.message,
                emailAvailable: state.emailAvailable
            }
        case types.LOGIN_SUCCESS:
                localStorage.setItem("usertoken",action.payload.token);
            return {
                token: true,
                userInfo: state.userInfo,
                ErrorMessage: '',
                emailAvailable: state.emailAvailable
            }
        case types.LOGIN_FAILURE:
            return {
                token: false,
                userInfo: state.userInfo,
                ErrorMessage: action.payload.message,
                emailAvailable: state.emailAvailable
            }
        case types.EMAIL_AVAILABLE:
            return{
                token: state.token,
                userInfo: state.userInfo,
                ErrorMessage: state.ErrorMessage,
                emailAvailable: action.payload.message
            }

        default:
            return state;
    }
}

export default authenticationReducer;
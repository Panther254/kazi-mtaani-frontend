export const initialState = {
    isAuthenticated: false,
    profile: null,
};

export const actionTypes = {
    LOGIN_SUCCESS: "LOGIN_SUCCESS",
    LOGIN_FAILED: "LOGIN_FAILED",
    LOGOUT_SUCCESS: "LOGOUT_SUCCESS",
    REGISTER_SUCCESS: "REGISTER_SUCCESS",
    PROFILEUPDATE_SUCCESS: "PROFILEUPDATE_SUCCESS"
   
};

const reducer = (state,action) => {
    const { payload,type } = action
    switch (type) {
        case actionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                isAuthenticated: payload.isAuthenticated,
                profile: payload.profile,
            };
        case actionTypes.PROFILEUPDATE_SUCCESS:
            return {
                ...state,
                profile: payload.profile
            };
            
        case actionTypes.REGISTER_SUCCESS:
        case actionTypes.LOGOUT_SUCCESS:
        case actionTypes.LOGIN_FAILED:
        default:
            return state;
    }
};

export default reducer;
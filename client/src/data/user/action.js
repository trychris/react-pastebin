import { createSessionKey } from '../../api/PasteBinApi';
import * as api from '../../api/PasteBinApi';
export const signinUser = (username, password, successCallback, failureCallback) => async(dispatch) => {
    try {
        const sessionKey = await createSessionKey(username, password);
        if(sessionKey) {
            localStorage.setItem("sessionKey", sessionKey);
            successCallback();
            dispatch({ type: "LOGIN_SUCCESS" });
        } else {
            failureCallback();
        }
    } catch (error) {
        failureCallback();
        console.log(error);
    }
}

export const signoutUser = () => {
    localStorage.removeItem("sessionKey");
    return { type: "SIGN_OUT_SUCCESS" }
}

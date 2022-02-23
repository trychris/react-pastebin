import React from 'react';

export function userReducer(state = {isAuthenticated: false}, action) {
    switch (action.type) {
        case "LOGIN_SUCCESS":
            return { ...state, isAuthenticated: true };
        case "SIGN_OUT_SUCCESS":           
            return { ...state, isAuthenticated: false};
        default: {
            return state;
        }
    }
}

/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import {createContext,useReducer} from 'react'
import React from 'react';

export const Auth = createContext();

export const authReducer = (state,action) => {
    switch(action.type){
        case 'LOGIN':
            return {token:action.payload.token,role:action.payload.role}
        case 'LOGOUT':
            return {token:null,role:null}
        default:
            return state;
        
    }
}

export const AuthContext = ({children}) => {
    const [state,dispatch] = useReducer(authReducer,{
        token: localStorage.getItem("token") || null,
        role: localStorage.getItem("role") || null
    })
    return (
        <Auth.Provider value={{...state,dispatch}}>
            {children}
        </Auth.Provider>
    )
}
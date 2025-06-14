import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'not-authenticated', //'checking', 'not-authenticated', 'authenticated'
        uid: null,
        email: null,
        displayName: null,
        photoURL: null,
        errorMessage: null,
    },
    reducers: {
        login: (state, { payload })=>{
            return {
                status: 'authenticated',
                uid: payload.uid,
                email: payload.email,
                displayName: payload.displayName,
                photoURL: payload.photoURL,
                errorMessage: null,

            }
        },
        logout: (state, {payload})=>{
            return {
                status: 'not-authenticated',
                uid: null,
                email: null,
                displayName: null,
                photoURL: null,
                errorMessage: payload.errorMessage,
            } 
        },
        credentialCheck: (state)=>{
            state.status = 'checking';
        }

    }
});

export const { login, logout, credentialCheck } = authSlice.actions;


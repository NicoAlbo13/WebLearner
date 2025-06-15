import { logInWithEmailPassword, logoutFirebase, registerWithEmail, signInWithGoogle } from "../../firebase/provider";
import { credentialCheck, login, logout } from "./authSlice"

export const authCheck = (email, password) => {
    return async (dispatch) => {
        dispatch(credentialCheck());

    }
}

export const startGoogleSignIn = (email, password) => {
    return async (dispatch) => {
        dispatch(credentialCheck())
        const res = await signInWithGoogle();
        // console.log({res});
        if(!res.ok){
            dispatch(logout(res))
        }else{
            dispatch(login(res))
        }
        
    }
}

export const startCreatingUserWithEmail = ({email, password, displayName})=>{
    return async (dispatch)=>{
        dispatch(credentialCheck())
        const res = await registerWithEmail({email, password, displayName});

        if(!res.ok){
            dispatch(logout(res))
        }else{
            dispatch(login(res))
        }
    }
}

export const startLogInWithEmail = ({email, password})=>{
    return async (dispatch)=>{
        dispatch(credentialCheck())
        const res = await logInWithEmailPassword({email, password})

        if(!res.ok){
            dispatch(logout(res))
        }else{
            dispatch(login(res))
        }
    }
}

export const startLogout = ()=>{
    return async(dispatch)=>{
        await logoutFirebase();

        dispatch(logout())
    }
}

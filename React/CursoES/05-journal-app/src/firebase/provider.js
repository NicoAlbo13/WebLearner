import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { FirebaseAuth } from "./config";

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(FirebaseAuth, googleProvider);
        // const credentials = GoogleAuthProvider.credentialFromResult(result);
        const { email, displayName, photoURL, uid } = result.user;
        
        return {
            ok: true,
            email, displayName, photoURL, uid
        }
        
    } catch (error) {
        console.log(error);
        const errorMessage = error.message;
        const errorCode = error.code;

        return {
            ok: false,
            errorCode, errorMessage
        }
    }
}

export const registerWithEmail = async ({email, password, displayName}) => {
    try {
        const res = await createUserWithEmailAndPassword(FirebaseAuth, email, password); 
        const { uid, photoURL } = res.user;
        // console.log(res);
        await updateProfile( FirebaseAuth.currentUser, {displayName} )

        return{
            ok: true,
            email, displayName, uid, photoURL,
        }
        
    } catch (error) {
        // console.log(error);
        const errorMessage = error.message;
        const errorCode = error.code;

        return {
            ok: false,
            errorCode, errorMessage
        }
    }
}

export const logInWithEmailPassword = async({email, password}) => {
    try {
        const res = await signInWithEmailAndPassword(FirebaseAuth, email, password);
        // console.log(res);
        const { uid, displayName, photoURL } = res.user;

        return {
            ok: true,
            email, uid, displayName, photoURL,
        }
    } catch (error) {
        // console.log(error);
        const errorMessage = error.message;
        const errorCode = error.code;

        return {
            ok: false,
            errorCode, errorMessage
        }
    }
}

export const logoutFirebase = async()=>{
    return await FirebaseAuth.signOut()
}

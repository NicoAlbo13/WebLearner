import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { FirebaseAuth } from "./config";

export const registerUser = async (email, password, displayName) => {
    try {
        const res = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
        const { uid, photoURL } = res.user;

        await updateProfile(FirebaseAuth.currentUser, {displayName})

        return {
            ok: true,
            uid, email, displayName, photoURL,
        }

    } catch (error) {
        console.log(error);

        return {
            ok: false,
            errorMessage: error.message,
        }

    }
}

export const loginUser = async (email, password) => {
    try {
        const res = await signInWithEmailAndPassword(FirebaseAuth, email, password);
        const { uid, photoURL, displayName } = res.user;

        return {
            ok: true,
            uid, photoURL, displayName, email,
        }

    } catch (error) {
        return {
            ok: false,
            errorMessage: error.message,
        }
    }
}

export const logoutUser = async()=>{
    return await FirebaseAuth.signOut()
}

export const authStateAsync = () => {
    return new Promise((resolve, reject)=>{
        const unsubscribe = onAuthStateChanged(FirebaseAuth, user => {
            if(user){
                const { uid, photoURL, displayName, email } = user;
                resolve({
                    ok: true,
                    uid, photoURL, displayName, email,
                })
            }else{
                resolve({
                    ok: false,
                    errorMessage: 'Need to Login',
                })
            }
            unsubscribe()
        }, e => reject(e))

    })
}

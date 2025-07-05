import { useDispatch, useSelector } from "react-redux"

import calendarApi from "../api/calendarApi";
import { clearErrorMessage, onChecking, onLogin, onLogout } from "../store/auth/authSlice";
import { onClearCalendar } from "../store/calendar/calendarSlice";


export const useAuthStore = () => {

    const { status, user, errorMessage } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const startLogin = async ({email, password}) => {
        dispatch( onChecking() );
        try {
            const res = await calendarApi.post('/auth', { email, password });

            const { token, uid, name } = res.data;
            localStorage.setItem('token', token);
            localStorage.setItem('token-init', new Date().getTime());

            dispatch(onLogin({uid, name}));

        } catch (error) {
            // console.log(error);
            dispatch(onLogout('Incorrect credentials'));
            setTimeout(()=> {
                dispatch(clearErrorMessage());
            }, 10)
        }
    }

    const startRegister = async({name, email, password}) => {
        dispatch(onChecking());

        try {
            const res = await calendarApi.post('/auth/new', {name, email, password});
            const { token, uid } = res.data;
            localStorage.setItem('token', token);
            localStorage.setItem('token-init', new Date().getTime());

            dispatch(onLogin({uid, name}));

        } catch (error) {
            // console.log(error.response.data);
            dispatch(onLogout(error.response.data.msg || 'Error on the register form'));
            setTimeout(()=> {
                dispatch(clearErrorMessage());
            }, 10)
        }
    }

    const checkAuthToken = async() => {
        const token = localStorage.getItem('token');
        if( !token ) return dispatch( onLogout(undefined) );

        try {
            const { data } = await calendarApi.get('/auth/renew');
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init', new Date().getTime());

            dispatch(onLogin({uid: data.uid, name: data.name}));

        } catch (error) {
            localStorage.clear();
            dispatch( onLogout(undefined) );
        }
    }

    const startLogout = () => {
        localStorage.clear()
        dispatch(onClearCalendar())
        dispatch(onLogout(undefined));
    }

    return {
        //Properties
        status,
        user,
        errorMessage,

        //Methods
        checkAuthToken,
        startLogin,
        startLogout,
        startRegister,
    }
}

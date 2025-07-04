import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useAuthStore } from '../../../hooks/useAuthStore';
import { useForm } from '../../../hooks/useForm';
import './login.css';

const loginForm = {
    loginEmail:'',
    loginPassword: ''
}

const registerForm = {
    registerName: '',
    registerEmail:'',
    registerPassword: '',
    registerPassword2: '',
}

export const LoginPage = () => {

    const { errorMessage, startLogin, startRegister } = useAuthStore();

    const [matchingPassword, setMatchingPassword] = useState('');
    const {loginEmail, loginPassword, onInputChange: onLoginChange} = useForm(loginForm);
    const {registerName, registerEmail, registerPassword, registerPassword2, onInputChange} = useForm(registerForm);

    const handleLogin = (e) => {
        e.preventDefault();

        startLogin({email: loginEmail, password: loginPassword});
    }

    const handleRegister = (e) => {
        e.preventDefault();
        if(registerPassword !== registerPassword2){
            Swal.fire('Register Error', 'Not matching passwords', 'error');
            return;
        }

        startRegister({name: registerName, email: registerEmail, password: registerPassword});
    }

    useEffect(() => {
        if(errorMessage!== undefined){
            Swal.fire('Error', errorMessage, 'error');
        }
    }, [errorMessage])

    useEffect(()=>{
        if(registerPassword !== registerPassword2 && registerPassword2.length > 0){
            setMatchingPassword('Password should match')
        }else{
            setMatchingPassword('');
        }
    }, [registerPassword2, registerPassword])

    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Login</h3>
                    <form onSubmit={handleLogin}>
                        <div className="form-group mb-2">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Email"
                                name='loginEmail'
                                value={loginEmail}
                                onChange={onLoginChange}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Password"
                                name='loginPassword'
                                value={loginPassword}
                                onChange={onLoginChange}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="submit"
                                className="btnSubmit"
                                value="Login"
                            />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login-form-2">
                    <h3>Register</h3>
                    <form onSubmit={handleRegister}>
                        <div className="form-group mb-2">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Name"
                                name='registerName'
                                value={registerName}
                                onChange={onInputChange}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Email"
                                name='registerEmail'
                                value={registerEmail}
                                onChange={onInputChange}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Password"
                                name='registerPassword'
                                value={registerPassword}
                                onChange={onInputChange}
                            />
                        </div>

                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repeat Password"
                                name='registerPassword2'
                                value={registerPassword2}
                                onChange={onInputChange}
                            />
                        </div>

                        <div className="form-group mb-2">
                            <input
                                type="submit"
                                className="btnSubmit"
                                value="Create Account" />
                            <label style={{color: 'red'}}>{matchingPassword}</label>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
import { useEffect } from "react"
import { Message } from "./Message";
import { useForm } from "../hooks/useForm";

export const SimpleFormCustomHook = () => {

    const {formState, handleChange, onClearForm, username, email, password} = useForm({
        username: '',
        email: '',
        password: ''
    })

    useEffect(()=>{

    },[])

    return (
    <>
        <h1>Simple Form Custom Hook</h1>
        <hr />

        <input 
            type="text"
            className="form-control"
            placeholder="Username"
            name="username"
            value={username}
            onChange={handleChange}
        />

        <input 
            type="email"
            className="form-control mt-3"
            placeholder="email@example.com"
            name="email"
            value={email}
            onChange={handleChange}
        />

        <input 
            type="password"
            className="form-control mt-3"
            placeholder="Password"
            name="password"
            value={password}
            onChange={handleChange}
        />

        <button onClick={onClearForm} className="btn btn-primary mt-3">Clear</button> 

    </>
    )
}

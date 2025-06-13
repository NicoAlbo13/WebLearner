import { useEffect, useState } from "react"
import { Message } from "./Message";

export const SimpleForm = () => {

    const [formState, setFormState] = useState({
        username: 'username',
        email: 'email@example.com'
    })

    function handleChange ({target}){
        const {name, value} = target;
        setFormState({
            ...formState, 
            [name]:value
        })
    }

    useEffect(()=>{

    },[])

    return (
    <>
        <h1>Simple Form</h1>
        <hr />

        <input 
            type="text"
            className="form-control"
            placeholder="Username"
            name="username"
            value={formState.username}
            onChange={handleChange}
        />

        <input 
            type="email"
            className="form-control mt-3"
            placeholder="email@example.com"
            name="email"
            value={formState.email}
            onChange={handleChange}
        />

        {
            (formState.username==='Albo') && <Message/>
        }
    </>
    )
}

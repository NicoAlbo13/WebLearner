import { useState } from "react";

export const useForm = (initialForm={}) => {

    const [formState, setFormState] = useState(initialForm)

    
        function handleChange ({target}){
            const {name, value} = target;
            setFormState({
                ...formState, 
                [name]:value
            })
        }

        function onClearForm(e){
            // e.preventDefault()
            setFormState(initialForm)
        }

    return {
        ...formState,
        formState,
        handleChange,
        onClearForm
    }
}

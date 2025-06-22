import { useEffect, useMemo, useState } from 'react';

export const useForm = ( initialForm = {}, formValidator={} ) => {

    const [ formState, setFormState ] = useState( initialForm );
    const [formValidation, setFormValidation] = useState({});

    useEffect(() => {
        createValidators()
    }, [formState])

    useEffect(() => {
        setFormState(initialForm);
    }, [initialForm])

    const isFormValid = useMemo(()=>{
        for (const field of Object.keys(formValidation)) {
            if(formValidation[field] !== null){
                // console.log(formValidation[field]);
                return false;
            }
        }
        return true;
    },[formValidation]) 

    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setFormState({
            ...formState,
            [ name ]: value
        });
    }

    const onResetForm = () => {
        setFormState( initialForm );
    }

    const createValidators = () =>{
        const finalValues = {}

        for (const field of Object.keys(formValidator)) {
            const [fn, message] = formValidator[field];
            finalValues[`${field}Valid`] = fn(formState[field]) ? null : message;
        }

        setFormValidation(finalValues);
    }

    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,

        ...formValidation,
        isFormValid,
    }
}
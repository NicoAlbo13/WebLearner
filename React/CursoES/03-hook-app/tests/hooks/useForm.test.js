import {act, renderHook} from '@testing-library/react'
import { useForm } from "../../src/hooks/useForm"

describe('tests on useForm', () => {

    const initialForm = {
        name: 'Albo',
        email: 'text@e.com'
    }

    test('should first', () => {
        const { result } = renderHook(()=>useForm(initialForm))
        expect(result.current).toEqual({
            name: initialForm.name,
            email: initialForm.email,
            formState: initialForm,
            handleChange: expect.any(Function),
            onClearForm: expect.any(Function)
        })
    })

    test('should return the changed name handleChange', () => {
        const { result } = renderHook(()=>useForm(initialForm));
        const newVal = {
            name: 'name',
            value: 'Juan',
        }
        act(()=>{
            result.current.handleChange({target:newVal})
        })

        expect(result.current.name).toBe(newVal.value)
        expect(result.current.formState.name).toBe(newVal.value)
    })

    test('should return the reset-ed form after some change', () => {
        const { result } = renderHook(()=>useForm(initialForm));
        const newVal = {
            name: 'name',
            value: 'Juan',
        }
        act(()=>{
            result.current.handleChange({target:newVal})            
            result.current.onClearForm()
        })
        

        expect(result.current.name).toBe(initialForm.name)
        expect(result.current.formState.name).toBe(initialForm.name)
    })

})  

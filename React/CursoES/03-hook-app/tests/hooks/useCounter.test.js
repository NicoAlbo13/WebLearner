import { act, renderHook } from '@testing-library/react';
import { useCounter } from "../../src/hooks/useCounter"

describe('test on useCounter', () => {

    test('should return de default values', () => {
        const { result } =renderHook(()=>useCounter());
        const { counter, decrement, increment, reset } = result.current;
        expect(counter).toBe(10)
        expect(decrement).toEqual(expect.any(Function))
        expect(increment).toEqual(expect.any(Function))
        expect(reset).toEqual(expect.any(Function))
    })

    test('should return the initial value of 100 sent', () => {
        const { result } =renderHook(()=>useCounter(100));
        const { counter} = result.current;
        expect(counter).toBe(100)
    })

    test('should return an incremented value', () => {
        const { result } =renderHook(()=>useCounter(100));
        const { counter,increment } = result.current;

        act(()=>{
            increment();
            increment(3)
        })

        expect(result.current.counter).toBe(104)
        
    })

    test('should return an decremented value', () => {
        const { result } =renderHook(()=>useCounter(100));
        const { counter,decrement } = result.current;

        act(()=>{
            decrement();
            decrement(3)
        })

        expect(result.current.counter).toBe(96)
        
    })

    test('should return an reset value', () => {
        const { result } =renderHook(()=>useCounter(100));
        const { counter,decrement, reset } = result.current;

        act(()=>{
            decrement();
            decrement(3);
            reset()
        })

        expect(result.current.counter).toBe(100)
        
    })

})

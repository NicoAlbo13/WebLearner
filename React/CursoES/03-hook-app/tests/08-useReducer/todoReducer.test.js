import { todoReducer } from "../../src/08-useReducer/todoReducer"

describe('test on todoReducer', () => {

    const initialState = [{
        id: 1,
        desc: 'This is a TODO',
        done: false,
    }]

    test('should return the initial state', () => {
        const newState = todoReducer(initialState, {})
        expect(newState).toBe(initialState);
    })

    test('should add a new todo', () => {
        const action={
            type: '[TODO] Add Todo',
            payload:{
                id: 2,
                desc: 'New Todo Added',
                done: false,
            }
        }
        const newState = todoReducer(initialState, action)
        expect(newState.length).toBe(2);
        expect(newState).toContain(action.payload);
    })

    test('should delete a todo', ()=>{
        const newState = todoReducer(initialState, {type: '[TODO] Delete Todo', payload: 1})
        expect(newState.length).toBe(0);
        expect(newState).toEqual([]);
    })

    test('should toggle a todo', () => {
        const newState = todoReducer(initialState, {type: '[TODO] Toggle Todo', payload: 1})
        expect(newState[0].done).toBe(!initialState.done)
    })

})

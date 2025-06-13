import { authReducer } from "../../../src/auth/context/authReducer"
import { types } from "../../../src/auth/types/types";

describe('test on authReducer', () => {

    const initialState = {
        logged: false,
    }

    test('should the default state', () => {

        const newState = authReducer(initialState, {});

        expect(newState).toBe(initialState);
    })

    test('should call login and return user with logged status', () => {

        const action = {
            type: types.login,
            payload: {
                id: 'ABC',
                name: 'Name'
            }
        }

        const newState = authReducer(initialState, action);

        expect(newState.logged).toBeTruthy();
        expect(newState.user).toEqual(action.payload);
    })

    test('should call login and return user with logged status', () => {

        const action = {
            type: types.logout,
        }

        const newState = authReducer(initialState, action);

        expect(newState.logged).toBeFalsy();
        expect(newState.user).toBe(undefined);
    })

})


import { authSlice, clearErrorMessage, onLogin, onLogout } from "../../../src/store/auth/authSlice"
import { authenticatedState, initialState, notAuthenticatedState } from "../../fixtures/authStates"
import { testsUserCredentials } from "../../fixtures/testUser";

describe('tests on the authSlice', () => {

    test('should return a default state', () => {
        expect( authSlice.getInitialState() ).toEqual(initialState)
    });

    test('should make a login correctly', () => {

        const state = authSlice.reducer(initialState, onLogin(testsUserCredentials))

        expect(state).toEqual({...authenticatedState, user: testsUserCredentials})

    });

    test('should make a logout correctly', () => {

        const state = authSlice.reducer(authenticatedState, onLogout())

        expect(state).toEqual(notAuthenticatedState)
    })

    test('should clean the error message added', () => {

        const error = 'No valid credentials'
        const state = authSlice.reducer(authenticatedState, onLogout(error));
        const cleanState = authSlice.reducer(state, clearErrorMessage())
        
        expect(cleanState.errorMessage).toBe(undefined)

    })

})

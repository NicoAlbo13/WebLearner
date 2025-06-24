import { authSlice, credentialCheck, login, logout } from "../../../src/store/auth/authSlice"
import { authenticatedState, demoUser, initialState, notAuthenticatedState } from "../../fixtures/authFixtures";

describe('tests on authSlice', () => {

    test('should should return initialState and name "auth"', () => {

        expect(authSlice.name).toBe('auth');

        const state = authSlice.reducer(initialState, {});

        expect(state).toEqual(initialState);
    })

    test('should make a login state authentication', () => {
        const state = authSlice.reducer(initialState, login( demoUser ));

        expect(state).toEqual({...demoUser, status: 'authenticated', errorMessage: null});
    })

    test('should make a logout state not-authenticated', () => {
        const state = authSlice.reducer(authenticatedState, logout({}));

        expect(state).toEqual(notAuthenticatedState);
    })

    test('should make a logout with errorMessage', () => {
        const message = 'logout message'
        const state = authSlice.reducer(authenticatedState, logout({errorMessage: message}));

        expect(state).toEqual({...notAuthenticatedState, errorMessage: message});
    })

    test('should change status to "checking"', () => {
        const state = authSlice.reducer(authenticatedState, credentialCheck());

        expect(state.status).toBe('checking')
    })

})


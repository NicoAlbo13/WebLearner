import {fireEvent, render, screen} from '@testing-library/react'
import { configureStore } from '@reduxjs/toolkit';
import { Provider, useDispatch } from 'react-redux';
import { MemoryRouter } from 'react-router';

import { LoginPage } from "../../../src/auth/pages/LoginPage"
import { authSlice } from '../../../src/store/auth/authSlice';
import { notAuthenticatedState } from '../../fixtures/authFixtures';


const mockstartGoogleSignIn = jest.fn();
const mockstartLogInWithEmail = jest.fn();

jest.mock('../../../src/store/auth/thunks', ()=>({
    startGoogleSignIn: ()=> mockstartGoogleSignIn,
    startLogInWithEmail: ({email, password})=> {
        return ()=> mockstartLogInWithEmail({email, password})
    }
}));

jest.mock('react-redux', ()=>({
    ...jest.requireActual('react-redux'),
    useDispatch: ()=>(fn)=> fn()
}))


//prevent unnecessary import connections
jest.mock('../../../src/firebase/config.js', () => ({
  FirebaseAuth: {},
  FirebaseDB: {},
  app: {}
}));

jest.mock("../../../src/store/journal/helpers/fileUpload", ()=>({
    fileUpload: {}
}))


describe('tests on Login Page component', () => {

    beforeEach(()=>jest.clearAllMocks())

    const store = configureStore({
        reducer: {
            auth: authSlice.reducer
        },
        preloadedState: {
            auth: notAuthenticatedState
        }
    })

    test('should display the component correctly', () => {

        render(
        <Provider store={store}>
            <MemoryRouter>
                <LoginPage/>
            </MemoryRouter>
        </Provider>
        )

        expect(screen.getAllByText('Login').length).toBeGreaterThanOrEqual(1)

    })

    test('should call the startGoogleSignIn on google button click', () => {

        render(
        <Provider store={store}>
            <MemoryRouter>
                <LoginPage/>
            </MemoryRouter>
        </Provider>
        )

        const googleBtn = screen.getByLabelText('google-btn');

        fireEvent.click(googleBtn);

        expect(mockstartGoogleSignIn).toHaveBeenCalled()

    })

    test('should call the startLogInWithEmail on form submit', () => {

        const email = 'test@tester.com';
        const password = '123456';

        render(
        <Provider store={store}>
            <MemoryRouter>
                <LoginPage/>
            </MemoryRouter>
        </Provider>
        )

        const emailInput = screen.getByRole('textbox', {name: 'Mail'});
        fireEvent.change(emailInput, {target: {name: 'email', value: email}})

        // const passwordInput = screen.getByTestId('password')
        const passwordInput = screen.getByLabelText(/password/i)
        fireEvent.change(passwordInput, {target: {name: 'password', value: password}})

        const form = screen.getByLabelText('submit-form')
        fireEvent.submit(form)

        expect(mockstartLogInWithEmail).toHaveBeenCalledWith({email, password})

    })

})

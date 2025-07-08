import { act, renderHook, waitFor } from "@testing-library/react"
import { Provider } from "react-redux"
import { configureStore } from "@reduxjs/toolkit"
import { authSlice } from "../../src/store/auth/authSlice"
import { useAuthStore } from "../../src/hooks/useAuthStore"
import { notAuthenticatedState } from "../fixtures/authStates"
import { testsUserCredentials } from "../fixtures/testUser"
import calendarApi from "../../src/api/calendarApi"

const getMockStore = (initialState) => {
    return configureStore({
        reducer: {
            auth: authSlice.reducer
        },
        preloadedState: {
            auth: {...initialState}
        }
    })
}

describe('test on the useAuthStore', () => {

    beforeEach(()=>{
        localStorage.clear();
    })

    test('should return the default values expected', () => {

        const mockedStore = getMockStore({status: 'checking',user: {}, errorMessage: undefined,})

        const { result } = renderHook(()=>useAuthStore(), {
            wrapper: ({children}) => <Provider store={mockedStore}>{children}</Provider>
        })

        expect(result.current).toEqual({
            checkAuthToken: expect.any(Function),
            startLogin: expect.any(Function),
            startLogout: expect.any(Function),
            startRegister: expect.any(Function),
            status: 'checking',
            user: {},
            errorMessage: undefined,
        })
    })

    test('should make login correctly with startLogin', async() => {

        const mockedStore = getMockStore({...notAuthenticatedState})

        const { result } = renderHook(()=>useAuthStore(), {
            wrapper: ({children}) => <Provider store={mockedStore}>{children}</Provider>
        })

        await act(async()=> {
            await result.current.startLogin({...testsUserCredentials})
        })

        const { user, status, errorMessage } = result.current;

        expect({user, status, errorMessage}).toEqual({
            errorMessage: undefined,
            status: 'authenticated',
            user: { uid: '6869740cddc7885045cf9c63', name: 'TesterUser' }
        });

        expect(localStorage.getItem('token')).toEqual(expect.any(String))
        expect(localStorage.getItem('token-init')).toEqual(expect.any(String))

    });

    test('should make failed login with startLogin', async() => {

        const mockedStore = getMockStore({...notAuthenticatedState})

        const { result } = renderHook(()=>useAuthStore(), {
            wrapper: ({children}) => <Provider store={mockedStore}>{children}</Provider>
        })

        await act(async()=> {
            await result.current.startLogin({email: 'notuser@mail.com', password: 'incorrect'})
        })

        const { user, status, errorMessage } = result.current;

        expect(localStorage.getItem('token')).toBe(null)
        expect({ user, status, errorMessage }).toEqual({
            status: 'not-authenticated',
            user: {},
            errorMessage: 'Incorrect credentials',
        })

        //wait for the SetTimeout to clear the error message and check it happens
        await waitFor(
            ()=> expect(result.current.errorMessage).toBe(undefined)
            )
    });

    test('should make a register correctly with startRegister', async () => {

        const newUser = {
            name: 'Test 2',
            email: 'test2@mail.com',
            password: '1234564968'
        }

        const mockedStore = getMockStore({...notAuthenticatedState})

        const { result } = renderHook(()=>useAuthStore(), {
            wrapper: ({children}) => <Provider store={mockedStore}>{children}</Provider>
        });

        //mock the post return of the API, so don't create a new user each time
        const spy = jest.spyOn(calendarApi, 'post').mockReturnValue({
            data: {
                ok: true,
                uid: 'abc123',
                name: 'Test 2',
                token: 'test-token',
            }
        })

        await act(async()=>{
            await result.current.startRegister(newUser)
        });

        const { user, status, errorMessage } = result.current;

        expect({ user, status, errorMessage }).toEqual({
            user: { uid: 'abc123', name: 'Test 2' },
            status: 'authenticated',
            errorMessage: undefined
        })
        expect(localStorage.getItem('token')).toBe('test-token')

        spy.mockRestore()
    });

    test('should make failed register with startRegister', async() => {

        const mockedStore = getMockStore({...notAuthenticatedState})

        const { result } = renderHook(()=>useAuthStore(), {
            wrapper: ({children}) => <Provider store={mockedStore}>{children}</Provider>
        })

        await act(async()=> {
            await result.current.startRegister(testsUserCredentials)
        })

        const { user, status, errorMessage } = result.current;

        expect({ user, status, errorMessage }).toEqual({
            status: 'not-authenticated',
            user: {},
            errorMessage: "User already registered with that email",
        });
        expect(localStorage.getItem('token')).toBe(null)
    });

})

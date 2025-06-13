import {fireEvent, render, screen} from '@testing-library/react'
import { Navbar } from '../../src/ui/Navbar'
import { MemoryRouter, replace, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../src/auth/context/AuthContext'

//mock only partial functionality of whole library
const mockedUseNavigate = jest.fn()

jest.mock('react-router-dom', ()=>({
    //only change on useNavigate
    ...jest.requireActual('react-router-dom'),
    useNavigate: ()=> mockedUseNavigate
}))

describe('test on Navbar component', () => {

    beforeEach(()=>jest.clearAllMocks())

    const contextState = {
        logged: true,
        user:{
            id: 'abc',
            name: 'Albo'
        },
        logout: jest.fn()
    }

    beforeEach(()=>jest.clearAllMocks())

    test('should show the name of the user', () => {

        render(
            <MemoryRouter>
                <AuthContext.Provider value={contextState}>
                    <Navbar/>
                </AuthContext.Provider>
            </MemoryRouter>
        )

        // screen.debug()

        expect( screen.getByText(contextState.user.name) ).toBeTruthy()

    })

    test('should call logout and navigate when button clicked', () => {

        render(
            <MemoryRouter>
                <AuthContext.Provider value={contextState}>
                    <Navbar/>
                </AuthContext.Provider>
            </MemoryRouter>
        )

        // screen.debug()
        const button = screen.getByRole('button');
        fireEvent.click(button)

        expect(contextState.logout).toHaveBeenCalled()

        expect(mockedUseNavigate).toHaveBeenCalledWith("/login", {'replace': true})

    })

})

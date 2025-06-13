import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../../src/auth";
import { AppRouter } from "../../src/routes/AppRouter";


describe('test on AppRouter component', () => {

    test('should render Login if NOT authenticated', () => {


        render(
            <MemoryRouter initialEntries={['/marvel']}>
                <AuthContext.Provider value={{logged: false}}>
                    <AppRouter/>
                </AuthContext.Provider>
            </MemoryRouter>
        )

        // screen.debug();

        expect( screen.getAllByText('Login').length ).toBe(2);
    })

    test('should show Marvel component if IS authenticated', () => {

        const state = {
            logged: true,
            user: {
                id: 'abc',
                name: 'Albo'
            }
        }

        render(
            <MemoryRouter initialEntries={['/login']}>
                <AuthContext.Provider value={state}>
                    <AppRouter/>
                </AuthContext.Provider>
            </MemoryRouter>
        )

        // screen.debug()

        expect( screen.getByText('Marvel Comics') ).toBeTruthy()

    })

})

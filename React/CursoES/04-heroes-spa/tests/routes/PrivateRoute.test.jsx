import { render, screen } from "@testing-library/react"
import { AuthContext } from "../../src/auth"
import { PrivateRoute } from "../../src/routes/PrivateRoute"
import { MemoryRouter } from "react-router-dom"

describe('tests on PrivateRoute component', () => {

    test('should show children if it is authenticated', () => {

        Storage.prototype.setItem = jest.fn()

        const children = <h1>Private Route</h1>

        const contextValue = {
            logged: true,
            user: {
                id: 'ABC',
                name: 'Albo'
            }
        }

        render(
        <AuthContext.Provider value={contextValue}>
            <MemoryRouter initialEntries={['/search?q=batman']}>
                <PrivateRoute>
                    {children}
                </PrivateRoute>
            </MemoryRouter>
        </AuthContext.Provider>
        )

        // screen.debug()

        expect( screen.getByText('Private Route') ).toBeTruthy();
        expect(localStorage.setItem).toHaveBeenCalledWith('lastPath', '/search?q=batman')

    })

})

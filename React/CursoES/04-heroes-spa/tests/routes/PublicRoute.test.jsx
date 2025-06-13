import { render, screen } from '@testing-library/react'
import { AuthContext } from '../../src/auth'
import { PublicRoute } from '../../src/routes/PublicRoute'
import { MemoryRouter, Route, Routes } from 'react-router-dom'

describe('test on PublicRoute component', () => {

    const children = <h1>Public Route</h1>

    test('should show children if it is NOT authenticated', () => {

        const contextValue = {
            logged: false
        }

        render(
        <AuthContext.Provider value={contextValue}>
            <PublicRoute>
                {children}
            </PublicRoute>
        </AuthContext.Provider>
        )

        // screen.debug()

        expect( screen.getByText('Public Route') ).toBeTruthy()

    })

    test('should navigate if user IS authenticated', () => {
        const contextValue = {
            logged: true,
            user: {
                id: 'ABC',
                name: 'Albo'
            }
        }

        const children = <h1>Public Route</h1>

        render(
        <AuthContext.Provider value={contextValue}>
            <MemoryRouter initialEntries={['/login']}>
                <Routes>
                    <Route path='login' element={
                        <PublicRoute>
                            {children}
                        </PublicRoute>}
                    />
                    <Route path='/' element={<h1>Other Route</h1>}/>
                </Routes>
                
            </MemoryRouter>
        </AuthContext.Provider>
        )

        // screen.debug()

        expect( screen.getByText('Other Route') ).toBeTruthy();
    })

})

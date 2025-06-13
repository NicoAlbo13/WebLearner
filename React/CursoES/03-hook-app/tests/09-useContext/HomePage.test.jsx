import {render, screen} from '@testing-library/react'
import { HomePage } from '../../src/09-useContext/HomePage'
import { UserContext } from '../../src/09-useContext/context/UserContext'

describe('test on HomePage component', () => {

    const user={
        id:1,
        name: 'Albo'
    }

    test('should show component with NO user', () => {
        render(
        <UserContext.Provider value={{user: null}}>
            <HomePage/>
        </UserContext.Provider>
        )
        const pre=screen.getByLabelText('pre');
        expect(pre.innerHTML).toBe('null')
        // screen.debug()
    })

    test('should show component WITH user', () => {
        render(
            <UserContext.Provider value={{user: user}}>
                <HomePage/>
            </UserContext.Provider>
            )
            const pre=screen.getByLabelText('pre');
            expect(pre.innerHTML).toContain(user.name)
            expect(pre.innerHTML).toContain(`${user.id}`)
    })

})

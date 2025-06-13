import { fireEvent, render, screen } from "@testing-library/react";
import { LoginPage } from "../../src/09-useContext/LoginPage";
import { UserContext } from "../../src/09-useContext/context/UserContext";


describe('test on LoginPage component', () => {

    test('should show the component with NO user', () => {
        render(
            <UserContext.Provider value={{user:null}}>
                <LoginPage/>
            </UserContext.Provider>
        )
        expect(screen.getByText('null')).toBeTruthy()
        expect(screen.getByLabelText('pre').innerHTML).toBe('null')
        // screen.debug()
    })

    test('should call handleUser when button clicked', () => {
        const handleUserMock=jest.fn()
        render(
            <UserContext.Provider value={{user:null, handleUser: handleUserMock}}>
                <LoginPage/>
            </UserContext.Provider>
        )

        const button=screen.getByRole('button');
        fireEvent.click(button)
        expect(handleUserMock).toHaveBeenCalled()
    })

})

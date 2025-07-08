import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router"
import { AppRouter } from "../../src/routes/AppRouter"
import { useAuthStore } from "../../src/hooks/useAuthStore"

jest.mock("../../src/hooks/useAuthStore")

jest.mock("../../src/calendar/pages/CalendarPage",()=>({
    CalendarPage: ()=> (<h1>CalendarPage</h1>)
}))

describe('test on the <AppRouter/>', () => {

    const mockedCheckAuthToken = jest.fn();

    beforeEach(()=> jest.clearAllMocks())

    test('should show a loading screen and call the checkAuthToken', () => {
        useAuthStore.mockReturnValue({
            checkAuthToken: mockedCheckAuthToken,
            status: 'checking'
        })
        render(<AppRouter/>)
        const title = screen.getByRole('heading', {level: 3})
        expect(title.innerHTML).toBe("Loading...");
        expect(mockedCheckAuthToken).toHaveBeenCalled()
    })

    test('should show the login in case not-authenticated', () => {
        useAuthStore.mockReturnValue({
            checkAuthToken: mockedCheckAuthToken,
            status: 'not-authenticated'
        })

        const {container} =render(
            <MemoryRouter>
                <AppRouter/>
            </MemoryRouter>
        )

        expect(screen.getAllByText('Login')).toBeTruthy();
        expect(container).toMatchSnapshot()
    })

    test('should show the calendar in case authenticated', () => {
        useAuthStore.mockReturnValue({
            checkAuthToken: mockedCheckAuthToken,
            status: 'authenticated'
        })

        const {container} =render(
            <MemoryRouter>
                <AppRouter/>
            </MemoryRouter>
        )
        
        expect(screen.getByText('CalendarPage')).toBeTruthy()
    })

})

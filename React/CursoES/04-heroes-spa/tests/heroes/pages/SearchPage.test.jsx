import { fireEvent, render, screen } from "@testing-library/react";
import { SearchPage } from "../../../src/heroes/pages/SearchPage";
import { MemoryRouter, useNavigate } from "react-router-dom";

const mockedUseNavigate = jest.fn()

jest.mock("react-router-dom", ()=>({
    ...jest.requireActual("react-router-dom"),
    useNavigate: ()=> mockedUseNavigate,
}))

describe('test on SearchPage component', () => {

    beforeEach(()=>jest.clearAllMocks())

    test('should render with default correct values', () => {

        const {container} = render(
            <MemoryRouter>
                <SearchPage/>
            </MemoryRouter>
        )

        expect(container).toMatchSnapshot();

    })

    test('should show Batman and input with the value of queryString', () => {

        const hero = 'batman'

        render(
            <MemoryRouter initialEntries={[`/search?q=${hero}`]}>
                <SearchPage/>
            </MemoryRouter>
        )

        // screen.debug()

        const input = screen.getByRole('textbox');
        expect(input.value).toBe(hero)

        const img = screen.getByRole('img');
        expect(img.src).toContain(hero)

    })

    test('should show an error if hero not found (batman123)', () => {
        const hero = 'batman123'

        render(
            <MemoryRouter initialEntries={[`/search?q=${hero}`]}>
                <SearchPage/>
            </MemoryRouter>
        )

        // screen.debug()
        expect(screen.getByText('Hero not found')).toBeTruthy()

    })

    test('should call navigate with searched hero onSubmit', () => {

        const mockedVal = 'wolverine'

        render(
            <MemoryRouter initialEntries={[`/search`]}>
                <SearchPage/>
            </MemoryRouter>
        )

        // screen.debug()
        const input = screen.getByRole('textbox')
        fireEvent.change(input, {target: {value: mockedVal}})
        const form = screen.getByLabelText('form')
        fireEvent.submit(form);

        expect(mockedUseNavigate).toHaveBeenCalledWith(`?q=${mockedVal}`)
    })

})

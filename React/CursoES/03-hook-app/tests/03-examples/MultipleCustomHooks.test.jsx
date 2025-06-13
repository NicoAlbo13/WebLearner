import {fireEvent, render, screen} from '@testing-library/react';
import { MultipleCustomHooks } from '../../src/03-examples/MultipleCustomHooks';
import { useFetch } from '../../src/hooks/useFetch';
import { useCounter } from '../../src/hooks/useCounter';

jest.mock('../../src/hooks/useFetch');
jest.mock('../../src/hooks/useCounter');

describe('tests on MultipleCustomHooks component', () => {

    const mockIncrement = jest.fn();
    const mockDecrement = jest.fn()
        useCounter.mockReturnValue({
            counter: 2,
            increment: mockIncrement,
            decrement: mockDecrement,
        })
    beforeEach(()=>jest.clearAllMocks)

    test('should render a default component', () => {
        useFetch.mockReturnValue({
            data: null,
            isLoading: true,
            hasError: false,
        })

        render(<MultipleCustomHooks/>);

        
        expect(screen.getByText('Loading...'))
        expect(screen.getByText('Pokemon Info'))

        const nextButton = screen.getByRole('button', {name: 'Next'})
        const prevButton = screen.getByRole('button', {name: 'Previous'})

        expect(nextButton.disabled).toBeTruthy();
        expect(prevButton.disabled).toBeTruthy();

        // screen.debug()
    })

    test('should return a pokemon info', () => {

        useFetch.mockReturnValue({
            data: {id: 1, name: 'Pikachu', sprites:{front_default: 'https://data.com/image1.jpg',back_default: 'https://data.com/image2.jpg',front_shiny: 'https://data.com/image3.jpg',back_shiny: 'https://data.com/image4.jpg'}},
            isLoading: false,
            hasError: false,
        })

        render(<MultipleCustomHooks/>);
        //check if id and name on the text
        expect(screen.getByText('#1 - Pikachu')).toBeTruthy();

        //check if name and id one by one
        const headingInfo = screen.getByRole('heading', {level: 2}).innerHTML
        expect(headingInfo).toContain('Pikachu');
        expect(headingInfo).toContain('1');

        //check button enabled after send
        const nextButton = screen.getByRole('button', {name: 'Next'})
        const prevButton = screen.getByRole('button', {name: 'Previous'})
        expect(nextButton.disabled).toBeFalsy();
        expect(prevButton.disabled).toBeFalsy();

        //check images receiving correct source
        const images = screen.getAllByAltText('Pikachu_image');
        expect(images[0].src).toBe('https://data.com/image1.jpg')
        expect(images[1].src).toBe('https://data.com/image2.jpg')
        expect(images[2].src).toBe('https://data.com/image3.jpg')
        expect(images[3].src).toBe('https://data.com/image4.jpg')
        // console.log(images);
        
        // screen.debug()

    })

    test('should call to the function increment', () => {
        
        
        useFetch.mockReturnValue({
            data: {id: 1, name: 'Pikachu', sprites:{front_default: 'https://data.com/image1.jpg',back_default: 'https://data.com/image2.jpg',front_shiny: 'https://data.com/image3.jpg',back_shiny: 'https://data.com/image4.jpg'}},
            isLoading: false,
            hasError: false,
        })

        render(<MultipleCustomHooks/>);

        const nextButton = screen.getByRole('button', {name: 'Next'})
        const prevButton = screen.getByRole('button', {name: 'Previous'})
        
        fireEvent.click(nextButton);
        expect(mockIncrement).toHaveBeenCalled();
        fireEvent.click(prevButton)
        expect(mockDecrement).toHaveBeenCalled();
    })

})

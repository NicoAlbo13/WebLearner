import { fireEvent, render, screen } from '@testing-library/react';
import { GifExpertApp } from "../src/GifExpertApp";

describe('test on GifExpertApp component', () => {

    const newCategory = 'Dragon Ball';

    test('should match Snapshot', () => {
        const { container } = render(<GifExpertApp/>)
        expect(container).toMatchSnapshot();
    })

    test('should add a new category when submitted', () => {
        render(<GifExpertApp/>)
        const input = screen.getByRole('textbox');
        const form = screen.getByRole('form')

        fireEvent.input(input, {target:{value: newCategory}});
        fireEvent.submit(form);

        expect(screen.getAllByRole('heading', {level: 3}).length).toBe(2)//taking in count only h3 handle categories
        // screen.debug()
    })

    test('should not add repeated category', () => {
        render(<GifExpertApp/>)
        const input = screen.getByRole('textbox');
        const form = screen.getByRole('form')

        //add same value twice
        fireEvent.input(input, {target:{value: newCategory}});  
        fireEvent.input(input, {target:{value: newCategory}});
        fireEvent.submit(form);

        //only one should be added
        expect(screen.getAllByRole('heading', {level: 3}).length).toBe(2)//taking in count only h3 handle categories
    })

})

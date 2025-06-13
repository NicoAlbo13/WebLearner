import { fireEvent, render, screen } from '@testing-library/react';
import { AddCategory } from '../../src/components/AddCategory';

describe('test on AddCategory component', () => { 

    test('should change value of the text box', () => { 

        render(<AddCategory onAddCategory={()=>{}}/>)
        const input = screen.getByRole('textbox');
        fireEvent.input(input, {target: {value: 'Saitama'}});
        expect(input.value).toBe('Saitama');
        // screen.debug()
    })

    test('should call onAddCategory if input has a value', () => { 
        const inputValue = 'Saitama';
        const onAddCategory = jest.fn();

        render(<AddCategory onAddCategory={onAddCategory}/>)

        const input = screen.getByRole('textbox');
        const form = screen.getByRole('form');

        fireEvent.input(input, {target: {value: inputValue}});
        fireEvent.submit(form);

        expect(input.value).toBe('');

        expect(onAddCategory).toHaveBeenCalled()
        expect(onAddCategory).toHaveBeenCalledTimes(1)
        expect(onAddCategory).toHaveBeenCalledWith(inputValue)

    })

    test('should not call onAddCategory if no input send', () => {
        const onAddCategory=jest.fn();

        render(<AddCategory onAddCategory={onAddCategory}/>)

        const form = screen.getByRole('form');
        fireEvent.submit(form);

        expect(onAddCategory).toHaveBeenCalledTimes(0)
    })

})

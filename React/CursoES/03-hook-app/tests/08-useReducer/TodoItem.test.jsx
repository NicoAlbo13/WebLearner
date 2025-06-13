import { fireEvent, render, screen } from "@testing-library/react";
import { TodoItem } from "../../src/08-useReducer/TodoItem";


describe('test on TodoItem component', () => {

    const todo={
        id:1, 
        desc: 'This is a desc',
        done: false,
    };

    const onDeleteItemMock = jest.fn();
    const onToggleTodoMock = jest.fn();

    beforeEach(()=> jest.clearAllMocks());

    test('should show the TODO pending', () => {
        render(<TodoItem 
                todo={todo}
                onDeleteItem={onDeleteItemMock}
                onToggleTodo={onToggleTodoMock} 
                />) 

        expect(screen.getByText(todo.desc)).toBeTruthy();
        expect(screen.getByLabelText('span').className).toContain('align-self-center')
        expect(screen.getByLabelText('span').className).not.toContain('text-decoration-line-through')
        // screen.debug()
    })
    
    test('should show the TODO completed', () => {
        todo.done=true
        
        render(<TodoItem 
                todo={todo}
                onDeleteItem={onDeleteItemMock}
                onToggleTodo={onToggleTodoMock} 
                />) 

        expect(screen.getByLabelText('span').className).toContain('text-decoration-line-through')
        // screen.debug()
    })

    test('should call the function ToggleTodo when clicked', () => {
        render(<TodoItem 
            todo={todo}
            onDeleteItem={onDeleteItemMock}
            onToggleTodo={onToggleTodoMock} 
            />) 

        const span= screen.getByLabelText('span');
        fireEvent.click(span)
        expect(onToggleTodoMock).toBeCalledWith(todo.id)
    // screen.debug()
    })

    test('should call the function DeleteItem when clicked', () => {
        render(<TodoItem 
            todo={todo}
            onDeleteItem={onDeleteItemMock}
            onToggleTodo={onToggleTodoMock} 
            />) 

        const button= screen.getByRole('button');
        fireEvent.click(button)
        expect(onDeleteItemMock).toBeCalledWith(todo.id)
    // screen.debug()
    })

})

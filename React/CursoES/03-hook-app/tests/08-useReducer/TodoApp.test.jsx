import { render,screen } from "@testing-library/react";
import { TodoApp } from "../../src/08-useReducer/TodoApp";
import { useTodos } from "../../src/hooks/useTodos";

jest.mock("../../src/hooks/useTodos")

describe('test on TodoApp component', () => {

    useTodos.mockReturnValue({
        todos:[
            {id: 1,desc: 'string1',done: false},
            {id: 2,desc: 'string2',done: true},
        ],
        todosCount: 2,
        pendingTodoCount: 1,
        handleNewTodo: jest.fn(),
        handleDeleteTodo: jest.fn(),
        handleToggleTodo: jest.fn(),
    })

    test('should show the completed component', () => {
        render(<TodoApp/>)
        // screen.debug()
        expect(screen.getByText('string1')).toBeTruthy()
        expect(screen.getByText('string2')).toBeTruthy()
        expect(screen.getByRole('textbox')).toBeTruthy()
        expect(screen.getAllByRole('listitem').length).toBe(2)
    })

})

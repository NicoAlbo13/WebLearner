import { useEffect, useReducer } from "react";
import { todoReducer } from "../08-useReducer/todoReducer";

const init = ()=>{
    return JSON.parse(localStorage.getItem('todos')) || [];
}

export const useTodos = ()=> {

    const [todos, dispatch] = useReducer(todoReducer, [], init);

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos])
    

    const handleNewTodo = (todo)=>{
        const newAction = {
            type: '[TODO] Add Todo',
            payload: todo,
        };
        
        dispatch(newAction);
    }

    const handleDeleteTodo = (id)=>{
        dispatch({
            type: '[TODO] Delete Todo',
            payload: id,
        });
    }

    const handleToggleTodo = (id)=>{        
        dispatch({
            type: '[TODO] Toggle Todo',
            payload: id,
        })
    }
    

    return {
    todos,
    todosCount: todos.length,
    pendingTodoCount: todos.filter(todo=>(!todo.done)).length,
    handleNewTodo,
    handleDeleteTodo,
    handleToggleTodo,
    }
}

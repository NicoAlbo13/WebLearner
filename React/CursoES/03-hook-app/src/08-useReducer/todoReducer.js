
export const todoReducer = (initialState=[], action)=>{
    switch (action.type) {
        case '[TODO] Add Todo'://action.payload receives full todo object
            return [...initialState, action.payload];

        case '[TODO] Delete Todo'://action.payload receives id 
            return initialState.filter((todo)=>todo.id!=action.payload);

        case '[TODO] Toggle Todo'://action.payload receives id 
            return initialState.map((todo)=>{
                if(todo.id===action.payload){
                    return {
                        ...todo,
                        done: !todo.done,
                    }
                }
                return todo;
            })
    
        default:
            return initialState;
    }
}

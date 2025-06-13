export const TodoItem = ({todo, onDeleteItem, onToggleTodo}) => {
    // console.log(todo);
    
    const handleClick=()=>{
      onDeleteItem(todo.id)
    }

  return (
    <>
        <li key={todo.id} className="list-group-item d-flex justify-content-between">
            <span
            className={`align-self-center ${todo.done ? 'text-decoration-line-through':''}`}
            onClick={()=>onToggleTodo(todo.id)}
            aria-label="span"
            >
              {todo.desc}
              </span>
            <button 
            className="btn btn-danger" 
            onClick={handleClick}>
              Delete
              </button>
        </li>
    </>
  )
}

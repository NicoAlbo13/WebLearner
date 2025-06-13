import { useForm } from "../hooks";

export const TodoAdd = ({onNewTodo}) => {
    
    const {desc:task, handleChange, onClearForm} = useForm({desc:''})

    const handleSubmit = (e)=>{
        e.preventDefault();
        // console.log("send: ", task);
        
        if(task.trim()==='') return; //check not empty task
        onNewTodo({
            id: new Date().getTime(),
            desc: task,
            done: false,
        })
        onClearForm(e);
    }

    return (
    <>
        <form onSubmit={handleSubmit}>
            <input 
            type="text" 
            placeholder="What u doin?"
            className="form-control"
            name="desc"
            onChange={handleChange}
            value={task}
            />
            <button 
            type="submit"
            className="btn btn-outline-primary mt-2"
            >
                Add
            </button>
        </form>
    </>
    )
}

import { useCalendarStore } from "../../hooks/useCalendarStore";

export const FabDelete = () => {

    const {startDeletingEvent, hasEventSelected} = useCalendarStore()

    const handleClick = ()=> {
        startDeletingEvent();
    }

  return (
    <button
    className="btn btn-danger fab-danger"
    onClick={handleClick}
    style={{
        display: hasEventSelected ? '' : 'none'
    }}
    >
        <i className="fas fa-trash-alt"></i>
    </button>
  )
}

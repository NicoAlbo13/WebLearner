import { addHours } from "date-fns"
import { useCalendarStore } from "../../hooks/useCalendarStore"
import { useUiStore } from "../../hooks/useUiStore"

export const FabAddNew = () => {

    const {openDateModal} = useUiStore()
    const {setActiveEvent} = useCalendarStore()

    const handleClick = ()=> {
        setActiveEvent({
            title: '',
            notes: '',
            start: new Date(),
            end: addHours(new Date(), 2),
            user: {
                _id: '123',
                name: 'lilalbo'
            }
        });
        openDateModal();
    }

  return (
    <button
    className="btn btn-primary fab"
    onClick={handleClick}
    >
        <i className="fas fa-plus"></i>
    </button>
  )
}

import { useDispatch, useSelector } from "react-redux"
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from "../store/calendar/calendarSlice";
import calendarApi from "../api/calendarApi";
import { transformEventToDate } from "../helpers/transformEventToDate";
import Swal from "sweetalert2";

export const useCalendarStore = () => {

    const dispatch = useDispatch();
    const {events, activeEvent} = useSelector(state=>state.calendar);
    const {user} = useSelector(state=>state.auth);

    const setActiveEvent = ( calendarEvent ) => {
        dispatch(onSetActiveEvent(calendarEvent))
    }

    const startSavingEvent = async(calendarEvent) => {
        //All backend job etc...

        try {
            if(calendarEvent.id){
                //updating note
                await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent);
                dispatch(onUpdateEvent({...calendarEvent, user}));
                return;
            }

            //creating new note
            const {data} = await calendarApi.post('/events/', calendarEvent);
            // console.log(data);
            dispatch(onAddNewEvent({...calendarEvent, id: data.event.id, user}))
        } catch (error) {
            console.log(error);
            Swal.fire('Cuidao', error.response.data.msg, 'warning');
            return;
        }
    }

    const startDeletingEvent = async() => {
        try {
            await calendarApi.delete(`/events/${activeEvent.id}`);
            dispatch(onDeleteEvent())
        } catch (error) {
            console.log(error);
            Swal.fire('Cuidao', error.response.data.msg, 'warning');
        }
    }

    const startLoadingEvents = async() => {
        try {

            const { data } = await calendarApi.get('/events/');

            const events = transformEventToDate(data.events);

            dispatch(onLoadEvents(events));

        } catch (error) {
            console.log('Error while loading events');
            console.log(error);
        }
    }

    return{
        //Properties
        events,
        activeEvent,
        hasEventSelected: !!activeEvent,

        //Methods
        setActiveEvent,
        startSavingEvent,
        startDeletingEvent,
        startLoadingEvents,
    }
}

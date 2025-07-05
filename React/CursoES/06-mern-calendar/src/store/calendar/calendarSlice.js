import { createSlice } from "@reduxjs/toolkit";
// import { addHours } from "date-fns";

// const tempEvent = {
//     _id: new Date().getTime(),
//     title: 'EVENT',
//     notes: 'temp notes',
//     start: new Date(),
//     end: addHours(new Date(), 2),
//     user: {
//         _id: '123',
//         name: 'lilalbo'
//     }
// }

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
        isLoadingEvents: true,
        events: [
            // tempEvent,
        ],
        activeEvent: null,
    },
    reducers: {
        onSetActiveEvent: (state, action) => {
            state.activeEvent = action.payload;
        },
        onAddNewEvent: (state, action) => {
            state.events.push(action.payload);
            state.activeEvent = null;
        },
        onUpdateEvent: (state, action) => {
            state.events = state.events.map((event)=>{
                if(event.id === action.payload.id){
                    return action.payload;
                };
                return event;
            });
            state.activeEvent = null;
        },
        onDeleteEvent: (state) => {
            if(state.activeEvent){
                state.events = state.events.filter(event=> event.id !== state.activeEvent.id);
                state.activeEvent = null;
            }
        },
        onLoadEvents: (state, action) => {
            state.isLoadingEvents = false;
            // state.events = action.payload;
            action.payload.forEach(event => {
                const exists = state.events.some(dbEvent => dbEvent.id === event.id);
                if(!exists){
                    state.events.push(event);
                }
            });
        },
        onClearCalendar: (state) => {
            state.isLoadingEvents = true;
            state.events = [];
            state.activeEvent = null;
        }
    }
});

export const {
    onDeleteEvent,
    onSetActiveEvent,
    onAddNewEvent,
    onUpdateEvent,
    onLoadEvents,
    onClearCalendar,
    } = calendarSlice.actions;

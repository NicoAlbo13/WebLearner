import { calendarSlice, onAddNewEvent, onClearCalendar, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from "../../../src/store/calendar/calendarSlice"
import { events, initialState, stateWithActiveEvent, stateWithEvents } from "../../fixtures/calendarStates"

describe('test on calendarSlice', () => {

    test('should make initial state', () => {

        const state = calendarSlice.getInitialState()

        expect(state).toEqual(initialState)

    });

    test('should change state to activeEvent onSetActiveEvent', () => {

        const state = calendarSlice.reducer(stateWithEvents, onSetActiveEvent({...events[0]}))
        expect(state).toEqual(stateWithActiveEvent)
    });

    test('should add a new event onAddNewEvent', () => {

        const newEvent = {
            id: '3',
            title: 'EVENT THREE',
            notes: 'temp notes, nut from user 3',
            start: new Date('2022-12-21 13:00:00'),
            end: new Date('2022-12-21 15:00:00')
        }
        const state = calendarSlice.reducer(stateWithEvents, onAddNewEvent(newEvent))

        expect(state.events).toEqual([...events, newEvent])
    });

    test('should update a new event onUpdateEvent', () => {

        const updatedEvent = {
            id: '1',
            title: 'EVENT CHANGE',
            notes: 'updated notes',
            start: new Date('2022-12-21 13:00:00'),
            end: new Date('2022-12-21 15:00:00')
        }
        const state = calendarSlice.reducer(stateWithActiveEvent, onUpdateEvent(updatedEvent))

        expect(state.events).toContain(updatedEvent);
    });

    test('should delete an active event with onDeleteEvent', () => {
        const state = calendarSlice.reducer(stateWithActiveEvent, onDeleteEvent())

        expect(state.events).toEqual([events[1]])
    });

    test('should change state to not loading and update events list onLoadEvents', () => {
        const state = calendarSlice.reducer(initialState, onLoadEvents(events))

        expect(state).toEqual(stateWithEvents)
    });

    test('should clear the state back to the initial onClearCalendar', () => {
        const state = calendarSlice.reducer(stateWithEvents, onClearCalendar())

        expect(state).toEqual(initialState)
    })

})

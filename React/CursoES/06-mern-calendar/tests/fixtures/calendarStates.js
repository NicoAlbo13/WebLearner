
export const events =[
    {
    id: '1',
    title: 'EVENT',
    notes: 'temp notes',
    start: new Date('2022-10-21 13:00:00'),
    end: new Date('2022-10-21 15:00:00')
    },
    {
    id: '2',
    title: 'EVENT TWO',
    notes: 'temp notes, nut from user 2',
    start: new Date('2022-11-21 13:00:00'),
    end: new Date('2022-11-21 15:00:00')
    },
];

export const initialState = {
    isLoadingEvents: true,
    events: [],
    activeEvent: null,
};

export const stateWithEvents = {
    isLoadingEvents: false,
    events: [...events],
    activeEvent: null,
}

export const stateWithActiveEvent = {
    isLoadingEvents: false,
    events: [...events],
    activeEvent: {...events[0]},
}


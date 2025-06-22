import { createSlice } from '@reduxjs/toolkit'

export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        isSaving: false,
        messageSaved: '',
        notes: [],
        active: null,
    },
    reducers: {
        savingNewNote: (state) => {
            state.isSaving = true;
        },
        addNewEmptyNote: (state, action) => {
            state.notes.push(action.payload);
            state.isSaving = false;
        },
        setActiveNote: (state, action) => {
            state.active = action.payload;
            state.messageSaved ='';
        },
        setNotes: (state, action) => {
            state.notes = action.payload;
        },
        setSaving: (state) => {
            state.isSaving = true;
            state.messageSaved ='';
        },
        updateNotes: (state, action) => {
            state.notes = state.notes.map((note)=>(
                note.id === action.payload.id
                ? action.payload
                : note
            ));
            state.messageSaved = `${action.payload.title}, saved correctly!`;
            state.isSaving = false;
        },
        setImgToActiveNote: (state, action) => {
            state.active.imageUrls = [...state.active.imageUrls, ...action.payload];
            state.isSaving = false;
        },
        clearNotesLogout: (state, action) => {
            state.isSaving = false;
            state.messageSaved ='';
            state.notes = [];
            state.active = null;
        },
        deleteNoteById: (state, action) => {
            state.active = null;
            state.notes = state.notes.filter(note => note.id !== action.payload)
        },
    }
});


export const {
    clearNotesLogout,
    savingNewNote, 
    addNewEmptyNote,
    setActiveNote,
    setNotes,
    setSaving,
    updateNotes,
    deleteNoteById,
    setImgToActiveNote
} = journalSlice.actions;

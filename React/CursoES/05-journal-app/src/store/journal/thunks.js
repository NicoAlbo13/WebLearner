import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { addNewEmptyNote, deleteNoteById, savingNewNote, setActiveNote, setImgToActiveNote, setNotes, setSaving, updateNotes } from "./journalSlice";
import { loadNotes } from "./helpers/loadNotes";
import { fileUpload } from "./helpers/fileUpload";

export const startNewNote = () => {
    return async(dispatch, getState)=>{

        dispatch(savingNewNote());

        const { uid } = getState().auth;
        
        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
            imageUrls: []
        }

        const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`));
        await setDoc(newDoc, newNote);

        newNote.id = newDoc.id;

        dispatch(addNewEmptyNote(newNote));
        dispatch(setActiveNote(newNote));
    }
}

export const startLoadingNotes = () => {
    return async (dispatch, getState) => {
        const { uid } = getState().auth;

        const res = await loadNotes(uid);
        // console.log(res);
        dispatch(setNotes(res));
    }
}

export const startSavingNote = () => {
    return async (dispatch, getState) => {

        dispatch(setSaving());
        
        const { uid } = getState().auth;
        const { active:note } = getState().journal;

        const finalNote = {...note};
        delete finalNote.id;

        const updateDoc = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);
        await setDoc(updateDoc, finalNote, {merge: true});

        dispatch(updateNotes(note));
    }
}

export const startUploadingImg = (files=[]) => {
    return async (dispatch) => {
        dispatch(setSaving());
        
        const fileUploadPromises = [];
        for (const file of files) {
            fileUploadPromises.push(fileUpload(file));
        }

        const imgUrls = await Promise.all(fileUploadPromises);
        // console.log(imgUrls);
        
        dispatch(setImgToActiveNote(imgUrls));
    }
}

export const startDeletingNote = () => {
    return async(dispatch, getState) => {
        const { uid } = getState().auth;
        const { active:note } = getState().journal;

        const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);
        await deleteDoc(docRef);

        dispatch(deleteNoteById(note.id));
    }
}

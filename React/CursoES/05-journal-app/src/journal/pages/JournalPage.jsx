import { IconButton } from "@mui/material"
import { JournalLayout } from "../layout/JournalLayout"
import { EmptyView } from "../views/EmptyView"
import { NoteView } from "../views/NoteView"
import { AddOutlined } from "@mui/icons-material"
import { useDispatch, useSelector } from "react-redux"
import { startNewNote } from "../../store/journal/thunks"

export const JournalPage = () => {

  const dispatch = useDispatch()
  const { isSaving, active } = useSelector(state => state.journal);

  const handleNewNote = () => {
    dispatch(startNewNote());
  }

  return (
    <JournalLayout>
      {
        active == null?
        <EmptyView/>
        :<NoteView/>
      }
      
      {/* <NoteView/> */}

    <IconButton
      onClick={handleNewNote}
      disabled={isSaving}
      size="large"
      sx={{
        color: 'white',
        backgroundColor: 'error.main',
        ':hover': {backgroundColor: 'error.main', opacity: 0.8},
        position: 'fixed',
        right: 50,
        bottom: 50
      }}
    >
      <AddOutlined sx={{fontSize: 30}}/>
    </IconButton>

    </JournalLayout>
  )
}

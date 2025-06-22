import { useEffect, useMemo, useRef } from 'react'
import {useDispatch, useSelector} from 'react-redux'

import { DeleteOutlineOutlined, SaveOutlined, UploadFileOutlined } from "@mui/icons-material"
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material"
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.css'

import { ImgGallery } from "../components/ImgGallery"
import { useForm } from "../../hooks/useForm"
import { setActiveNote } from '../../store/journal/journalSlice'
import { startDeletingNote, startSavingNote, startUploadingImg } from '../../store/journal/thunks'

export const NoteView = () => {

  const dispatch = useDispatch();
  const inputRef = useRef()

  const { active: note, messageSaved, isSaving } = useSelector(state => state.journal);
  const { date, body,  title, onInputChange, formState } = useForm(note);

  const dateString = useMemo(()=>{
    const newDate = new Date(date);
    return newDate.toUTCString();
  }, [date]);

  useEffect(()=>{
    dispatch(setActiveNote(formState));
  }, [formState]);

  useEffect(() => {
    if(messageSaved.length>0){
      Swal.fire('Success!', messageSaved, 'success');
    }
  }, [messageSaved])

  const handleUpload = ({target}) => {
    if(target.files === 0) return;
    dispatch(startUploadingImg(target.files));
  }

  const handleSaveNote = () => {
    dispatch(startSavingNote())
  }

  const handleDelete = () => {
    dispatch(startDeletingNote());
  }

  return (
    <Grid container direction='row' justifyContent='space-between' alignItems='center' sx={{mb: 1}}>
      <Grid>
        <Typography fontSize={39} fontWeight='light'>{dateString}</Typography>
      </Grid>

      <Grid>

        <input 
        type="file"
        multiple
        style={{display: 'none'}}
        ref={inputRef}
        onChange={handleUpload}
        />

        <IconButton color='primary' sx={{padding: 2}} 
          disabled={isSaving}
          onClick={()=> inputRef.current.click()}
          >
            <UploadFileOutlined/>
        </IconButton>

        <Button color="primary" sx={{padding: 2}} onClick={handleSaveNote} disabled={isSaving}>
          <SaveOutlined sx={{fontSize: 30, mr: 1}}/>
          Save
        </Button>
      </Grid>

      <Grid container width='100%' >
        <TextField
          type="text"
          variant="filled"
          fullWidth
          placeholder="Write..."
          label="Title"
          sx={{border: 'none', mb: 1}}
          name='title'
          value={title}
          onChange={onInputChange}
        />
        <TextField
          type="text"
          variant="filled"
          fullWidth
          multiline
          placeholder="Write your note..."
          minRows={5}
          name='body'
          value={body}
          onChange={onInputChange}
        />
      </Grid>

      <Grid container justifyContent='end'>
        <Button onClick={handleDelete} sx={{mt: 2}} color='error'>
          <DeleteOutlineOutlined/>
          <Typography fontWeight='bold'>DELETE</Typography>
        </Button>
      </Grid>

      <ImgGallery images={note.imageUrls}/>

    </Grid>
  )
}

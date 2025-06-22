import { TurnedInNot } from "@mui/icons-material"
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import { useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setActiveNote } from "../../store/journal/journalSlice"

export const SideBarItem = ({title, body, note}) => {

  const dispatch = useDispatch();
  // const {notes} = useSelector(state => state.journal)

  const finalTitle = useMemo(()=> {
    return title.length > 15
    ? title.substring(0,15)+'...'
    : title
  }, [title])

  const finalBody = useMemo(()=>{
    return body.length >40  
    ? body.substring(0, 38)+'...'
    :body
  }, [body])

  const handleClick = ()=>{
    // const fullNote = notes.filter(note=>note.id === id)
    dispatch(setActiveNote({...note}));
  }

  return (
    <ListItem disablePadding>
      <ListItemButton onClick={handleClick}>
          <ListItemIcon>
          <TurnedInNot/>
          </ListItemIcon>
          <Grid container>
            <ListItemText primary={finalTitle}/>
            <ListItemText secondary={finalBody}/>
          </Grid>
      </ListItemButton>
    </ListItem>
  )
}

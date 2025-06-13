import { SaveOutlined } from "@mui/icons-material"
import { Button, Grid, TextField, Typography } from "@mui/material"
import { ImgGallery } from "../components/ImgGallery"

export const NoteView = () => {
  return (
    <Grid container direction='row' justifyContent='space-between' alignItems='center' sx={{mb: 1}}>
      <Grid>
        <Typography fontSize={39} fontWeight='light'>6th June, 2025</Typography>
      </Grid>

      <Grid>
        <Button color="primary" sx={{padding: 2}}>
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
        />
        <TextField
          type="text"
          variant="filled"
          fullWidth
          multiline
          placeholder="Write your note..."
          minRows={5}
        />
      </Grid>

      <ImgGallery/>

    </Grid>
  )
}

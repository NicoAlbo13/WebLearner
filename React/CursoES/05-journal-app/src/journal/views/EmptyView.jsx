import { StarOutline } from "@mui/icons-material"
import { Grid, Typography } from "@mui/material"

export const EmptyView = () => {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems='center'
      justifyContent='center'
      sx={{minHeight: '85vh', backgroundColor: 'primary.main',  borderRadius: 3}}
    >
      <Grid xs={12}>
        <StarOutline sx={{fontSize: 100, color: "white"}}/>
      </Grid>
      <Grid xs={12}>
        <Typography color="white" variant="h5">Select or create a note</Typography>
      </Grid>
    </Grid>
  )
}

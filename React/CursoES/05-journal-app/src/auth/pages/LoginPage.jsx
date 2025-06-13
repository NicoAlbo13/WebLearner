import { Link as RouterLink } from 'react-router'
import { Button, Grid, Link, TextField, Typography } from "@mui/material"
import { Google } from "@mui/icons-material";
import { AuthLayout } from '../layout/AuthLayout';

export const LoginPage = () => {
  return (
      <AuthLayout title='Login'>

        <form>
          <Grid container>
            <Grid size={12} sx={{mt: 2}}>
              <TextField 
              label='Mail' 
              type="email" 
              placeholder="mail@example.com"
              fullWidth
              />
            </Grid>

            <Grid size={12} sx={{mt: 2}}>
              <TextField 
              label='Password' 
              type="password" 
              placeholder="password"
              fullWidth
              />
            </Grid>

            <Grid container spacing={2} sx={{mb: 2, mt: 2}} size={12}>
              <Grid size={{xs: 12, sm: 6}}>
                <Button variant="contained" fullWidth>
                  Login
                </Button>
              </Grid>
              <Grid size={{xs: 12, sm: 6}}>
                <Button variant="contained" fullWidth>
                  <Google/>
                  <Typography sx={{ml: 1}}>Google</Typography>
                </Button>
              </Grid>
            </Grid>

            <Grid container direction='row' justifyContent='end' size={12}>
              <Link  component={RouterLink} color="inherit" to='/auth/register'>
                Create an account
              </Link>
            </Grid>

          </Grid>
        </form>

      </AuthLayout>
  )
}

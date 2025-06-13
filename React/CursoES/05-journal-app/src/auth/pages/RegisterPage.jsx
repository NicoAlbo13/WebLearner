import { Link as RouterLink } from 'react-router'
import { Button, Grid, Link, TextField, Typography } from "@mui/material"
import { AuthLayout } from '../layout/AuthLayout';

export const RegisterPage = () => {
  return (
      <AuthLayout title='Register'>

        <form>
          <Grid container>
            <Grid size={12} sx={{mt: 2}}>
              <TextField 
              label='Name' 
              type="text" 
              placeholder="Full Name"
              fullWidth
              />
            </Grid>

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
              <Grid size={{xs: 12}}>
                <Button variant="contained" fullWidth>
                  Register
                </Button>
              </Grid>
            </Grid>

            <Grid container direction='row' justifyContent='end' size={12}>
              <Typography sx={{mr:1}}>Have an account?</Typography>
              <Link  component={RouterLink} color="inherit" to='/auth/login'>
                Login
              </Link>
            </Grid>

          </Grid>
        </form>

      </AuthLayout>
  )
}

import { useDispatch, useSelector } from 'react-redux'
import { Link as RouterLink } from 'react-router'

import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material"
import { Google } from "@mui/icons-material";

import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks';
import { startGoogleSignIn, startLogInWithEmail } from '../../store/auth/thunks';
import { useMemo } from 'react';

export const LoginPage = () => {

  const { status, errorMessage } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const { email, password, onInputChange } = useForm({email: 'albo@google.com', password: '123456'})

  const isAuthenticated = useMemo(()=> status === 'checking',[status]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(startLogInWithEmail({email, password}))
    // dispatch(authCheck())
  }

  const handleGoogleSignIn = () => {
    console.log('Google');
    dispatch(startGoogleSignIn())
  }

  return (
      <AuthLayout title='Login'>

        <form onSubmit={handleSubmit} 
          className='animate__animated animate__fadeIn animate__fast'>
          <Grid container>
            <Grid size={12} sx={{mt: 2}}>
              <TextField 
              label='Mail' 
              type="email" 
              placeholder="mail@example.com"
              fullWidth
              name='email'
              value={email}
              onChange={onInputChange}
              />
            </Grid>

            <Grid size={12} sx={{mt: 2}}>
              <TextField 
              label='Password' 
              type="password" 
              placeholder="password"
              fullWidth
              name='password'
              value={password}
              onChange={onInputChange}
              />
            </Grid>

            <Grid container spacing={2} sx={{mb: 2, mt: 2}} size={12} display={!!errorMessage? '' : 'none'}>
              <Grid size={{xs: 12}}>
                <Alert severity='error'>{errorMessage}</Alert>
              </Grid>
            </Grid>

            <Grid container spacing={2} sx={{mb: 2, mt: 2}} size={12}>
              <Grid size={{xs: 12, sm: 6}}>
                <Button
                  disabled={isAuthenticated} 
                  type='submit' 
                  variant="contained" 
                  fullWidth
                >
                  Login
                </Button>
              </Grid>
              <Grid size={{xs: 12, sm: 6}}>
                <Button
                  disabled={isAuthenticated}  
                  onClick={handleGoogleSignIn} 
                  variant="contained" fullWidth
                >
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

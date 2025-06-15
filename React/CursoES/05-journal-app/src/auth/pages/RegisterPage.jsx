import { Link as RouterLink } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material"
import { AuthLayout } from '../layout/AuthLayout';

import { useForm } from '../../hooks'
import { useMemo, useState } from 'react';
import { startCreatingUserWithEmail } from '../../store/auth/thunks';

const initialFormState = {
  displayName: '',
  email: '',
  password: ''
};

const formValidation = {
  email: [(value)=>value.includes('@'), 'Email should contain @'],
  password: [(value)=>value.length >= 6, 'Password should be at least 6 char long.'],
  displayName: [(value)=>value.length >= 1, 'Name is mandatory.'],
}


export const RegisterPage = () => {

  const dispatch = useDispatch()
  const { status, errorMessage } = useSelector(state => state.auth)
  const isChecking = useMemo(() => status === 'checking', [status])

  const {
    formState, displayName, email, password, onInputChange,
    isFormValid, displayNameValid, emailValid, passwordValid,
  } = useForm(initialFormState, formValidation);

  const [isFormSubmitted, setIsFormSubmitted] = useState(false)

  const handleSubmit = (e)=>{
    e.preventDefault();
    setIsFormSubmitted(true);
    if(!isFormValid) return;
    dispatch(startCreatingUserWithEmail(formState))
    // console.log(formState);
  }

  return (
      <AuthLayout title='Register'>

        <form onSubmit={handleSubmit} 
          className='animate__animated animate__fadeIn animate__fast'>
          <Grid container>
            <Grid size={12} sx={{mt: 2}}>
              <TextField 
              label='Name' 
              type="text" 
              placeholder="Full Name"
              fullWidth
              name='displayName'
              value={displayName}
              onChange={onInputChange}
              error={!!displayNameValid && isFormSubmitted}
              helperText={displayNameValid}
              />
            </Grid>

            <Grid size={12} sx={{mt: 2}}>
              <TextField 
              label='Mail' 
              type="email" 
              placeholder="mail@example.com"
              fullWidth
              name='email'
              value={email}
              onChange={onInputChange}
              error={!!emailValid && isFormSubmitted}
              helperText={emailValid}
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
              error={!!passwordValid && isFormSubmitted}
              helperText={passwordValid}
              />
            </Grid>

            <Grid container spacing={2} sx={{mb: 2, mt: 2}} size={12} display={!!errorMessage? '' : 'none'}>
              <Grid size={{xs: 12}}>
                <Alert severity='error'>
                  {errorMessage}
                </Alert>
              </Grid>  
            </Grid>
            
            <Grid container spacing={2} sx={{mb: 2, mt: 2}} size={12}>
              <Grid size={{xs: 12}}>
                <Button type='submit' variant="contained" fullWidth disabled={isChecking}>
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

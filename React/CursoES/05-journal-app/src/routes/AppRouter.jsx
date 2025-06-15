import { Navigate, Route, Routes } from 'react-router'
import { AuthRoutes } from '../auth/routes/AuthRoutes'
import { JournalRoutes } from '../journal/routes/JournalRoutes'
import { LoadingAuth } from '../ui'
import { useCheckAuth } from '../hooks'

export const AppRouter = () => {

  const {status} = useCheckAuth()

  if(status === 'checking'){
    return <LoadingAuth/>
  }

  return (
    <Routes>
      {
        status === 'authenticated'
        ?<Route path='/*' element={<JournalRoutes/>}/>
        :<Route path='auth/*' element={<AuthRoutes/>}/>
      }

        <Route path='/*' element={<Navigate to='auth/login'/>}/>
        {/* Login */}
        {/* <Route path='auth/*' element={<AuthRoutes/>}/> */}

        {/* App */}
        {/* <Route path='/*' element={<JournalRoutes/>}/> */}
    </Routes>
  )
}

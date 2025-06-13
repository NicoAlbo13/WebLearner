import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

export const Login = () => {

  const {login} = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogin = ()=>{

    const path = localStorage.getItem('lastPath') || '/';

    login('Mr. Nooby')
    navigate(path, {replace:true})
  }

  return (
    <div className="container mt-5">
      <h1>Login</h1>
      <hr />

      <button 
      className="btn btn-primary"
      onClick={handleLogin}
      >
        Login
      </button>
    </div>
  )
}

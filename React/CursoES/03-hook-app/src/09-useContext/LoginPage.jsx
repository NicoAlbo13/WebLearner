import { useContext } from "react"
import { UserContext } from "./context/UserContext"

export const LoginPage = () => {

      const { user, handleUser } = useContext(UserContext);
      console.log(user);
      

    return (
          <>
          <h1> LoginPage</h1>
          <hr />

          <pre aria-label="pre">
            {JSON.stringify(user, null, 3)}
          </pre>

          <button
          onClick={()=>handleUser({id:123, name:'Albo', email:'text@moretext.com'})} 
          className="btn btn-primary"
          >
            New User
          </button>
          </>
    )
  }
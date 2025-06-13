import { useState } from "react"
import { UserContext } from "./UserContext"

// const user={
//     id:123,
//     name: 'Albo',
//     email: 'test@example.com'
// }

export const UserProvider = ({ children }) => {

    const [user, setUser] = useState();

    const handleUser = (val)=>{
        setUser(val)
    }

  return (
    <UserContext.Provider value={{user, handleUser}}>
        {children}
    </UserContext.Provider>
  )
}

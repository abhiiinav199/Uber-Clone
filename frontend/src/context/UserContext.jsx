import { createContext, useState } from "react"

export const UserDataContext = createContext() 

const UserContext = ({children}) => {
    const [user, setuser] = useState({
        fullname:{
            fistname:"",
            lastname:""
        },
        email:"",
        
    })
  return (
    <div>
        <UserDataContext.Provider>
        {children}
        </UserDataContext.Provider>
        </div>
  )
}

export default UserContext
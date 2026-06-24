import React, { createContext } from 'react'
export const UserDataContext = createContext()
const UserContext = ({children}) => {
    const [user, setUser] = React.useState({
        fullname:{
            firstname:'',
            lastname:''
        },
        email:'',
        password:''
    })
    console.log("Provider value:", { user, setUser })
  return (
    <div>
      <UserDataContext.Provider value={{user, setUser }}>
        {children}
      </UserDataContext.Provider>
    </div>
  )
}

export default UserContext

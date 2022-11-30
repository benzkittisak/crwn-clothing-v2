import { createContext, useState , useEffect } from "react";

import { onAuthStateChangedListener } from "../utils";

//  as the actual value want to access
export const UserContext = createContext({
    currentUser:null,
    setCurrentUser:() => null,
});

// provider
// วิธีใช้แบบเดียวกับ BrowserRouter นั่นแหละ
export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser };

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user)=>{
      if(user) {
        setCurrentUser(user);
        console.log(user);
      }
    })

    return unsubscribe
  } , [])

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

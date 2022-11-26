import { createContext, useState } from "react";

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

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

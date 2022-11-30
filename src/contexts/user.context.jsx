import { getDoc } from "firebase/firestore";
import { createContext, useState, useEffect } from "react";

import { createUserDocmentFromAuth, onAuthStateChangedListener } from "../utils";

//  as the actual value want to access
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

// provider
// วิธีใช้แบบเดียวกับ BrowserRouter นั่นแหละ
export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser };

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener(async (user) => {
      if(user) {
        const userDocRef = await createUserDocmentFromAuth(user);
        const userData = await getDoc(userDocRef);
        setCurrentUser({id:user.uid , ...userData.data()});
      } else {
        setCurrentUser(user);
      }
    });
    return unsubscribe;
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

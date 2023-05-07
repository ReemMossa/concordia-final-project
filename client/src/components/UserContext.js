import { useState, createContext } from "react";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));

    return user;
  });
  const [status, setStatus] = useState("loading");

  return (
    <>
      <UserContext.Provider value={{ currentUser, status, setCurrentUser }}>
        {children}
      </UserContext.Provider>
    </>
  );
};

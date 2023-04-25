import { useState, createContext, useEffect } from "react";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));

    return user;
  });
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    if (currentUser) {
      console.log("currentuser", currentUser);
      fetch(`/getUser/${currentUser.email}`)
        .then((res) => {
          return res.json();
        })
        .then((parsedData) => {
          setCurrentUser(parsedData.data);
          setStatus("idle");
        })

        .catch((error) => {
          setStatus("error");
        });
    }
  }, []);

  return (
    <>
      <UserContext.Provider value={{ currentUser, status, setCurrentUser }}>
        {children}
      </UserContext.Provider>
    </>
  );
};

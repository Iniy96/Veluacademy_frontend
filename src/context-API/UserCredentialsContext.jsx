import React, { createContext, useState } from "react";
import { BrowserRouter } from "react-router-dom";

export const UserCredentialsContext = createContext(null);

export const UserCredentialContextProvider = (props) => {
  const [userCredential, setuserCredential] = useState(null);
  const [isAdminLoggedIn, setisAdminLoggedIn] = useState(null)

  const setCredential = (credential) => {
    setuserCredential(credential);
  };
  const setadminlogin = (credential) => {
    setisAdminLoggedIn(credential);
  };




  const UserCredentialsContextValue = { userCredential, setCredential,isAdminLoggedIn , setisAdminLoggedIn };

  return (
    <BrowserRouter>
      <UserCredentialsContext.Provider value={UserCredentialsContextValue}>
        {props.children}
      </UserCredentialsContext.Provider>
    </BrowserRouter>
  );
};

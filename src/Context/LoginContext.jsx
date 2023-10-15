import React, { createContext, useContext, useEffect, useState } from "react";
import profilePicturePath from "../assets/Emily_profile_icon.png";
const LoginContext = createContext();

const LoginContextProvider = (props) => {
  const localUser = localStorage.getItem("user");
  const [login, setLogin] = useState(false);
  const [user, setUser] = useState(() => {
    if (localUser) {
      return JSON.parse(localUser);
    }
    return {};
  });

  useEffect(() => {
    if (localUser) {
      setLogin(true);
    }
  }, []);
  return <LoginContext.Provider value={{ login, setLogin, user, setUser }}>{props.children}</LoginContext.Provider>;
};

const useLoginContext = () => useContext(LoginContext);
export { LoginContextProvider, useLoginContext };

/*
how to use
press toggle button coming with <Layout/>
import { useLoginContext } inside root/src/Context
then call login value
const { login } = useLoginContext();

use it
{login && <Something/>}
*/

import React, { createContext, useContext, useEffect, useState } from "react";
import profilePicturePath from "../assets/Emily_profile_icon.png";
const LoginContext = createContext();
import jwt_decode from "jwt-decode";

const LoginContextProvider = (props) => {
  const localUser = localStorage.getItem("user");
  let expiredToken = false;
  if (localUser) {
    const token = jwt_decode(JSON.parse(localUser).headers.Authorization.split(" ")[1]);
    const tokenExpireDate = token.exp;
    if (Math.round(Date.now() / 1000) > tokenExpireDate) expiredToken = true;
  }
  const [login, setLogin] = useState(false);
  const [user, setUser] = useState(() => {
    if (localUser && !expiredToken) {
      return JSON.parse(localUser);
    }
    if (expiredToken) localStorage.removeItem("user");
    return {};
  });

  useEffect(() => {
    if (localUser && !expiredToken) {
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

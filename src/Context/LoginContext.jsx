import React, { createContext, useContext, useState } from "react";
const LoginContext = createContext();

const LoginContextProvider = (props) => {
  const [login, setLogin] = useState(false);
  return <LoginContext.Provider value={{ login, setLogin }}>{props.children}</LoginContext.Provider>;
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

import React, { createContext, useContext, useState } from "react";
const LoginContext = createContext();

const LoginContextProvider = (props) => {
  const [login, setLogin] = useState(false);
  return <LoginContext.Provider value={{ login, setLogin }}>{props.children}</LoginContext.Provider>;
};

const useLoginContext = useContext(LoginContext);
export { LoginContextProvider, useLoginContext };

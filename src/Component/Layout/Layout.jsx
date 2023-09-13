import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useLoginContext } from "../../Context/LoginContext";

const Layout = (props) => {
  const { login, setLogin } = useLoginContext();
  return (
    <>
      <button
        onClick={() => {
          setLogin(!login);
        }}>
        Login Condition Test
      </button>
      <Navbar />
      {props.children}
      <Footer />
    </>
  );
};

export default Layout;

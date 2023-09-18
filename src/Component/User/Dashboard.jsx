import React from "react";
import { useNavigate } from "react-router-dom";
import { useLoginContext } from "../../Context/LoginContext";

const Dashboard = () => {
  const { login, user } = useLoginContext();
  const navigate = useNavigate();
  if (!login) {
    navigate("/");
  }
  return <div>Dashboard</div>;
};

export default Dashboard;

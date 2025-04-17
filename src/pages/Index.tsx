
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginPage from "./auth/LoginPage";

// This component is just a redirect to the login page
const Index = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    navigate("/login");
  }, [navigate]);
  
  return <LoginPage />;
};

export default Index;

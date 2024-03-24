import { Navigate, Outlet } from "react-router-dom";

const PrivateRouter = () => {
    
    
    const jsonData = localStorage.getItem("username");
  const parsedData = jsonData ? JSON.parse(jsonData) : null;

      
  

  return parsedData?.role === 1 ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRouter;

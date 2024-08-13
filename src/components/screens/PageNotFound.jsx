import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { GlobalContext } from "../store/GlobalContext";

function PageNotFound() {
    
  const { status } = useContext(GlobalContext);
    if (status && status === 200) {
        return <Navigate to="/" />;
    } else if (status && status !== 200){
        return <Navigate to="/login" />;
    }
}

export default PageNotFound
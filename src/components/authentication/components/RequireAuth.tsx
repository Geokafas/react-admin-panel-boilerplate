import { useLocation, Navigate, Outlet, useNavigate } from "react-router-dom";
import useAuth from "../../../shared/hooks/useAuth";

function RequireAuth(){
    let navigate = useNavigate();
    const { auth,setAuth }:any = useAuth();
    const location = useLocation();
    if(sessionStorage.getItem("access_token") && !auth.accessToken){
        setAuth({ email:sessionStorage.getItem("email"), 
        userId: sessionStorage.getItem("user_id"), 
        roles:'', 
        accessToken: sessionStorage.getItem("access_token") ,
        userName: sessionStorage.getItem("user_name"),
    });
        navigate('/dashboard', {replace:true});
        return  <Outlet /> 
    }

    return (
        auth?.accessToken 
        ? <Outlet /> 
        : <Navigate to='/login' state={{from:location}} replace />
    );
}

export default RequireAuth;
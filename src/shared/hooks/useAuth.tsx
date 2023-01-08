import { useContext } from "react";
import AuthContext from "../../components/authentication/auth-context/AuthContext";

export default function useAuth(){
    return useContext(AuthContext);
}

import {useContext } from "react";
import {AuthContext} from "../context/auth.context";
import {registerUser, loginUser , logoutUser} from "../service/auth.service";

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used within AuthProvider");
    }
    
    const {user, setUser, loading, setLoading} = context;

    const handleLogin = async (email, password) => {
        try{
            setLoading(true);
            const data = await loginUser({email, password});
            setUser(data.user);
            setLoading(false);
        }catch(err){
            console.log(err);
            setLoading(false);
        }
    }

    const handleRegister = async (username, email, password) => {
        try{
            setLoading(true);
            const data = await registerUser({username, email, password});
            setUser(data.user);
            setLoading(false);
        }catch(err){
            console.log(err);
            setLoading(false);
        }
    }

    const handleLogout = async () => {
        try{
            setLoading(true);
            const data = await logoutUser();
            setUser(null);
            setLoading(false);
            console.log(data.message);
        }catch(err){
            console.log(err);
            setLoading(false);
        }
    }

    return {handleLogin, handleRegister, handleLogout, user, loading};
}

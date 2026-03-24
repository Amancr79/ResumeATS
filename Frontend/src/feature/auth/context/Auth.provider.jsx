import { useState, useEffect } from "react";
import { getUserProfile } from "../service/auth.service";
import { AuthContext } from "./Auth.context";


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
   
    const getAndSetUser = async () => {
      try {
        setLoading(true);
        const data = await getUserProfile();
        setUser(data.user);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };

    getAndSetUser();
  }, []);
  return (
    <AuthContext.Provider value={{ user, setUser, loading, setLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

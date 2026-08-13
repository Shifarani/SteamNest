import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser, logoutUser } from "../api/userApi";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);


  const fetchCurrentUser = async () => {
    try {
      setLoading(true);

      const response = await getCurrentUser();

      console.log("Current User Response =>", response);

      setCurrentUser(response.data);

    } catch (error) {
      console.error(error);
      setCurrentUser(null);

    } finally {

      setLoading(false);

    }
  };



  const logout = async () => {

    try {

      await logoutUser();

      setCurrentUser(null);

    } catch (error) {

      console.log(error);

    }

  };



  useEffect(() => {

    fetchCurrentUser();

  }, []);

    return (

    <AuthContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        loading,
        fetchCurrentUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>

  );


};


export const useAuth = () => {

  return useContext(AuthContext);

};
import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

// create a authcontext that was provide the auth data..
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(
    localStorage.getItem("student_token") || null
  );
  const [isAuthenticated, setIsAuthenticated] = useState(!!authToken);

  // set user data
  const [user, setUser] = useState({});

  useEffect(() => {
    setIsAuthenticated(!!authToken);

    // if token is exists then fetch the suer data..
    if (authToken) {
      axios
        .get("http://localhost:8000/api/student/dashboard/", {
          headers: {
            Authorization: `Token ${authToken}`,
          },
        })
        .then((response) => {
          if (response.data.student) {
            console.log(response.data.student);
            setUser(response.data.student);
          } else {
            console.warn("user data in not found in response");
          }
        }).catch((error)=>{
          console.error("Failed to fetch user data....",error);
        });
    }
  }, [authToken]);

  const login = (token) => {
    localStorage.setItem("student_token", token);
    setAuthToken(token);
  };

  const logout = () => {
    localStorage.removeItem("student_token");
    setAuthToken(null);
  };

  return (
    <>
      <AuthContext.Provider
        value={{ authToken, isAuthenticated, login, logout,user }}
      >
        {children}
      </AuthContext.Provider>
    </>
  );
};

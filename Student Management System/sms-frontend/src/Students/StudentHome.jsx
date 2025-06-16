import React, { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import { useNavigate } from "react-router-dom";

export const StudentHome = () => {
  const { isAuthenticated, logout, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const LoginRedirect = () => {
    navigate("/student/login");
  };

  return (
    <>
      <div>Student Home page</div>

      {isAuthenticated && user ? (
        <>
          <h1>Student is login...</h1>
          <h1>
            Hey {user.first_name} {user.last_name} welcome to student management
            system
          </h1>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <>
          <button onClick={LoginRedirect}>Login</button>
          <p>you are not login...</p>
        </>
      )}
    </>
  );
};

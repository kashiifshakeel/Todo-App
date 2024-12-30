import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  let userId = localStorage.getItem("userId");

  return (
    <div>
      {userId ? (
        <>{children}</>
      ) : (
        <>
          <Navigate to={"/login"} />
        </>
      )}
    </div>
  );
};

export default PrivateRoute;

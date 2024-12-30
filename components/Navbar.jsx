import React from "react";
import style from "./navbar.module.css";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  let userId = localStorage.getItem("userId");

  let navigate = useNavigate();

  let logout = () => {
    localStorage.removeItem("userId");
    navigate("/login");
  };

  let deleteProfile = () => {
    let confirmation = confirm("Are you sure?");
    if (confirmation) {
      axios
        .delete(`http://localhost:5000/users/${userId}`)
        .then(() => {
          toast.success("Account Deleted!");
          localStorage.removeItem("userId");
          navigate("/register");
        })
        .catch(() => {
          toast.error("Something Went Wrong!");
        });
    }
  };

  return (
    <nav>
      <aside className={style.logo}>Logo</aside>
      <ul className={style.menu}>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        {userId ? (
          <>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li onClick={logout}>Logout</li>
          </>
        ) : (
          <>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;

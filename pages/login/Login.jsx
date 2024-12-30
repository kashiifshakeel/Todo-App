import React, { useEffect, useState } from "react";
import style from "./login.module.css";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Login = () => {
  let [loginUser, setLoginUser] = useState({
    userEmail: "",
    userPassword: "",
  });

  let [allRegisteredUser, setAllRegisteredUser] = useState(null);

  let loginHandler = (e) => {
    let { name, value } = e.target;
    setLoginUser({ ...loginUser, [name]: value });
  };

  let navigate = useNavigate();

  useEffect(() => {
    async function fetchRegisteredUser() {
      let { data } = await axios.get("http://localhost:5000/users");
      setAllRegisteredUser(data);
    }
    fetchRegisteredUser();
  }, []);

  let loginSubmit = (e) => {
    e.preventDefault();
    console.log(loginUser);
    let authUser = allRegisteredUser.find((user) => {
      return (
        user.userEmail === loginUser.userEmail &&
        user.userPassword === loginUser.userPassword
      );
    });
    // console.log(authUser)

    if (
      authUser.userEmail === "admin@gmail.com" &&
      authUser.userPassword === "admin123"
    ) {
      toast.success("Welcome!");
      localStorage.setItem("userId", authUser.id);
      navigate("/admin");
    } else if (authUser) {
      toast.success(`Welcome ${authUser.userName}!`);
      localStorage.setItem("userId", authUser.id);
      navigate("/profile");
    } else {
      toast.error("Access Denied!");
      navigate("/register");
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <br />
      <form>
        <div>
          <label>Email</label>
          <input
            type="email"
            required
            placeholder="Enter Your Email"
            name="userEmail"
            value={loginUser.userEmail}
            onChange={loginHandler}
          />
          <br />
          <br />
        </div>
        <div>
          <label>Password</label>
          <input
            required
            placeholder="Enter Password"
            name="userPassword"
            value={loginUser.userPassword}
            onChange={loginHandler}
          />
          <br />
          <br />
        </div>
        <div>
          <button onClick={loginSubmit}>Login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;

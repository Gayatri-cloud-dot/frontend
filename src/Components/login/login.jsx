import React, { useState } from "react";
import "./login.css";
import { Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../Actions/User";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  console.log(user);

  const loginHandler = (e) => {
    e.preventDefault();
    dispatch(loginUser(email, password));
  };
  return (
    <div className="login">
      <form className="loginForm" onSubmit={loginHandler}>
        <Typography variant="h3" style={{ padding: "2vmax" }}>
          Social App
        </Typography>
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Link to="/forgot/password">
          <Typography>Forgot Password</Typography>
        </Link>
        <Button type="submit" variant="contained" color="primary">
          Login
        </Button>
        <Link to="/register">
          <Typography>New User</Typography>
        </Link>
      </form>
    </div>
  );
};

export default Login;

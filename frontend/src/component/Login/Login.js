import React, { useEffect, useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { Typography, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../actions/User";
import { useAlert } from "react-alert";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const { isAuthenticated, loading, error } = useSelector(
    (state) => state.user
  );
  const loginHandler = async (e) => {
    e.preventDefault();
    dispatch(loginUser(email, password));
  };
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: "clearErrors" });
    }
    if (isAuthenticated) {
      navigate("/tasks");
    }
  }, [error, dispatch, alert, isAuthenticated, navigate]);
  return (
    <div className="login">
      <form className="loginForm" onSubmit={loginHandler}>
        <Typography className="heading">Welcome Back!</Typography>
        <input
          type="email"
          placeholder="email@gmail.com"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button disabled={loading} type="submit" className="button">
          Login
        </Button>
        <Link to="/register">
          <Typography>New User ? Register Here</Typography>
        </Link>
      </form>
    </div>
  );
};

export default Login;

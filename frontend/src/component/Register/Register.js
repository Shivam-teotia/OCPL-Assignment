import React, { useEffect, useState } from "react";
import "./Register.css";
import { Button, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../actions/User";
import { useAlert } from "react-alert";
const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();
  const { isAuthenticated, loading, error } = useSelector(
    (state) => state.user
  );
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(registerUser(name, email, password));
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
    <div className="register">
      <form className="registerForm" onSubmit={submitHandler}>
        <Typography className="heading">Welcome !</Typography>
        <input
          type="text"
          value={name}
          placeholder="Name"
          required
          className="registerInputs"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email@gmail.com"
          required
          value={email}
          className="registerInputs"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          required
          value={password}
          className="registerInputs"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button disabled={loading} type="submit" className="button">
          Register
        </Button>
        <Link to="/">
          <Typography>Already registered ? Login Here</Typography>
        </Link>
      </form>
    </div>
  );
};

export default Register;

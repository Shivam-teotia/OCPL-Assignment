import axios from "axios";

export const loginUser = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: "LoginRequest",
    });
    const { data } = await axios.post("/api/v1", { email, password });
    dispatch({ type: "LoginSuccess", payload: data.user });
  } catch (error) {
    dispatch({
      type: "LoginFailure",
      payload: error.response.data.message,
    });
  }
};

export const loggoutUser = () => async (dispatch) => {
  try {
    dispatch({
      type: "LoggoutRequest",
    });
    const { data } = await axios.get("/api/v1/logout");
    dispatch({ type: "LoggoutSuccess", payload: data.message });
  } catch (error) {
    dispatch({
      type: "LoggoutFailure",
      payload: error.response.data.message,
    });
  }
};

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: "LoadUserRequest" });
    const { data } = await axios.get("/api/v1/loadUser");
    dispatch({ type: "LoadUserSuccess", payload: data });
  } catch (error) {
    dispatch({ type: "LoadUserFailure", payload: error.response.data.message });
  }
};

export const registerUser = (name, email, password) => async (dispatch) => {
  try {
    dispatch({
      type: "RegisterRequest",
    });
    const { data } = await axios.post("/api/v1/register", {
      name,
      email,
      password,
    });
    dispatch({ type: "RegisterSuccess", payload: data.user });
  } catch (error) {
    dispatch({
      type: "RegisterFailure",
      payload: error.response.data.message,
    });
  }
};

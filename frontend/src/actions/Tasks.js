import axios from "axios";

export const getAllTasks = () => async (dispatch) => {
  try {
    dispatch({
      type: "GetTaskRequest",
    });
    const { data } = await axios.get("/api/v1/getTasks");
    dispatch({ type: "GetTaskSuccess", payload: data.tasks });
  } catch (error) {
    dispatch({
      type: "GetTaskFailure",
      payload: error.response.data.message,
    });
  }
};

export const getOrderTask = (order, status) => async (dispatch) => {
  try {
    dispatch({
      type: "GetTaskRequest",
    });
    var link = "";
    if (order) {
      link = `/api/v1/getTasks?sorttype=${order}`;
    }
    if (status) {
      link = `/api/v1/getTasks?status=${status}`;
    }
    if (order && status) {
      link = `/api/v1/getTasks?status=${status}&sorttype=${order}`;
    }
    const { data } = await axios.get(link);
    dispatch({ type: "GetTaskSuccess", payload: data.tasks });
  } catch (error) {
    dispatch({
      type: "GetTaskFailure",
      payload: error.response.data.message,
    });
  }
};

export const createTask =
  ({ title, description, category, dueDate, priority, status }) =>
  async (dispatch) => {
    try {
      dispatch({ type: "CreateTaskRequest" });
      const { data } = await axios.post("/api/v1/createtasks", {
        title,
        description,
        category,
        dueDate,
        priority,
        status,
      });
      dispatch({ type: "CreateTaskSuccess", payload: data.message });
    } catch (error) {
      dispatch({
        type: "CreateTaskFailure",
        payload: error.response.data.message,
      });
    }
  };
export const deleteTask = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "DeleteTaskRequest",
    });
    const { data } = await axios.delete(`/api/v1/deletetasks/${id}`);
    dispatch({ type: "DeleteTaskSuccess", payload: data.message });
  } catch (error) {
    dispatch({
      type: "DeleteTaskFailure",
      payload: error.response.data.message,
    });
  }
};

export const updateTask =
  ({ title, description, category, dueDate, priority, status, id }) =>
  async (dispatch) => {
    try {
      dispatch({ type: "UpdateTaskRequest" });
      const { data } = await axios.put(`/api/v1/updatetasks/${id}`, {
        title,
        description,
        category,
        dueDate,
        priority,
        status,
      });
      dispatch({ type: "UpdateTaskSuccess", payload: data.message });
    } catch (error) {
      dispatch({
        type: "UpdateTaskFailure",
        payload: error.response.data.message,
      });
    }
  };

export const searchTaskByUser =
  ({ name }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: "GetTaskByUserRequest",
      });
      const { data } = await axios.post("/api/v1/gettaskbyuser", {
        name,
      });
      dispatch({ type: "GetTaskByUserSuccess", payload: data.task_by_user });
    } catch (error) {
      dispatch({
        type: "GetTaskByUserFailure",
        payload: error.response.data.message,
      });
    }
  };

export const searchTaskByCategory =
  ({ name }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: "GetTaskByCategoryRequest",
      });
      const { data } = await axios.post("/api/v1/gettaskbycategory", {
        name,
      });
      console.log(data.task_by_category);
      dispatch({
        type: "GetTaskByCategorySuccess",
        payload: data.task_by_category,
      });
    } catch (error) {
      dispatch({
        type: "GetTaskByCategoryFailure",
        payload: error.response.data.message,
      });
    }
  };

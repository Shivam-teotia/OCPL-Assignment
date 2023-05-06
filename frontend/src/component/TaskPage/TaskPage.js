import React, { useEffect, useState } from "react";
import "./TaskPage.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { deleteTask, getAllTasks, getOrderTask } from "../../actions/Tasks";
import { useAlert } from "react-alert";
import Loader from "../Loader/Loader";
import { loggoutUser } from "../../actions/User";
const TaskPage = () => {
  const { isAuthenticated } = useSelector((state) => state.user);
  const { tasks, error, loading, message } = useSelector(
    (state) => state.tasks
  );
  const [order, setOrder] = useState("");
  const [status, setStatus] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();
  const deleteHandler = async (id) => {
    dispatch(deleteTask(id));
  };
  const logoutHandler = async () => {
    dispatch(loggoutUser());
  };
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    } else {
      dispatch(getAllTasks());
    }
    if (order || status) {
      dispatch(getOrderTask(order, status));
    }
    if (error) {
      alert.error(error);
      dispatch({ type: "clearErrors" });
    }
    if (message) {
      alert.success(message);
      dispatch({ type: "clearMessage" });
      dispatch(getAllTasks());
    }
  }, [
    order,
    status,
    error,
    message,
    alert,
    isAuthenticated,
    navigate,
    dispatch,
  ]);
  useEffect(() => {}, [tasks]);
  return loading ? (
    <Loader />
  ) : (
    <div className="main-div">
      <div className="left">
        <div>
          <Link to="/create">
            <p>Add New Task</p>
          </Link>
        </div>
        <div>
          <Link to="/searchbyuser">
            <p>Search by User Assigned</p>
          </Link>
        </div>
        <div>
          <Link to="/searchbycategory">
            <p>Search by Category</p>
          </Link>
        </div>
        <div>
          <p>Priority Order</p>
          <select value={order} onChange={(e) => setOrder(e.target.value)}>
            <option value="">Choose</option>
            <option value="low">Low to High</option>
            <option value="high">high to Low</option>
          </select>
        </div>
        <div>
          <p>By Status</p>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="">Choose</option>
            <option value="pending">Pending</option>
            <option value="complete">Complete</option>
          </select>
        </div>
        <Button variant="contained" onClick={logoutHandler}>
          Logout
        </Button>
      </div>
      <div className="right">
        {tasks ? (
          tasks.map((mid) => {
            return (
              <div key={mid._id}>
                <div className="upper">
                  <p>{mid.title}</p>
                  <p>{mid.description}</p>
                </div>
                <div className="mid">
                  <p>priority -{mid.priority}</p>
                  <p>status -{mid.status}</p>
                  <p>dueDate -{mid.dueDate}</p>
                  <p>category- {mid.category[0].name}</p>
                </div>
                <div className="bottom">
                  <Link to={`/edit/${mid._id}`}>
                    <Button variant="contained">Edit</Button>
                  </Link>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => deleteHandler(mid._id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            );
          })
        ) : (
          <h3>No Task Found</h3>
        )}
      </div>
    </div>
  );
};

export default TaskPage;

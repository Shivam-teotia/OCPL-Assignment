import React, { useState, useEffect } from "react";
import "./NewTaskPage.css";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { createTask } from "../../actions/Tasks";
import Loader from "../Loader/Loader";
const NewTaskPage = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [category_name, setCategory_name] = useState("");
  const [category_color, setCategory_color] = useState("");
  const [status, setStatus] = useState("pending");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState(1);
  const { isAuthenticated } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();
  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(
      createTask({
        title: title,
        description: desc,
        category: { name: category_name, color: category_color },
        status: status,
        dueDate: dueDate,
        priority: priority,
      })
    );
  };
  const { error, loading, message } = useSelector((state) => state.tasks);
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
    if (error) {
      alert.error(error);
      dispatch({ type: "clearErrors" });
    }
    if (message) {
      alert.success(message);
      dispatch({ type: "clearMessage" });
      navigate("/tasks");
    }
  }, [isAuthenticated, dispatch, navigate, alert, error, message]);
  return loading ? (
    <Loader />
  ) : (
    <div className="main">
      <form className="mainForm" onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="enter title"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="enter description"
          required
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <select
          id="status"
          name="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="pending">Pending</option>
          <option value="complete">complete</option>
        </select>
        <input
          type="text"
          placeholder="enter category name"
          required
          value={category_name}
          onChange={(e) => setCategory_name(e.target.value)}
        />
        <input
          type="color"
          name="favcolor"
          value={category_color}
          required
          onChange={(e) => setCategory_color(e.target.value)}
        />

        <input
          type="date"
          id="birthday"
          name="birthday"
          className="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <input
          type="number"
          id="priority"
          name="priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        />
        <Button disabled={loading} type="submit">
          Create
        </Button>
      </form>
    </div>
  );
};

export default NewTaskPage;

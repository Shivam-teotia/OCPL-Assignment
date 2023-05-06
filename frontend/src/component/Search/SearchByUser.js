import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./SearchByUser.css";
import Loader from "../Loader/Loader";
import { searchTaskByUser } from "../../actions/Tasks";
const SearchByUser = () => {
  const { tasks, loading } = useSelector((state) => state.searchtask);
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    if (name) {
      dispatch(searchTaskByUser({ name }));
    }
  }, [name, dispatch]);
  useEffect(() => {}, [tasks]);
  return loading ? (
    <Loader />
  ) : (
    <div className="main">
      <div className="upper">
        <input
          type="text"
          placeholder="enter user name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="lower">
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
              </div>
            );
          })
        ) : (
          <h2>No Task</h2>
        )}
      </div>
    </div>
  );
};

export default SearchByUser;

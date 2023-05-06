import { Route, Routes } from "react-router-dom";
import React, { useEffect } from "react";
import "./App.css";
import Header from "./component/Header/Header";
import Login from "./component/Login/Login";
import Register from "./component/Register/Register";
import { useSelector, useDispatch } from "react-redux";
import { loadUser } from "./actions/User";
import TaskPage from "./component/TaskPage/TaskPage";
import NewTaskPage from "./component/NewTaskPage/NewTaskPage";
import EditTaskPage from "./component/EditTaskPage/EditTaskPage";
import SearchByUser from "./component/Search/SearchByUser";
import SearchByCategory from "./component/Search/SearchByCategory";
function App() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch, isAuthenticated]);
  return (
    <>
      <Header />
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/tasks" element={<TaskPage />} />
        <Route exact path="/create" element={<NewTaskPage />} />
        <Route exact path="/edit/:id" element={<EditTaskPage />} />
        <Route exact path="/searchbyuser" element={<SearchByUser />} />
        <Route exact path="/searchbycategory" element={<SearchByCategory />} />
      </Routes>
    </>
  );
}

export default App;

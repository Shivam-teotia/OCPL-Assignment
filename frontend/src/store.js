import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/User";
import { searchTadkReducer, taskReducer } from "./reducers/Tasks";

const store = configureStore({
  reducer: {
    user: userReducer,
    tasks: taskReducer,
    searchtask: searchTadkReducer,
  },
});

export default store;

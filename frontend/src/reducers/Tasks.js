import { createReducer } from "@reduxjs/toolkit";
var initialState = {};
export const taskReducer = createReducer(initialState, {
  GetTaskRequest: (state, action) => {
    state.loading = true;
  },
  GetTaskSuccess: (state, action) => {
    state.loading = false;
    state.tasks = action.payload;
  },
  GetTaskFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  DeleteTaskRequest: (state) => {
    state.loading = true;
  },
  DeleteTaskSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  DeleteTaskFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  clearErrors: (state) => {
    state.error = null;
  },
  clearMessage: (state) => {
    state.message = null;
  },
  CreateTaskRequest: (state, action) => {
    state.loading = true;
  },
  CreateTaskSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  CreateTaskFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  UpdateTaskRequest: (state, action) => {
    state.loading = true;
  },
  UpdateTaskSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  UpdateTaskFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  GetTaskByUserRequest: (state, action) => {
    state.loading = false;
  },
  GetTaskByUserSuccess: (state, action) => {
    state.loading = false;
    state.tasks = action.payload;
  },
});

export const searchTadkReducer = createReducer(initialState, {
  GetTaskByUserRequest: (state, action) => {
    state.loading = true;
  },

  GetTaskByCategoryRequest: (state) => {
    state.loading = true;
  },
  GetTaskByUserSuccess: (state, action) => {
    state.loading = false;
    state.tasks = action.payload;
  },
  GetTaskByCategoryFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  GetTaskByCategorySuccess: (state, action) => {
    state.loading = false;
    state.tasks_category = action.payload;
  },
  GetTaskByUserFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
});

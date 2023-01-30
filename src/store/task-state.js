import { createSlice } from "@reduxjs/toolkit";

const tasksInitialState = { tasks: {
} ,
changed: false};

const tasksList = createSlice({
  name: "task-list",
  initialState: tasksInitialState,
  reducers: {
    addTask(state, action) {
      state.tasks[Math.floor(Math.random() * 1000)] = {
        title: action.payload
      };
      state.changed = true
    },
    removeTask(state, action) {
        delete state.tasks[action.payload];
        state.changed = true
    },
    replaceTasks(state, action) {
        state.tasks = action.payload
    } 
  },
});

export const tasksActions = tasksList.actions;

export default tasksList.reducer;

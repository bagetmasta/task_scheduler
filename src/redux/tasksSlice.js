import { createSlice, nanoid } from "@reduxjs/toolkit";

const tasksInitialState = [
  {
    id: 0,
    title: "Test assignment",
    description: "Complete the test task from VIATEC.",
    finished: true,
  },
  {
    id: 1,
    title: "Prepare soup",
    description: "The recipe is in the notes.",
    finished: false,
  },
  {
    id: 2,
    title: "Feed the dog",
    description: "She likes oatmeal flakes.",
    finished: false,
  },
];

const tasksSlice = createSlice({
  name: "tasks",
  initialState: tasksInitialState,
  reducers: {
    addTask: {
      reducer(state, action) {
        state.push(action.payload);
      },
      prepare(taskData) {
        return {
          payload: {
            id: nanoid(),
            ...taskData,
          },
        };
      },
    },
    deleteTask(state, action) {
      const index = state.findIndex((task) => task.id === action.payload);
      state.splice(index, 1);
    },
    updateTask(state, action) {
      const index = state.findIndex((task) => task.id === action.payload.id);
      state[index] = action.payload;
    },
    toggleFinished(state, action) {
      for (const task of state) {
        if (task.id === action.payload) {
          task.finished = !task.finished;
          break;
        }
      }
    },
  },
});

export const { addTask, deleteTask, updateTask, toggleFinished } =
  tasksSlice.actions;
export const tasksReducer = tasksSlice.reducer;

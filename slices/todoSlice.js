import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// get todos
export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  const response = await fetch("/api/todos");
  const todos = await response.json();
  return todos;
});

// Add todo
export const addTodoAsync = createAsyncThunk(
  "todos/addTodo",
  async ({ title, description }) => {
    const response = await fetch("/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, description, completed: false }),
    });
    const todo = await response.json();
    return todo;
  }
);

// update todo
export const updateTodoAsync = createAsyncThunk(
  'todos/updateTodo',
  async ({ id, updates }) => {
    const response = await fetch(`/api/todos/${id}`, {
      method: 'PUT', // or 'PUT' if you want to update the whole resource, "PATCH" for some resource
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
    });
    const updatedTodo = await response.json();
    return updatedTodo;
  }
);

// delete todo
export const deleteTodoAsync = createAsyncThunk(
  "todos/deleteTodo",
  async (id) => {
    await fetch(`/api/todos/${id}`, {
      method: "DELETE",
    });
    return id;
  }
);

export const todoSlice = createSlice({
  name: "todos",
  initialState: [],
  reducers: {
    addTodo: (state, action) => {
      state.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      return action.payload.todos;
    });
    builder.addCase(addTodoAsync.fulfilled, (state, action) => {
      state.push(action.payload);
    });
    builder.addCase(updateTodoAsync.fulfilled, (state, action) => {
      const index = state.findIndex((todo) => todo.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    });
    builder.addCase(deleteTodoAsync.fulfilled, (state, action) => {
      return state.filter((todo) => todo.id !== action.payload);
    });
  },
});

// Action creators are generated for each case reducer function
export const { addTodo } = todoSlice.actions;

export default todoSlice.reducer;

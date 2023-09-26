"use client";

import { useEffect, useState } from "react";
import {
  addTodoAsync,
  deleteTodoAsync,
  fetchTodos,
  updateTodoAsync,
} from "../../slices/todoSlice";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editingTodo, setEditingTodo] = useState(null);

  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() && description.trim()) {
      if (editingTodo) {
        // If editingTodo is set, update the todo
        dispatch(
          updateTodoAsync({
            id: editingTodo.id,
            updates: { title, description },
          })
        ).then(() => {
          dispatch(fetchTodos()); // Refetch todos after update
        });
        setEditingTodo(null); // Reset editingTodo after updating
      } else {
        // If editingTodo is not set, create a new todo
        dispatch(addTodoAsync({ title, description })).then(() => {
          dispatch(fetchTodos()); // Refetch todos after add
        });
      }
      setTitle("");
      setDescription("");
    }
  };

  const handleUpdate = (todo) => {
    // Set the todo being edited and populate the form fields
    setEditingTodo(todo);
    setTitle(todo.title);
    setDescription(todo.description);
  };

  const handleDelete = (id) => {
    dispatch(deleteTodoAsync(id));
    if (editingTodo && editingTodo.id === id) {
      // If the deleted todo is being edited, reset the form
      setEditingTodo(null);
      setTitle("");
      setDescription("");
    }
  };

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-evenly p-24">
      <div className="mb-6">
        <h3 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
          Todo App
        </h3>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <div>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Todo title"
              className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Todo description"
              className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div>
            <button
              className={`flex text-white border-0 py-2 px-8 focus:outline-none rounded text-sm ${
                editingTodo
                  ? "bg-indigo-500 hover:bg-indigo-600"
                  : "bg-green-500 hover:bg-green-600"
              }`}
              type="submit"
            >
              {editingTodo ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>

      <div>
        <ul>
          {todos.map((todo) => (
            <li key={todo.id} className="py-2">
              <div>
                <strong>{todo.title}</strong>
                <p>{todo.description}</p>
              </div>
              <div className="flex gap-3">
                <button
                  className="flex text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-sm"
                  onClick={() => handleUpdate(todo)}
                >
                  Update
                </button>
                <button
                  className="flex text-white bg-red-500 border-0 py-2 px-8 focus:outline-none hover:bg-red-600 rounded text-sm"
                  onClick={() => handleDelete(todo.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}

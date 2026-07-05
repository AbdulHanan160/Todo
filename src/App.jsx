import { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import SavedTodos from "./pages/SavedTodos";

const TODO_STORAGE_KEY = "todo-app-items";
const SAVED_TODO_STORAGE_KEY = "todo-app-saved-items";

function App() {
  const [todos, setTodos] = useState(() => {
    try {
      const storedTodos = localStorage.getItem(TODO_STORAGE_KEY);
      return storedTodos ? JSON.parse(storedTodos) : [];
    } catch {
      return [];
    }
  });

  const [savedTodos, setSavedTodos] = useState(() => {
    try {
      const storedSavedTodos = localStorage.getItem(SAVED_TODO_STORAGE_KEY);
      return storedSavedTodos ? JSON.parse(storedSavedTodos) : [];
    } catch {
      return [];
    }
  });

  const [toastMessage, setToastMessage] = useState("");
  const [toastVisible, setToastVisible] = useState(false);

  useEffect(() => {
    localStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    localStorage.setItem(SAVED_TODO_STORAGE_KEY, JSON.stringify(savedTodos));
  }, [savedTodos]);

  useEffect(() => {
    if (!toastMessage) {
      setToastVisible(false);
      return;
    }

    setToastVisible(true);
    const timeoutId = window.setTimeout(() => {
      setToastVisible(false);
      window.setTimeout(() => setToastMessage(""), 250);
    }, 1500);

    return () => window.clearTimeout(timeoutId);
  }, [toastMessage]);

  const handleSaveTodo = (todo) => {
    if (savedTodos.some((item) => item.id === todo.id)) return;

    const savedTodo = {
      ...todo,
      createdAt: todo.createdAt || Date.now(),
      savedAt: Date.now(),
    };

    setSavedTodos((prev) => [...prev, savedTodo]);
    setToastMessage("Saved");
  };

  const handleDeleteSavedTodo = (todoId) => {
    setSavedTodos((prev) => prev.filter((todo) => todo.id !== todoId));
    setToastMessage("Deleted");
  };

  const handleDeleteTodo = (todoId) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== todoId));
    setToastMessage("Deleted");
  };

  return (
    <BrowserRouter>
      <div className="bg-[#BFC2C2] w-full min-h-screen pb-5">
        <header className="sticky top-0 z-50">
          <Navbar />
        </header>
        <main className="main relative bg-[#EFF0F0] w-[80%] sm:w-[60%] md:w-[50%] mx-auto h-[85vh] mt-5 rounded-lg overflow-y-auto">
          <div
            className={`pointer-events-none fixed bottom-4 left-1/2 z-50 -translate-x-1/2 rounded-full bg-[#2D2D2D]/95 px-4 py-2 text-sm font-medium text-white shadow-lg backdrop-blur-sm transition-all duration-300 ease-out ${
              toastVisible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
            }`}
          >
            {toastMessage}
          </div>
          <Routes>
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route
              path="/home"
              element={
                <Home
                  todos={todos}
                  setTodos={setTodos}
                  onSaveTodo={handleSaveTodo}
                  onDeleteTodo={handleDeleteTodo}
                  savedTodoIds={savedTodos.map((todo) => todo.id)}
                />
              }
            />
            <Route
              path="/saved-todos"
              element={<SavedTodos savedTodos={savedTodos} onDeleteSavedTodo={handleDeleteSavedTodo} />}
            />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<Navigate to="/home" replace />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;

import React, { useState } from "react";
import Todos from "../components/Todos";

const Home = ({ todos, setTodos, onSaveTodo, onDeleteTodo, savedTodoIds }) => {
  const [inputvalue, setinputvalue] = useState("");
  const [editingTodoId, setEditingTodoId] = useState(null);
  const [filter, setFilter] = useState("All");

  const addTodo = () => {
    if (inputvalue.trim() === "") return;

    if (editingTodoId !== null) {
      setTodos(
        todos.map((todo) =>
          todo.id === editingTodoId ? { ...todo, text: inputvalue } : todo
        )
      );
      setEditingTodoId(null);
    } else {
      setTodos([
        ...todos,
        { id: Date.now(), text: inputvalue, completed: false, createdAt: Date.now() },
      ]);
    }

    setinputvalue("");
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
    onDeleteTodo?.(id);
    if (editingTodoId === id) {
      setEditingTodoId(null);
      setinputvalue("");
    }
  };

  const editTodo = (id) => {
    const todoToEdit = todos.find((todo) => todo.id === id);
    if (!todoToEdit) return;

    setinputvalue(todoToEdit.text);
    setEditingTodoId(id);
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "Pending") return !todo.completed;
    if (filter === "Completed") return todo.completed;
    return true;
  });

  return (
    < >
      <div className="tittle flex justify-center items-center py-5">
        <h1 className="font-bold text-2xl md:text-3xl text-center">
          Manage your todos at one place
        </h1>
      </div>
      <div className="input-todos">
        <div className="heading md:text-xl text-[18px] font-bold ml-4 md:ml-8">
          Add your todos here
        </div>
        <div className="input flex justify-center gap-2 md:gap-4 mt-3">
          <input
          
            type="text"
            autoFocus
            value={inputvalue}
            onChange={(e) => setinputvalue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addTodo();
              }
            }}
            className="bg-[#D9D9D9] pr-4 text-black placeholder:text-gray-500 border border-gray-300 focus:outline-none py-1 pl-3 md:w-[80%] w-[70%] rounded-3xl"
            placeholder="Enter a new todo..."
          />
          <button
            onClick={addTodo}
            className="bg-[#2D2D2D] rounded-3xl text-white px-4 py-2 hover:bg-[#625f5f] cursor-pointer"
          >
            Add
          </button>
        </div>
        <div className="line border-b-2 border-gray-300 mt-6 mb-3 w-[80%] mx-auto"></div>
      </div>
      <div className="todos">
        <div>
          <p className="md:text-xl text-[18px] font-bold ml-4 md:ml-8">
            Your Todos
          </p>
        </div>
        <div className="todo-menu flex gap-4 ml-4 md:ml-8 mt-3">
          <button
            type="button"
            className={`relative px-1 py-1 transition-colors duration-300 cursor-pointer ${filter === "All" ? "text-black" : "text-gray-500 hover:text-black"}`}
            onClick={() => setFilter("All")}
          >
            <span className="relative z-10">All</span>
            <span
              className={`absolute bottom-0 left-0 h-0.5 w-full origin-center bg-black transition-transform duration-300 ${filter === "All" ? "scale-x-100" : "scale-x-0"}`}
            />
          </button>
          <button
            type="button"
            className={`relative px-1 py-1 transition-colors duration-300 cursor-pointer ${filter === "Pending" ? "text-black" : "text-gray-500 hover:text-black"}`}
            onClick={() => setFilter("Pending")}
          >
            <span className="relative z-10">Pending</span>
            <span
              className={`absolute bottom-0 left-0 h-0.5 w-full origin-center bg-black transition-transform duration-300 ${filter === "Pending" ? "scale-x-100" : "scale-x-0"}`}
            />
          </button>
          <button
            type="button"
            className={`relative px-1 py-1 transition-colors duration-300 cursor-pointer ${filter === "Completed" ? "text-black" : "text-gray-500 hover:text-black"}`}
            onClick={() => setFilter("Completed")}
          >
            <span className="relative z-10">Completed</span>
            <span
              className={`absolute bottom-0 left-0 h-0.5 w-full origin-center bg-black transition-transform duration-300 ${filter === "Completed" ? "scale-x-100" : "scale-x-0"}`}
            />
          </button>
        </div>
        <Todos
          todosList={filteredTodos}
          currentFilter={filter}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
          onEdit={editTodo}
          onSave={onSaveTodo}
          savedTodoIds={savedTodoIds}
        />
      </div>
    </>
  );
};

export default Home;
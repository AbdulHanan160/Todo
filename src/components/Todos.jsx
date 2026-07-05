import React from "react";
import edit from "../assets/icons/edit.png";
import deleteicon from "../assets/icons/delete.svg";
import saveicon from "../assets/icons/save.svg";

const Todos = ({ todosList, currentFilter, onToggle, onDelete, onEdit, onSave, savedTodoIds = [] }) => {
  if (todosList.length === 0) {
    const emptyMessage =
      currentFilter === "Pending"
        ? "No pending todos"
        : currentFilter === "Completed"
          ? "No completed todos"
          : "No todos added yet.";

    return <p className="text-gray-400 text-center mt-6">{emptyMessage}</p>;
  }

  return (
    <div className="todos-list mt-4 flex flex-col gap-3">
      {todosList.map((todo) => (
        <div key={todo.id} className="todo flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 px-4 py-3">
          <div className="info flex flex-1 gap-2 items-center sm:items-center ml-4 md:ml-8 w-full sm:w-[70%] min-w-0">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => onToggle(todo.id)}
            />
            <p
              className={`${
                todo.completed
                  ? "line-through decoration-2 text-gray-500 decoration-black"
                  : ""
              } w-full wrap-break-word`}
            >
              {todo.text}
            </p>
          </div>
          <div className="actions flex flex-wrap gap-2 mr-4 justify-end w-full sm:w-auto">
            <img
              className={`p-1 w-6 h-6 rounded-sm ${todo.completed ? "bg-gray-400 cursor-not-allowed" : "bg-[#2D2D2D] cursor-pointer"}`}
              src={edit}
              alt="Edit"
              onClick={() => !todo.completed && onEdit(todo.id)}
            />
            <img
              className={`p-1 w-6 h-6 rounded-sm ${savedTodoIds.includes(todo.id) ? "bg-gray-400 cursor-not-allowed" : "bg-[#2D2D2D] cursor-pointer"}`}
              src={saveicon}
              alt="Save"
              onClick={() => !savedTodoIds.includes(todo.id) && onSave(todo)}
            />
            <img
              className="bg-[#2D2D2D] p-1 w-6 h-6 rounded-sm cursor-pointer"
              src={deleteicon}
              alt="Delete"
              onClick={() => onDelete(todo.id)}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Todos;
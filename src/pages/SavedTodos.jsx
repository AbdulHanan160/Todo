import React from "react";
import deleteicon from "../assets/icons/delete.svg";

const formatDateTime = (timestamp) => {
  const date = new Date(timestamp);
  return `${date.getDate().toString().padStart(2, "0")}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getFullYear()} ${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;
};

const SavedTodos = ({ savedTodos, onDeleteSavedTodo }) => {
  return (
    <div className="px-4 py-6">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-gray-700">Saved Todos</h2>
        <p className="mt-1 text-sm text-gray-500">
          Your saved items appear here.
        </p>
      </div>

      {savedTodos.length === 0 ? (
        <div className="rounded-2xl border border-gray-200 bg-white/80 p-6 text-center shadow-sm">
          <p className="text-gray-500">No saved todos yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {savedTodos.map((todo) => (
            <div
              key={todo.id}
              className="rounded-2xl border border-gray-200 bg-linear-to-r from-white to-gray-50 p-4 shadow-sm"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-gray-700">{todo.text}</p>
                  <p className="mt-1 text-sm text-gray-500">
                    {todo.completed ? "Completed" : "Pending"}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600">
                    Saved
                  </span>
                  <img
                    className="h-7 w-7 cursor-pointer rounded-full bg-[#2D2D2D] p-1.5 transition hover:scale-105"
                    src={deleteicon}
                    alt="Delete saved todo"
                    onClick={() => onDeleteSavedTodo(todo.id)}
                  />
                </div>
              </div>
              <div className="mt-3 space-y-1 border-t border-gray-200 pt-3 text-sm text-gray-600">
                <p>Created at: {formatDateTime(todo.createdAt || Date.now())}</p>
                <p>Saved at: {formatDateTime(todo.savedAt || Date.now())}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedTodos;

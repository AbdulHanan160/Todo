import React from "react";

const About = () => {
  return (
    <div className="px-4 py-6">
      <div className="mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">About Todo App</h2>
        <p className="mt-2 text-sm text-gray-600 max-w-2xl">
          This app helps you manage todos in one place. Create, edit, save, and delete tasks
          easily with a simple interface and persistent local storage.
        </p>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-700">Key features</h3>
        <ul className="mt-3 space-y-2 text-gray-600 list-disc list-inside">
          <li>Create todos with a single click or Enter key.</li>
          <li>Filter tasks by All, Pending, or Completed status.</li>
          <li>Save important todos to a separate Saved Todos page.</li>
          <li>Persistent storage so your todos remain after refresh.</li>
        </ul>
      </div>
    </div>
  );
};

export default About;

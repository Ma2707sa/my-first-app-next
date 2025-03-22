"use client";

import { useState, useEffect } from "react";

const getRandomColor = () => {
  const colors = [
    "bg-red-500",
    "bg-blue-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-indigo-500",
    "bg-teal-500",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

const Home = () => {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState<
    { text: string; color: string; isEditing: boolean; timestamp: string }[]
  >([]);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (task.trim()) {
      const timestamp = new Date().toLocaleString(); // 🕒 تحديد التاريخ والوقت تلقائيًا
      setTasks([
        ...tasks,
        { text: task, color: getRandomColor(), isEditing: false, timestamp },
      ]);
      setTask("");
    }
  };

  const removeTask = (index: number) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const startEditing = (index: number) => {
    setTasks(
      tasks.map((t, i) => (i === index ? { ...t, isEditing: true } : t))
    );
  };

  const saveEdit = (index: number, newText: string) => {
    setTasks(
      tasks.map((t, i) =>
        i === index ? { ...t, text: newText, isEditing: false } : t
      )
    );
  };

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen transition-all ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="absolute top-5 right-5 px-4 py-2 rounded-lg transition bg-yellow-500 hover:bg-yellow-600 text-black cursor-pointer"
      >
        {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>

      <p className="mt-2 text-lg font-semibold">
        {darkMode ? "🌙 Dark Mode is ON" : "☀️ Light Mode is ON"}
      </p>

      <div
        className={`shadow-xl rounded-lg p-6 w-full max-w-md transition ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <h1
          className={`text-3xl font-bold text-center mb-4 ${
            darkMode ? "text-yellow-400" : "text-blue-600"
          }`}
        >
          Task Manager 📝
        </h1>

        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Add a new task..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className={`flex-1 px-3 py-2 border rounded-lg focus:outline-none transition ${
              darkMode
                ? "border-gray-600 focus:ring-yellow-400 bg-gray-700 text-white"
                : "border-gray-300 focus:ring-blue-400 bg-gray-100 text-gray-900"
            }`}
          />
          <button
            onClick={addTask}
            className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition cursor-pointer"
          >
            ➕
          </button>
        </div>

        {tasks.length > 0 ? (
          <ul className="space-y-2">
            {tasks.map((task, index) => (
              <li
                key={index}
                className={`flex justify-between items-center px-4 py-2 rounded-lg transition text-white ${task.color}`}
              >
                <div className="flex flex-col">
                  {task.isEditing ? (
                    <input
                      type="text"
                      defaultValue={task.text}
                      onBlur={(e) => saveEdit(index, e.target.value)}
                      autoFocus
                      className="px-2 py-1 rounded bg-gray-200 text-black"
                    />
                  ) : (
                    <span>{task.text}</span>
                  )}
                  <span className="text-xs opacity-80">{task.timestamp}</span> {/* 🕒 عرض الوقت */}
                </div>
                <div className="flex gap-2">
                  {!task.isEditing && (
                    <button
                      onClick={() => startEditing(index)}
                      className="text-white hover:text-gray-200 transition cursor-pointer"
                    >
                      ✏️
                    </button>
                  )}
                  <button
                    onClick={() => removeTask(index)}
                    className="text-white hover:text-gray-200 transition cursor-pointer"
                  >
                    X
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-500">No tasks yet 🚀</p>
        )}
      </div>
    </div>
  );
};

export default Home;

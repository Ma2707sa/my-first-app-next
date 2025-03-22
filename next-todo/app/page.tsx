// "use client";

// import { useState } from "react";

// const getRandomColor = () => {
//   const colors = ["bg-red-500", "bg-blue-500", "bg-green-500", "bg-yellow-500", "bg-purple-500", "bg-pink-500", "bg-indigo-500", "bg-teal-500"];
//   return colors[Math.floor(Math.random() * colors.length)];
// };

// const Home = () => {
//   const [task, setTask] = useState("");
//   const [tasks, setTasks] = useState<{ text: string; color: string }[]>([]);
//   const [darkMode, setDarkMode] = useState(false);

//   const addTask = () => {
//     if (task.trim()) {
//       setTasks([...tasks, { text: task, color: getRandomColor() }]);
//       setTask("");
//     }
//   };

//   const removeTask = (index: number) => {
//     setTasks(tasks.filter((_, i) => i !== index));
//   };

//   return (
//     <div className={`flex flex-col items-center justify-center min-h-screen transition-all ${
//       darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
//     }`}>
      
//       <button 
//         onClick={() => setDarkMode(!darkMode)} 
//         className="absolute top-5 right-5 px-4 py-2 rounded-lg transition bg-yellow-500 hover:bg-yellow-600 text-black"
//       >
//         {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
//       </button>

//       <div className={`shadow-xl rounded-lg p-6 w-full max-w-md transition ${
//         darkMode ? "bg-gray-800" : "bg-white"
//       }`}>
//         <h1 className={`text-3xl font-bold text-center mb-4 ${
//           darkMode ? "text-yellow-400" : "text-blue-600"
//         }`}>
//           Task Manager 📝
//         </h1>

//         <div className="flex gap-2 mb-4">
//           <input
//             type="text"
//             placeholder="Add a new task..."
//             value={task}
//             onChange={(e) => setTask(e.target.value)}
//             className={`flex-1 px-3 py-2 border rounded-lg focus:outline-none transition ${
//               darkMode 
//                 ? "border-gray-600 focus:ring-yellow-400 bg-gray-700 text-white"
//                 : "border-gray-300 focus:ring-blue-400 bg-gray-100 text-gray-900"
//             }`}
//           />
//           <button
//             onClick={addTask}
//             className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition"
//           >
//             ➕
//           </button>
//         </div>

//         {tasks.length > 0 ? (
//           <ul className="space-y-2">
//             {tasks.map((task, index) => (
//               <li
//                 key={index}
//                 className={`flex justify-between items-center px-4 py-2 rounded-lg transition text-white ${task.color}`}
//               >
//                 <span>{task.text}</span>
//                 <button
//                   onClick={() => removeTask(index)}
//                   className="text-white hover:text-gray-200 transition"
//                 >
//                   ❌
//                 </button>
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p className="text-center text-gray-500">No tasks yet 🚀</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Home;
"use client";

import { useState, useEffect } from "react";

const getRandomColor = () => {
  const colors = ["bg-red-500", "bg-blue-500", "bg-green-500", "bg-yellow-500", "bg-purple-500", "bg-pink-500", "bg-indigo-500", "bg-teal-500"];
  return colors[Math.floor(Math.random() * colors.length)];
};

const Home = () => {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState<{ text: string; color: string }[]>([]);
  const [darkMode, setDarkMode] = useState(false);

  // Load tasks from localStorage on mount
  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (task.trim()) {
      const newTasks = [...tasks, { text: task, color: getRandomColor() }];
      setTasks(newTasks);
      setTask("");
    }
  };

  const removeTask = (index: number) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  return (
    <div className={`flex flex-col items-center justify-center min-h-screen transition-all ${
      darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
    }`}>
      
      <button 
        onClick={() => setDarkMode(!darkMode)} 
        className="absolute top-5 right-5 px-4 py-2 rounded-lg transition bg-yellow-500 hover:bg-yellow-600 text-black"
      >
        {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>

      <div className={`shadow-xl rounded-lg p-6 w-full max-w-md transition ${
        darkMode ? "bg-gray-800" : "bg-white"
      }`}>
        <h1 className={`text-3xl font-bold text-center mb-4 ${
          darkMode ? "text-yellow-400" : "text-blue-600"
        }`}>
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
            className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition"
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
                <span>{task.text}</span>
                <button
                  onClick={() => removeTask(index)}
                  className="text-white hover:text-gray-200 transition"
                >
                  ❌
                </button>
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


import { useEffect, useState } from "react";

function Dashboard() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks
      ? JSON.parse(savedTasks)
      : [
          { id: 1, text: "Finish React Project", completed: false },
          { id: 2, text: "Push Code To GitHub", completed: false },
          { id: 3, text: "Study React Router", completed: false },
        ];
  });

  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function addTask() {
    if (newTask.trim() === "") return;

    const task = {
      id: Date.now(),
      text: newTask,
      completed: false,
    };

    setTasks([...tasks, task]);
    setNewTask("");
  }

  function deleteTask(id) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  function toggleTask(id) {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }

  const completedTasks = tasks.filter((task) => task.completed).length;

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <p>Manage your daily tasks</p>

      <div className="stats">
        <p>Total Tasks: {tasks.length}</p>
        <p>Completed: {completedTasks}</p>
      </div>

      <div className="task-form">
        <input
          type="text"
          placeholder="Add new task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={addTask}>Add Task</button>
      </div>

      <h3>My Tasks</h3>

      <div className="task-list">
        {tasks.map((task) => (
          <div className="task-card" key={task.id}>
            <span
              onClick={() => toggleTask(task.id)}
              className={task.completed ? "completed" : ""}
            >
              {task.text}
            </span>

            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
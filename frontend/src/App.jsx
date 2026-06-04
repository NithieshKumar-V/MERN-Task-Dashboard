import { useState, useEffect } from "react";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000")
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch((err) => console.log(err));

    fetch("http://localhost:5000/tasks")
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.log(err));
  }, []);

  const addTask = async () => {
  if (task.trim() === "") return;

  try {
    const response = await fetch("http://localhost:5000/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ task }),
    });

    const data = await response.json();

    setTasks(data.tasks);
    setTask("");
  } catch (error) {
    console.error(error);
  }
};

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  return (
    <div className="container">
      <h1>MERN Task Dashboard</h1>

      <h3>{message}</h3>

      <div className="input-section">
        <input
          type="text"
          placeholder="Enter Task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />

        <button className="add-btn" onClick={addTask}>
          Add
        </button>
      </div>

      <h2>Tasks</h2>

      {tasks.map((item, index) => (
        <div className="task-item" key={index}>
          <span>{item}</span>

          <button
            className="delete-btn"
            onClick={() => deleteTask(index)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;
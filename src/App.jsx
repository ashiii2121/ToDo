import React, { useState } from "react";
import "./App.css";

function App() {
  const [task, setTask] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  function handleInputChange(e) {
    setNewTask(e.target.value);
  }

  function handleAdd() {
    if (newTask.trim() !== "") {
      if (editMode) {
        const updatedTasks = [...task];
        updatedTasks[editIndex] = newTask;
        setTask(updatedTasks);
        setEditMode(false);
        setEditIndex(null);
      } else {
        setTask((t) => [...t, newTask]);
      }
      setNewTask("");
    }
  }

  function handleEdit(index) {
    setNewTask(task[index]);
    setEditMode(true);
    setEditIndex(index);
  }

  function handleDelete(index) {
    const updatedTasks = task.filter((_, i) => i !== index);
    setTask(updatedTasks);
  }

  function handleMoveUp(index) {
    if (index > 0) {
      const updatedTasks = [...task];
      [updatedTasks[index - 1], updatedTasks[index]] = [updatedTasks[index], updatedTasks[index - 1]];
      setTask(updatedTasks);
    }
  }

  function handleMoveDown(index) {
    if (index < task.length - 1) {
      const updatedTasks = [...task];
      [updatedTasks[index + 1], updatedTasks[index]] = [updatedTasks[index], updatedTasks[index + 1]];
      setTask(updatedTasks);
    }
  }

  return (
    <div>
      <h1>To-Do-List</h1>
      <input
        type="text"
        placeholder="Enter Your Task"
        value={newTask}
        onChange={handleInputChange}
      />
      <button onClick={handleAdd}>{editMode ? "Update" : "Add"}</button>
      <ol>
        {task.length > 0 ? (
          task.map((t, index) => (
            <li key={index}>
              {t}
              <button onClick={() => handleEdit(index)}>Edit</button>
              <button onClick={() => handleDelete(index)}>Delete</button>
              <button onClick={() => handleMoveUp(index)}>Move Up</button>
              <button onClick={() => handleMoveDown(index)}>Move Down</button>
            </li>
          ))
        ) : (
          <li>No Task Available</li>
        )}
      </ol>
    </div>
  );
}

export default App;

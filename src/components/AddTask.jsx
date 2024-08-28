import { useState } from "react";
import { useTask } from "../contexts/TaskContext";

import { IoAddOutline } from "react-icons/io5";

function AddTask() {
  const { createTask } = useTask();
  const [task, setTask] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!task) return;

    setTask("");
    createTask(task);
  }

  return (
    <form className="add-todo" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Add Todo"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button className="btn btn--primary">
        <IoAddOutline className="icon" />
      </button>
    </form>
  );
}

export default AddTask;

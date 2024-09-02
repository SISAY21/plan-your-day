import { useTask } from "../contexts/TaskContext";

import TaskItem from "./TaskItem";

function TaskList({ setTask }) {
  const { filteredTasks, tasks } = useTask();

  return (
    <main className="tasks-container">
      <p className="tasks-message">
        {filteredTasks?.length > 0
          ? "All your todos here..."
          : tasks?.length === 0
          ? "Start by adding todos..."
          : "There is nothing in here..."}
      </p>

      <ul className="tasks-list">
        {filteredTasks?.map((task, i) => (
          <TaskItem task={task} index={i} key={task.id} setTask={setTask} />
        ))}
      </ul>
    </main>
  );
}

export default TaskList;

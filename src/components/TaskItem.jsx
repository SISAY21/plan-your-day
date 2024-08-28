import {
  IoCheckmarkSharp,
  IoCloseSharp,
  IoPencil,
  IoTrash,
} from "react-icons/io5";
import { useTask } from "../contexts/TaskContext";

function TaskItem({ task, index, setTask }) {
  const { deleteTask, updateTaskCompletion, dispatch } = useTask();

  function editTask() {
    setTask(task.task);
    dispatch({ type: "editingTask", payload: task.id });
  }

  return (
    <li className="task-item">
      <p className={`task-note ${task.isCompleted ? "strike-through" : ""}`}>
        <span className="number">{index + 1}. </span>
        {task.task}
      </p>

      <div className="task-action-buttons">
        <button className="btn btn--edit" onClick={() => editTask()}>
          <IoPencil className="icon" />
        </button>

        <button className="btn btn--delete" onClick={() => deleteTask(task.id)}>
          <IoTrash className="icon" />
        </button>

        <button
          className={`btn ${
            !task.isCompleted ? "btn--completed" : "btn--incomplete"
          }`}
          onClick={() => updateTaskCompletion(task.id, !task.isCompleted)}
        >
          {!task.isCompleted ? (
            <IoCheckmarkSharp className="icon" />
          ) : (
            <IoCloseSharp className="icon" />
          )}
        </button>
      </div>
    </li>
  );
}

export default TaskItem;

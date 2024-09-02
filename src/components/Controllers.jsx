import supabase from "../../data/supabase";
import { useTask } from "../contexts/TaskContext";

function Controllers() {
  const { tasks, filter, dispatch } = useTask();
  const isIncompleted =
    tasks?.filter((task) => task.isCompleted !== true).length > 0 &&
    (filter === "incomplete" || filter === "default");

  // CONTROL FILTERS
  function handleSelect(e) {
    dispatch({ type: "filter/changed", payload: e.target.value });
  }

  // UPDATE ALL TASKS COMPLETED STATE
  async function updateAllTasksCompletion(isCompleted) {
    dispatch({ type: "loading" });

    const { data, error } = await supabase
      .from("tasks")
      .update({ isCompleted })
      .neq("id", -1)
      .select();

    if (!error)
      dispatch({ type: "tasks/updateAllTasksCompletion", payload: data });

    if (error)
      dispatch({
        type: "rejected",
        payload: "There is an error updating tasks...",
      });
  }

  return (
    <div className="todo--controls-group">
      <select value={filter} onChange={handleSelect}>
        <option value="default">All Todos</option>
        <option value="completed">Completed</option>
        <option value="incomplete">Not Complete</option>
      </select>

      <button
        className={`btn btn--secondary ${
          isIncompleted ? "btn--completed" : "btn--incomplete"
        }`}
        onClick={() => updateAllTasksCompletion(isIncompleted)}
      >
        {isIncompleted ? "Mark All Completed" : "Mark All Incomplete"}
      </button>
    </div>
  );
}

export default Controllers;

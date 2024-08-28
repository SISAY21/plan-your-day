// import { useState } from "react";
import { useTask } from "../contexts/TaskContext";

import { IoPencil } from "react-icons/io5";
import supabase from "../../data/supabase";

function EditTask({ task, setTask }) {
  const { taskTobeEdited, dispatch } = useTask();

  function handleSubmit(e) {
    e.preventDefault();

    if (!task) return;

    setTask("");

    async function editTask() {
      dispatch({ type: "loading" });

      const { data, error } = await supabase
        .from("tasks")
        .update({ task })
        .eq("id", taskTobeEdited.id)
        .select();

      if (!error) dispatch({ type: "task/edited", payload: data.at(0) });

      if (error)
        dispatch({
          type: "rejected",
          payload: "There is an error updating the task...",
        });
    }
    editTask();
  }

  return (
    <form className="add-todo" onSubmit={handleSubmit}>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button className="btn btn--edit">
        <IoPencil className="icon" />
      </button>
    </form>
  );
}

export default EditTask;

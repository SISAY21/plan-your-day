/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useReducer } from "react";
import supabase from "../../data/supabase";

const initialState = {
  tasks: [],
  isLoading: false,
  searchQuery: "",
  filter: "default",
  error: "",
  isEditing: false,
  taskTobeEdited: {},
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };

    case "tasks/loaded":
      return { ...state, isLoading: false, tasks: action.payload };

    case "task/created":
      return {
        ...state,
        isLoading: false,
        tasks: [...state.tasks, action.payload],
      };

    case "editingTask":
      return {
        ...state,
        isLoading: false,
        isEditing: true,
        taskTobeEdited: state.tasks
          .filter((task) => task.id === action.payload)
          .at(0),
      };

    case "task/edited":
      return {
        ...state,
        isLoading: false,
        isEditing: false,
        tasks: state.tasks.map((taskItem) =>
          taskItem.id === action.payload.id
            ? {
                ...taskItem,
                task: action.payload.task,
              }
            : taskItem
        ),
      };

    case "task/searched":
      return {
        ...state,
        isLoading: false,
        searchQuery: action.payload,
      };

    case "task/completed":
      return {
        ...state,
        isLoading: false,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id
            ? { ...task, isCompleted: action.payload.isCompleted }
            : task
        ),
      };

    case "tasks/updateAllTasksCompletion":
      return {
        ...state,
        isLoading: false,
        tasks: action.payload,
      };

    case "task/deleted":
      return {
        ...state,
        isLoading: false,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };

    case "filter/changed":
      return { ...state, isLoading: false, filter: action.payload };

    case "rejected":
      return { ...state, isLoading: false, error: action.payload };

    default:
      throw new Error("Unknown Action");
  }
}

const TaskContext = createContext();

function TaskProvider({ children }) {
  const [
    { tasks, searchQuery, filter, error, isLoading, isEditing, taskTobeEdited },
    dispatch,
  ] = useReducer(reducer, initialState);

  // FETCH TASKS
  useEffect(
    function () {
      dispatch({ type: "loading" });

      async function fetchTasks() {
        const { data } = await supabase.from("tasks").select("*");

        if (!error) dispatch({ type: "tasks/loaded", payload: data });
        if (error) {
          dispatch({
            type: "rejected",
            payload: "There is an error fetching tasks from the database...",
          });
        }
      }
      fetchTasks();
    },
    [error]
  );

  // CREATE A TASK
  async function createTask(newTask) {
    dispatch({ type: "loading" });

    const { data, error } = await supabase
      .from("tasks")
      .insert([{ task: newTask }])
      .select();

    if (!error) dispatch({ type: "task/created", payload: data.at(0) });

    if (error)
      dispatch({
        type: "rejected",
        payload: "There is an error creating the task...",
      });
  }

  // DELETE A TASK
  async function deleteTask(id) {
    dispatch({ type: "loading" });

    const { error } = await supabase.from("tasks").delete().eq("id", id);

    if (!error) dispatch({ type: "task/deleted", payload: id });

    if (error)
      dispatch({
        type: "rejected",
        payload: "There is an error deleting the task from the database...",
      });
  }

  // UPDATE TASK COMPLETED STATE
  async function updateTaskCompletion(id, isCompleted) {
    dispatch({ type: "loading" });

    const { data, error } = await supabase
      .from("tasks")
      .update({ isCompleted })
      .eq("id", id)
      .select();

    if (!error) dispatch({ type: "task/completed", payload: data.at(0) });

    if (error)
      dispatch({
        type: "rejected",
        payload: "There is an error updating the task...",
      });
  }

  const searchedTasks =
    searchQuery.length > 0
      ? tasks.filter((task) => task.task.toLowerCase().includes(searchQuery))
      : tasks;

  const filteredTasks =
    filter !== "default"
      ? filter === "completed"
        ? searchedTasks.filter((task) => task.isCompleted === true)
        : searchedTasks.filter((task) => task.isCompleted === false)
      : searchedTasks;

  return (
    <TaskContext.Provider
      value={{
        tasks,
        searchQuery,
        filter,
        isLoading,
        isEditing,
        taskTobeEdited,
        error,
        filteredTasks,
        dispatch,
        createTask,
        deleteTask,
        updateTaskCompletion,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

function useTask() {
  const context = useContext(TaskContext);
  if (context === undefined)
    throw new Error("TaskContext was used outside of TaskProvider");
  return context;
}

export { TaskProvider, useTask };

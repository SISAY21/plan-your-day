import { useTask } from "./contexts/TaskContext";

import Header from "./components/Header";
import AddTask from "./components/AddTask";
import TodoControls from "./components/TodoControls";
import TaskList from "./components/TaskList";
import EditTask from "./components/EditTask";
import Spinner from "./components/Spinner";
import Error from "./components/Error";
import { useState } from "react";

function App() {
  const { taskTobeEdited, isEditing, isLoading, error } = useTask();
  const [task, setTask] = useState(taskTobeEdited.task);

  return (
    <div className="app-container">
      <Header />

      {isEditing ? (
        <EditTask task={task} setTask={setTask} />
      ) : (
        <>
          <AddTask />
          <TodoControls />
        </>
      )}

      {isLoading && <Spinner />}
      {error && <Error />}
      {!isLoading && !error && <TaskList setTask={setTask} />}
    </div>
  );
}

export default App;

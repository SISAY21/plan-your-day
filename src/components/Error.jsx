import { useTask } from "../contexts/TaskContext";

function Error() {
  const { error } = useTask();

  return <div className="error">💥 {error}</div>;
}

export default Error;

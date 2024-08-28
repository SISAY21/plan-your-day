import Search from "./Search";
import Controllers from "./Controllers";

function TodoControls() {
  return (
    <div className="todo-controls">
      <Controllers />
      <Search />
    </div>
  );
}

export default TodoControls;

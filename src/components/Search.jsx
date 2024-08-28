import { IoSearch } from "react-icons/io5";
import { useTask } from "../contexts/TaskContext";

function Search() {
  // const [query, setQuery] = useState("");

  const { searchQuery, dispatch } = useTask();

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <form className="search" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Start typing to search todos..."
        value={searchQuery}
        onChange={(e) =>
          dispatch({ type: "task/searched", payload: e.target.value })
        }
      />
      <button className="btn btn--primary">
        <IoSearch className="icon" />
      </button>
    </form>
  );
}

export default Search;

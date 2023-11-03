import "./App.css";
import axios from "axios";
import { useState } from "react";

function App() {
  const [title, setTitle] = useState("");
  const [poster, setPoster] = useState("");
  const [search, setSearch] = useState("");

  async function handleSearch(event) {
    event.preventDefault();
    const movieAPI = `http://localhost:8080/movie?search=${search}`;

    const res = await axios.get(movieAPI);
    setTitle(res.data.title);
    setPoster(res.data.poster);
  }
  return (
    <main>
      <form onSubmit={handleSearch}>
        <input
          placeholder="Movie title"
          onChange={(event) => setSearch(event.target.value)}
        />
        <button>Search</button>
      </form>
      <div>
        <p>{title}</p>
        <img src={poster} />
      </div>
    </main>
  );
}

export default App;

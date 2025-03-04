import { useState } from "react";
import UploadFilePage from "./pages/UploadFilePage";

function App() {
  const [movies, setMovies] = useState([]);

  return (
    <div>
      <h1>Movie Uploader</h1>
      <UploadFilePage onMoviesParsed={setMovies} />
    </div>
  );
}

export default App;

import { useState } from "react";
import UploadFilePage from "./pages/UploadFilePage";
import PreviewMoviesPage from "./pages/PreviewMoviesPage";
import { saveMovies } from "./api/tmdb"; 
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [showPreview, setShowPreview] = useState(false);
  const [saveMessage, setSaveMessage] = useState(""); 

  const handleRemoveMovie = (id) => {
    setMovies(movies.filter(movie => movie.id !== id));
  };

  const handleSaveMovies = async () => {
    const result = await saveMovies(movies);
    setSaveMessage(result.message);
  };

  return (
    <div className="container text-center p-3">
      <h1 className="mt-5">Movie Uploader</h1>
      {showPreview ? (
        <div className="container border border-white border-1 rounded p-3">
          <PreviewMoviesPage movies={movies} onRemoveMovie={handleRemoveMovie} setMovies={setMovies}/>
          <p className="mt-3">
            <button className="btn btn-primary" onClick={handleSaveMovies}>Save</button>
          </p>
          {saveMessage && <div className="alert alert-info mt-3">{saveMessage}</div>}
        </div>
      ) : (
        <UploadFilePage onMoviesFetched={(data) => { setMovies(data); setShowPreview(true); }} />
      )}
    </div>
  );
}

export default App;

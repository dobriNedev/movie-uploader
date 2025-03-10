import { useState } from "react";
import { fetchMovieDetails } from "../api/tmdb";

const UploadPage = ({ onMoviesFetched }) => {
  const [movies, setMovies] = useState([]);
  const [selectedMovies, setSelectedMovies] = useState({});
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const lines = e.target.result.split("\n").map(line => line.trim()).filter(Boolean);
      setMovies(lines);
      setSelectedMovies(Object.fromEntries(lines.map(title => [title, true])));
      setErrorMessage(""); 
    };
    reader.readAsText(file);
  };

  const handleCheckboxChange = (title) => {
    setSelectedMovies(prev => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  const handleSearch = async () => {
    if (movies.length === 0) {
      setErrorMessage("Please upload a file.");
      return;
    }

    const selectedTitles = Object.keys(selectedMovies).filter(title => selectedMovies[title]);
    if (selectedTitles.length === 0) {
      setErrorMessage("Please select at least one movie.");
      return;
    }

    setErrorMessage(""); 
    setLoading(true);

    const results = await Promise.all(selectedTitles.map(title => fetchMovieDetails(title)));
    onMoviesFetched(results.filter(Boolean));
    setLoading(false);
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Upload a .txt File</h2>
      
      <div className="mb-3">
        <input type="file" accept=".txt" className="form-control bg-dark text-light" onChange={handleFileUpload} />
      </div>

      {movies.length > 0 && (
        <div className="mb-3">
          <ul className="list-group">
            {movies.map((movie, index) => (
              <li key={index} className="list-group-item d-flex align-items-center bg-dark text-light">
                <input
                  type="checkbox"
                  className="form-check-input me-2"
                  checked={selectedMovies[movie] || false}
                  onChange={() => handleCheckboxChange(movie)}
                />
                {movie}
              </li>
            ))}
          </ul>
        </div>
      )}

      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>} 

      <button 
        className="btn btn-primary"
        onClick={handleSearch}
        disabled={loading}
      >
        {loading ? "Searching..." : "Search"}
      </button>
    </div>
  );
};

export default UploadPage;

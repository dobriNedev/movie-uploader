import { useState } from "react";

const UploadPage = ({ onMoviesParsed }) => {
  const [movies, setMovies] = useState([]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const lines = e.target.result.split("\n").map(line => line.trim()).filter(Boolean);
      setMovies(lines);
      onMoviesParsed(lines);
    };
    reader.readAsText(file);
  };

  return (
    <div>
      <h2>Upload a .txt file</h2>
      <input type="file" accept=".txt" onChange={handleFileUpload} />
      <ul>
        {movies.map((movie, index) => (
          <li key={index}>
            <input type="checkbox" defaultChecked /> {movie}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UploadPage;

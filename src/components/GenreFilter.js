import React, { useEffect, useState } from "react";
import { fetchGenres } from "../api/tmdb"; 

const GenreFilter = ({ onSelectGenre }) => {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const getGenres = async () => {
      const genreData = await fetchGenres();
      setGenres(genreData);
    };

    getGenres();
  }, []);

  const handleGenreChange = (e) => {
    onSelectGenre(e.target.value);
  };

  return (
    <div className="mb-3">
      <label htmlFor="genreSelect" className="form-label fw-bold">
        Filter by Genre
      </label>
      <select 
        id="genreSelect" 
        className="form-select" 
        onChange={handleGenreChange}
      >
        <option value="">All Genres</option>
        {genres.map((genre) => (
          <option key={genre.id} value={genre.id}>
            {genre.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default GenreFilter;

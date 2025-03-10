import { useState, useEffect } from "react";
import { searchMovies } from "../api/tmdb";

const MovieSearch = ({ searchQuery, selectedLanguage, onMovieSelect }) => {
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!searchQuery) {
        setSearchResults([]); 
        return;
      }
      
      try {
        const results = await searchMovies(searchQuery, selectedLanguage);
        
        const uniqueMovies = results.reduce((acc, current) => {
          const exists = acc.some(movie => movie.title === current.title);
          if (!exists) {
            acc.push(current);
          }
          return acc;
        }, []);
        
        setSearchResults(uniqueMovies);
      } catch (error) {
        console.error("Error fetching search results:", error);
        setSearchResults([]); 
      }
    };

    fetchSearchResults();
  }, [searchQuery, selectedLanguage]);

  return (
    <div className="mb-3">
      {searchQuery && searchResults.length > 0 && (
        <ul className="list-group mt-2">
          {searchResults.map((movie) => (
            <li
              key={movie.id}
              className="list-group-item d-flex align-items-center"
              onClick={() => onMovieSelect(movie)}
            >
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
                className="img-thumbnail me-3"
                width="50"
              />
              <h5 className="mb-0">{movie.title}</h5>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MovieSearch;

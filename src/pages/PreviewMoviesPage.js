import { useState } from "react";
import MovieSearch from "../components/MovieSearch";
import GenreFilter from "../components/GenreFilter";
import LanguageSelect from "../components/LanguageSelect"; 
import Toggle from "../components/Toggle";
import MovieCard from "../components/MovieCard";

const PreviewMoviesPage = ({ movies, onRemoveMovie, setMovies }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("en-US");
  const [isGenreFilterEnabled, setIsGenreFilterEnabled] = useState(false);
  const [isLanguageSearchEnabled, setIsLanguageSearchEnabled] = useState(false);

  const handleSearchInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
  };

  const handleMovieSelect = (movie) => {
    if (!movies.find((m) => m.id === movie.id)) {
      setMovies([
        ...movies,
        {
          id: movie.id,
          title: movie.title,
          overview: movie.overview,
          poster: movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : null,
          release: movie.release_date,
          rating: movie.vote_average,
          genreIds: movie.genre_ids,
        },
      ]);
    }
    setSearchQuery("");
  };

  const handleGenreSelect = (genreId) => {
    setSelectedGenre(genreId);
  };

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
  };

  const filteredMovies = selectedGenre
    ? movies.filter((movie) =>
        movie?.genreIds?.includes(Number(selectedGenre))
      )
    : movies;

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Movies:</h2>

      <div className="toggle-row d-flex justify-content-between mb-2">
        <Toggle
          id="genreFilterToggle"
          label="Genre Filter"
          checked={isGenreFilterEnabled}
          onChange={() => setIsGenreFilterEnabled(!isGenreFilterEnabled)}
        />
        <Toggle
          id="languageFilterToggle"
          label="Language Filter"
          checked={isLanguageSearchEnabled}
          onChange={() => setIsLanguageSearchEnabled(!isLanguageSearchEnabled)}
        />
      </div>

 
      {isGenreFilterEnabled && <GenreFilter onSelectGenre={handleGenreSelect} />}

      {isLanguageSearchEnabled && (
        <LanguageSelect onLanguageChange={handleLanguageChange} />
      )}

      <div className="mb-3">
        <input
          type="text"
          className="form-control bg-dark text-light"
          placeholder="Search for movies..."
          value={searchQuery}
          onChange={handleSearchInputChange}
        />
      </div>

      <MovieSearch
        searchQuery={searchQuery}
        selectedLanguage={selectedLanguage}
        onMovieSelect={handleMovieSelect}
      />

      {filteredMovies.length === 0 ? (
        <p>No movies found.</p>
      ) : (
        <div className="row">
        {filteredMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} onRemoveMovie={onRemoveMovie} />
        ))}
      </div>
      )}
    </div>
  );
};

export default PreviewMoviesPage;

const MovieCard = ({ movie, onRemoveMovie }) => {
    return (
      <div className="col-lg-4 col-md-6 col-sm-12 col-12 mb-4">
        <div className="movie-card bg-dark">
          <img src={movie.poster} alt={movie.title} className="movie-card-img" />
          <div className="movie-card-info">
            <h5 className="movie-card-title">{movie.title}</h5>
            <p className="movie-card-rating">⭐ {movie.rating}</p>
            <p className="movie-card-description">{movie.overview}</p>
            <button
              onClick={() => onRemoveMovie(movie.id)}
              className="btn btn-danger btn-sm mt-2"
            >
              {"\u{1F5D1}"} Remove
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default MovieCard;
  
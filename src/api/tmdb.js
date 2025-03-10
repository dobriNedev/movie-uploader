const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export const fetchMovieDetails = async (title, language = "en-US") => {
  try {
    const response = await fetch(
      `${BASE_URL}/search/movie?query=${encodeURIComponent(title)}&api_key=${API_KEY}&language=${language}`
    );
    const data = await response.json();
    
    if (data.results.length > 0) {
      const movie = data.results[0]; 
      return {
        id: movie.id,
        title: movie.title,
        overview: movie.overview,
        poster: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : null,
        release: movie.release_date,
        rating: movie.vote_average,
        genreIds: movie.genre_ids,
      };
    }

    return null;
  } catch (error) {
    console.error("Error fetching movie data:", error);
    return null;
  }
};

export const fetchGenres = async (language = "en-US") => {
  try {
    const response = await fetch(
      `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=${language}`
    );
    const data = await response.json();
    return data.genres || [];
  } catch (error) {
    console.error("Error fetching genres:", error);
    return [];
  }
};

export const searchMovies = async (searchQuery, language = "en-US") => {
  try {
    const response = await fetch(
      `${BASE_URL}/search/movie?query=${encodeURIComponent(searchQuery)}&api_key=${API_KEY}&language=${language}`
    );
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error("Error fetching search results:", error);
    return [];
  }
};


export const saveMovies = async (movies) => {
  try {
    const payload = JSON.stringify(movies, null, 2);

    //Please comment out the response for testing
    const response = await fetch("https://dummyapi.com/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: payload,
    });

    // Mocking the response as successful for testing
    //Please uncomment the response for testing
    // const response = {
    //   ok: true,
    // };

    if (response.ok) {
      return { success: true, message: "Movies saved successfully!" };
    } else {
      return { success: false, message: "Failed to save movies." };
    }
  } catch (error) {
    console.error("Error saving movies:", error);
    return { success: false, message: "An error occurred while saving movies." };
  }
};



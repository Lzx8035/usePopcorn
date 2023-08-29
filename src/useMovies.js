import { useState, useEffect } from "react";

export default function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const KEY = "a6db8c6a";

  useEffect(
    function () {
      async function fetchMovie() {
        try {
          setIsLoading(true);
          setError("");

          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`
          );
          if (!res.ok)
            throw new Error("Something went wrong with fetch movies 🤪");

          const data = await res.json();
          if (data.Response === "False") throw new Error("Movie not found 🥲");

          setMovies(data.Search);
        } catch (err) {
          console.error(err.message);
          if (err.name !== "AbortError") setError(err.message);
        } finally {
          setIsLoading(false);
        }
      }

      if (query.length < 3) {
        // put in fn
        setError("");
        setMovies([]);
        return;
      }

      //   callback?.();
      //   handleCloseMovie();

      const timer = setTimeout(fetchMovie, 800);

      return () => clearTimeout(timer);
    },
    // [query， callback] //BUG
    [query]
  );

  return { movies, isLoading, error };
}

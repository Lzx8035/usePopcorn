import { useEffect, useRef, useState } from "react";
import StarRating from "./StarRating";
import useMovies from "./useMovies";
import useLocalStorageStage from "./useLocalStorageStage";
import useKey from "./useKey";

// TODO add sorting

const KEY = "a6db8c6a";

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

//////////////////////////////////////////////////////////////////////////////////////////
export default function App() {
  const [query, setQuery] = useState("");
  // const [movies, setMovies] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  // Create a custom hook WOW
  const [watched, setWatched] = useLocalStorageStage([], "watched");
  // // const [watched, setWatched] = useState([]);
  // // no argument / pure function // just at mount(initial render)
  // const [watched, setWatched] = useState(() =>
  //   JSON.parse(localStorage.getItem("watched"))
  // );
  // // NONO useState( JSON.parse(localStorage.getItem("watched"))) this will call this fn evert render, cuz we are calling a funtion but not passing the function in

  const handleSelectMovie = (id) => {
    setSelectedId((selectedId) => (selectedId === id ? null : id));
  };

  const handleCloseMovie = () => {
    setSelectedId(null);
  };

  const handleAddWatched = (movie) => {
    setWatched((watched) => [...watched, movie]);
    handleCloseMovie();
    // 1) WOW but not very good
    // localStorage.setItem("watched", JSON.stringify([...watched, movie])); // async
  };

  const handleDeleteWatched = (id) => {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  };

  // useEffect(() => {
  //   localStorage.setItem("watched", JSON.stringify(watched)); //WOW
  // }, [watched]);

  // useEffect(
  //   function () {
  //     // const controller = new AbortController();

  //     async function fetchMovie() {
  //       try {
  //         setIsLoading(true);
  //         setError("");

  //         const res = await fetch(
  //           `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`
  //           // { signal: controller.signal }
  //         );
  //         if (!res.ok)
  //           throw new Error("Something went wrong with fetch movies 🤪");

  //         const data = await res.json();
  //         if (data.Response === "False") throw new Error("Movie not found 🥲");

  //         setMovies(data.Search);
  //         // setError("");
  //       } catch (err) {
  //         console.error(err.message);
  //         if (err.name !== "AbortError") setError(err.message);
  //       } finally {
  //         setIsLoading(false);
  //       }
  //     }

  //     if (query.length < 3) {
  //       setError("");
  //       setMovies([]);
  //       return;
  //     }

  //     // fetchMovie();

  //     // return function () {
  //     //   controller.abort();
  //     // };

  //     // Deboucing WOW
  //     handleCloseMovie(); //BUG
  //     const timer = setTimeout(fetchMovie, 800);
  //     // Clean up function
  //     return () => clearTimeout(timer);
  //   },
  //   [query]
  // );

  // Create custom hook WOW
  const { movies, isLoading, error } = useMovies(query);

  return (
    <>
      <NavBar>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <NumResult movies={movies} />
      </NavBar>
      <Main>
        {/* <Box element={<MovieList movies={movies} />} /> SAME*/}
        <Box>
          {isLoading ? (
            <Loader />
          ) : error ? (
            <ErrorMessage message={error} />
          ) : (
            <MovieList movies={movies} OnSelectMovie={handleSelectMovie} />
          )}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <Summary watched={watched} />
              <WatchedMoviesList
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

const NavBar = ({ children }) => {
  return <nav className="nav-bar">{children}</nav>;
};

const Logo = () => {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
};

const Search = ({ query, setQuery }) => {
  // NOT good, React not happy, use useRef instead NONO dangerous with dependancy
  // useEffect(() => {
  //   const el = document.querySelector(".search");
  //   el.focus();
  // }, []);

  const inputEl = useRef(null);
  // useEffect(() => {
  //   inputEl.current.focus(); //WOW
  // }, []);
  // we need to use an effect in order to use a ref that contains a DOM element like this one because the Ref only gets added to this DOM element here after the DOM has already loaded, therefore we can only access it in useEffect which also runs after the DOM has been loaded.

  // useEffect(() => {
  //   const enterEvent = (e) => {
  //     if (document.activeElement === inputEl.current) return;

  //     if (e.code === "Enter") {
  //       inputEl.current.focus(); //WOW
  //       setQuery("");
  //     }
  //   };
  //   document.addEventListener("keydown", enterEvent);
  //   return () => document.removeEventListener("keydown", enterEvent);
  // }, [setQuery]);

  // Create custom hook WOW
  const enterEvent = (e) => {
    if (document.activeElement === inputEl.current) return;
    inputEl.current.focus();
    setQuery("");
  };
  useKey("enter", enterEvent);

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputEl} //WOW
    />
  );
};

const NumResult = ({ movies }) => {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
};

const Main = ({ children }) => {
  return <main className="main">{children}</main>;
};

const Box = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "-" : "+"}
      </button>
      {/* {isOpen1 && { children }} NONO*/}
      {isOpen && children}
    </div>
  );
};

const MovieList = ({ movies, OnSelectMovie }) => {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie movie={movie} key={movie.imdbID} OnSelectMovie={OnSelectMovie} />
      ))}
    </ul>
  );
};

const Movie = ({ movie, OnSelectMovie }) => {
  return (
    <li
      onClick={() => {
        //WOW
        OnSelectMovie(movie.imdbID);
      }}
    >
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
};

const MovieDetails = ({ selectedId, onCloseMovie, onAddWatched, watched }) => {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState(0);

  const countRef = useRef(0); // we don't want to create rerender
  // let count = 0 // reset every time rerendered

  useEffect(() => {
    if (userRating) countRef.current++;
    // if (userRating) count++ // always be 1
  }, [userRating]);

  const isWatched = watched.map((m) => m.imdbID).includes(selectedId);
  const watchedUserRating = watched.find(
    (movie) => movie.imdbID === selectedId
  )?.userRating;

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  // const [avgRating, setAvgRating] = useState(0);

  const handleAdd = () => {
    const newWatchedMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
      userRating,
      CounterRatingDecision: countRef.current,
    };

    onAddWatched(newWatchedMovie);

    // setAvgRating(Number(imdbRating));
    // // alert(avgRating); // get 0 because the state is set asynchronously here NONO
    // // setAvgRating((avgRating + userRating) / 2); // get 5 ((0+10)/2)
    // setAvgRating((avgRating) => (avgRating + userRating) / 2); // solved by passing in a callback function
  };

  useEffect(
    function () {
      async function getMovieDetails() {
        setIsLoading(true); //
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
        );
        const data = await res.json();
        setMovie(data);
        setIsLoading(false); //
      }
      getMovieDetails();
    },
    [selectedId]
  );

  useEffect(
    function () {
      if (!title) return;
      document.title = `Movie | ${title}`;
      return function () {
        document.title = "UsePopcorn";
      };
    },
    [title]
  );

  // useEffect(() => {
  //   const EscEvent = (e) => {
  //     if (e.code === "Escape") onCloseMovie();
  //   };
  //   document.addEventListener("keydown", EscEvent); //WOW
  //   return () => document.removeEventListener("keydown", EscEvent);
  // }, [onCloseMovie]);

  // Create custom hook WOW
  useKey("escape", onCloseMovie);

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={onCloseMovie}>
              &larr;
            </button>
            <img src={poster} alt={title} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐️</span>
                {imdbRating} IMDB rating
              </p>
            </div>
          </header>

          {/* <p>{avgRating}</p> */}

          <section>
            <div className="rating">
              {!isWatched ? (
                <>
                  <StarRating
                    size={24}
                    maxRating={10}
                    onSetRating={setUserRating}
                  />
                  {userRating > 0 && (
                    <button className="btn-add" onClick={handleAdd}>
                      + Add to list
                    </button>
                  )}
                </>
              ) : (
                <p>
                  You rated movie {watchedUserRating} <span>⭐️</span>
                </p>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring: {actors}</p>
            <p>Directored bt {director}</p>
          </section>
        </>
      )}
    </div>
  );
};

const Summary = ({ watched }) => {
  const avgImdbRating = average(
    watched.map((movie) => movie.imdbRating)
  ).toFixed(2);
  const avgUserRating = average(
    watched.map((movie) => movie.userRating)
  ).toFixed(2);
  const avgRuntime = average(watched.map((movie) => movie.runtime)).toFixed(2);

  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
};

const WatchedMoviesList = ({ watched, onDeleteWatched }) => {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie
          movie={movie}
          key={movie.imdbID}
          onDeleteWatched={onDeleteWatched}
        />
      ))}
    </ul>
  );
};

const WatchedMovie = ({ movie, onDeleteWatched }) => {
  return (
    <li key={movie.imdbID}>
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>

        <button
          className="btn-delete"
          onClick={() => onDeleteWatched(movie.imdbID)}
        >
          X
        </button>
      </div>
    </li>
  );
};

const Loader = () => {
  return <p className="loader">Loading...</p>;
};

const ErrorMessage = ({ message }) => {
  return (
    <p className="error">
      <span>❌</span>
      {message}
    </p>
  );
};

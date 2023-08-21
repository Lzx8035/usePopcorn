import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

// import React, { useState } from "react";
// import StarRating from "./StarRating";
// import Practise from "./Practise";

// const Test = () => {
//   const [movieRating, setMovieRating] = useState(0);

//   return (
//     <div>
//       <StarRating color="pink" maxRating={10} onSetRating={setMovieRating} />
//       <h3>
//         The movie was rate for {movieRating} stars(we want the rate outside the
//         conponent, so we used a external state)
//       </h3>
//     </div>
//   );
// };

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <StarRating
      maxRating={5}
      messages={["Terrible", "Bad", "Okay", "Good", "Amazing"]}
    />
    <StarRating size={24} color="red" className="test" defaultRating={3} /> */}

    {/* <Test /> */}

    <App />

    {/* <Practise /> */}
  </React.StrictMode>
);

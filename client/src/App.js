import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [characters, setCharacters] = useState([]);

useEffect(() => {
  axios.get("http://localhost:5000/characters")
    .then((response) => {
      console.log(response.data); // Log response
      setCharacters(response.data.data.results);
    })
    .catch((error) => console.error("Error fetching data:", error));
}, []);

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Marvel Characters</h1>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        {characters.map((character) => (
          <div key={character.id} style={{ margin: "20px", width: "200px" }}>
            <img
              src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
              alt={character.name}
              style={{ width: "100%", borderRadius: "10px" }}
            />
            <h3>{character.name}</h3>
            <p>{character.description || "No description available"}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;

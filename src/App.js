import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [animes, setAnimes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnimes = async () => {
      try {
        const response = await axios.get("https://api.jikan.moe/v4/top/anime");
        setAnimes(response.data.data.slice(0, 5)); // Prend les 5 premiers animés
        setLoading(false);
      } catch (error) {
        console.error("Erreur lors du chargement des animés :", error);
        setLoading(false);
      }
    };

    fetchAnimes();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Top 5 Animés</h1>
        {loading ? (
          <p>Chargement en cours...</p>
        ) : (
          <ul>
            {animes.map((anime) => (
              <li key={anime.mal_id}>
                <h2>{anime.title}</h2>
                <img src={anime.images.jpg.large_image_url} alt={anime.title} />
                <p>Score : {anime.score}</p>
              </li>
            ))}
          </ul>
        )}
      </header>
    </div>
  );
}

export default App;

import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./myLibrary.css";
import GameRating from "../components/GameRating";

function MyLibrary({ games, reference, active }) {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const ownedGames = useMemo(() => {
    return games;
  }, [games]);

  const filteredGames = ownedGames.filter((game) =>
    game.title.toLowerCase().includes(search.toLowerCase())
  );

  const recentlyBought = ownedGames[0];

  return (
    <section
      id="my-library"
      className={`my-library ${active ? "active" : ""}`}
      ref={reference}
    >
      <div className="library-header">
        <h2>My Library</h2>
        <p>Own your adventures. Every game you've purchased lives here.</p>

        <div className="library-search">
          <i className="bi bi-search"></i>

          <input
            type="text"
            placeholder="Search your library..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {recentlyBought && (
        <>
          {/* <h3 className="section-title">Recently Bought</h3> */}
          <h3 className="section-title">
    <i className="bi bi-heart-fill"></i> My Favorites
</h3>

<div className="library-grid">
  {filteredGames.slice(0, 4).map((game) => (
    <div className="library-card" key={game.id}>
      <img src={game.img} alt={game.title} />

      <div className="card-content">
        <div className="gameFeature">
          <span className="gameType">Favorite</span>
          <GameRating rating={game.rating} />
        </div>

        <h4>{game.title}</h4>

        <span className="installed">
          <i className="bi bi-heart-fill"></i>
          Liked
        </span>

        <button>View Details</button>
      </div>
    </div>
  ))}
</div>

<h3 className="section-title recent-title">
    <i className="bi bi-bag-check-fill"></i> Recently Bought
</h3>

          <div className="recent-game">
            <img
              src={recentlyBought.img}
              alt={recentlyBought.title}
            />

            <div className="recent-content">
              <span className="badge">NEW</span>

              <h2>{recentlyBought.title}</h2>

              <p>{recentlyBought.description}</p>

              <GameRating rating={recentlyBought.rating} />

              <div className="library-buttons">
                <button className="play-btn">
                  <i className="bi bi-play-fill"></i>
                  Play
                </button>

                <button
                  className="details-btn"
                  onClick={() => navigate(`/game/${recentlyBought._id || recentlyBought.id}`)}
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      <h3 className="section-title">All Games</h3>

      <div className="library-grid">
        {filteredGames.map((game) => (
          <div className="library-card" key={game.id}>
            <img src={game.img} alt={game.title} />

            <div className="card-content">
              <h4>{game.title}</h4>

              <GameRating rating={game.rating} />

              <span className="installed">
                <i className="bi bi-check-circle-fill"></i>
                Installed
              </span>

              <button
                onClick={() => navigate(`/game/${game._id || game.id}`)}
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default MyLibrary;
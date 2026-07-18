import React from "react";
import "./games.css";
import GameCard from "../components/GameCard";

function Games({ games, reference, active }) {
  return (
    <section
      id="games"
      className={`games ${active ? "active" : ""}`}
      ref={reference}
    >
      <div className="container-fluid">

        {/* ================= Header ================= */}

        <div className="games-top">

          <div className="title-area">
            <span className="page-tag">
              GAME STORE
            </span>

            <h1>All Games</h1>

            <p>
              Discover your next favorite adventure from our growing collection.
            </p>
          </div>

          {/* Search */}

          <div className="search-box">

            <i className="bi bi-search"></i>

            <input
              type="text"
              placeholder="Search games..."
            />

          </div>

          {/* Toolbar */}

          <div className="toolbar">

            {/* Filters */}

            <div className="filters">

              <select>
                <option>Category</option>
              </select>

              <select>
                <option>Genre</option>
              </select>

              <select>
                <option>Platform</option>
              </select>

              <select>
                <option>Publisher</option>
              </select>

            </div>

            {/* Sort */}

            <div className="sort">

              <select>
                <option>Featured</option>
                <option>Price : Low → High</option>
                <option>Price : High → Low</option>
                <option>Rating</option>
                <option>Name A-Z</option>
                <option>Name Z-A</option>
              </select>

            </div>

          </div>

          {/* Games Count */}

          <div className="games-info">

            <h5>
              Showing <span>{games.length}</span> Games
            </h5>

          </div>

        </div>

        {/* ================= Games Grid ================= */}

        <div className="row">
          {games.map((game) => (
            <GameCard
              key={game._id}
              game={game}
            />
          ))}
        </div>

      </div>
    </section>
  );
}

export default Games;
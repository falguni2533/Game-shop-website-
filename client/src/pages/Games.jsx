import React from "react";
import "./games.css";
import GameCard from "../components/GameCard";

function Games({ games, reference, active }) {
  return (
     <section id="games" className={`games ${active ? "active" : ""}`} ref={reference}>
   
      <div className="container-fluid">

        {/* Page Heading */}
        <div className="row">
          <div className="col-12">
            <h2 className="section-title">All Games</h2>
            <p className="section-subtitle">
              Explore our complete collection of games.
            </p>
          </div>
        </div>

        {/* Games Grid */}
        <div className="row">
          {games.map((game) => (
            <GameCard key={game._id} game={game} />
          ))}
        </div>

      </div>
    </section>
  );
}

export default Games;
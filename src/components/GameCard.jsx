import React from 'react'
 import './gameCard.css';

function GameCard({game}) {
  return (
    <div className="col-xl-3 col-lg-4 col-md-6">
      <img src={game.img} alt={game.title} className="img-fluid" />
      <a href="#">
        <i className="gameFeauture">
        </i>
      </a>
      <div className="gameType">
        <span className="gameType">{game.level}</span>
      </div>
    </div>
  );
}

export default GameCard;

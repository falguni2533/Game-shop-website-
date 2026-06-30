import React from 'react'
 import './gameCard.css';
 import GameRating from './GameRating';

function GameCard({game}) {
  return (
    <div className="col-xl-3 col-lg-4 col-md-6">
      <img src={game.img} alt={game.title} className="img-fluid" />
      <a href="#">
        <i className="gameFeauture"></i>
      </a>
      <div className="gameType">
        <span className="gameType">{game.level}</span>
        <GameRating  rating={game.rating}/>
      </div>
      <div className="gameTitle" mt-4 mb-3>{game.title}</div>
      <div className="gamePrice">
        {game.discount  !=0 && (
          <>
          <span className= "discount">
            <i>{game.discount * 100}%</i>
            </span>
            <span className="prevPrice">${game.price.toFixed(2)}</span>
            </>
        )}
       </div>
    </div>
    
  );
}

export default GameCard;

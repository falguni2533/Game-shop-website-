// import React from "react";
// import { useNavigate } from "react-router-dom";
// import "./gameCard.css";
// import GameRating from "./GameRating";

// function GameCard({ game }) {
//   const navigate = useNavigate();

//   return (
//     <div className="col-xl-3 col-lg-4 col-md-6">
//       <div
//         className="gameCard"
//         onClick={() => navigate(`/game/${game._id}`)}
//         style={{ cursor: "pointer" }}
//       >
//         <img src={game.img} alt={game.title} className="img-fluid" />

//         <a
//           className="like"
//           href="#"
//           onClick={(e) => e.preventDefault()}
//         >
//           <i className="bi bi-heart-fill"></i>
//         </a>

//         <div className="gameFeature">
//           <span className="gameType">{game.level}</span>
//           <GameRating rating={game.rating} />
//         </div>

//         <div className="gameTitle mt-4 mb-3">
//           {game.title}
//         </div>

//         <div className="gamePrice">
//           {game.discount !== 0 && (
//             <>
//               <span className="discount">
//                 <i>{game.discount * 100}%</i>
//               </span>

//               <span className="prevPrice">
//                 ${game.price.toFixed(2)}
//               </span>
//             </>
//           )}

//           <span className="currentPrice">
//             ${((1 - game.discount) * game.price).toFixed(2)}
//           </span>
//         </div>

//         <a
//           href="#"
//           className="addbag"
//           onClick={(e) => e.preventDefault()}
//         >
//           <i className="bi bi-bag-plus-fill"></i>
//         </a>
//       </div>
//     </div>
//   );
// }

// export default GameCard;



import React from "react";
import { useNavigate } from "react-router-dom";
import "./gameCard.css";
import GameRating from "./GameRating";

function GameCard({ game }) {
  const navigate = useNavigate();

  const discount = game.discount || 0;

  const currentPrice =
    game.price - (game.price * discount) / 100;

  return (
    <div className="col-xl-3 col-lg-4 col-md-6">
      <div
        className="gameCard"
        onClick={() => navigate(`/game/${game._id}`)}
        style={{ cursor: "pointer" }}
      >

        <img
          src={game.coverImage}
          alt={game.title}
          className="img-fluid"
        />

        <a
          className="like"
          href="#"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <i className="bi bi-heart-fill"></i>
        </a>

        <div className="gameFeature">

          <span className="gameType">
            {game.category?.name || "Game"}
          </span>

          <GameRating
            rating={game.averageRating || 0}
          />

        </div>

        <div className="gameTitle mt-4 mb-3">
          {game.title}
        </div>

        <div className="gamePrice">

          {discount > 0 && (
            <>
              <span className="discount">
                <i>{discount}%</i>
              </span>

              <span className="prevPrice">
                ${game.price.toFixed(2)}
              </span>
            </>
          )}

          <span className="currentPrice">
            ${currentPrice.toFixed(2)}
          </span>

        </div>

        <a
          href="#"
          className="addbag"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <i className="bi bi-bag-plus-fill"></i>
        </a>

      </div>
    </div>
  );
}

export default GameCard;
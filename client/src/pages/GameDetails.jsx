import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import GameRating from "../components/GameRating";
import GameCard from "../components/GameCard";
import "./GameDetails.css";

function GameDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [game, setGame] = useState(null);
  const [games, setGames] = useState([]);

  useEffect(() => {
    fetch("/api/games.Data.json")
      .then((res) => res.json())
      .then((data) => {
        setGames(data);

        const selectedGame = data.find(
          (item) => item._id === Number(id)
        );

        setGame(selectedGame);
      })
      .catch((err) => console.log(err));
  }, [id]);

  if (!game) {
    return (
      <div className="loading">
        <h2>Loading...</h2>
      </div>
    );
  }

  const relatedGames = games
    .filter(
      (item) =>
        item.category === game.category &&
        item._id !== game._id
    )
    .slice(0, 4);

  return (
    <div className="game-details">

      {/* Back Button */}

      <button
        className="back-btn"
        onClick={() => navigate("/")}
      >
        <i className="bi bi-arrow-left"></i>
        Back to Store
      </button>

      {/* ================= HERO ================= */}

      <div className="hero-section">

        {/* Left */}

        <div className="hero-image">

          <img
            src={game.img}
            alt={game.title}
          />

        </div>

        {/* Right */}

        <div className="hero-content">

          <span className="category-badge">
            {game.category}
          </span>

          <h1>{game.title}</h1>

          <div className="rating-box">

            <GameRating rating={game.rating} />

            <span className="review-text">
              {game.rating}.0 / 5 Rating
            </span>

          </div>

          <div className="game-meta">

            <div className="meta-item">
              <h5>Difficulty</h5>
              <p>{game.level}</p>
            </div>

            <div className="meta-item">
              <h5>Category</h5>
              <p>{game.category}</p>
            </div>

          </div>

          <div className="price-box">

            <div className="price-row">

              <h2>
                $
                {(
                  game.price -
                  game.price * game.discount
                ).toFixed(2)}
              </h2>

              {game.discount > 0 && (
                <>
                  <span className="old-price">
                    ${game.price.toFixed(2)}
                  </span>

                  <span className="discount-badge">
                    {game.discount * 100}% OFF
                  </span>
                </>
              )}

            </div>

          </div>

          <div className="action-buttons">

            <button className="cart-btn">
              <i className="bi bi-bag-plus-fill"></i>
              Add to Cart
            </button>

            <button className="buy-btn">
              <i className="bi bi-lightning-fill"></i>
              Buy Now
            </button>

            <button className="wish-btn">
              <i className="bi bi-heart-fill"></i>
            </button>

          </div>

        </div>

      </div>

      {/* ================= ABOUT ================= */}

      <div className="details-card">

        <h2>
          <i className="bi bi-controller"></i>
          About Game
        </h2>

        <p>
          {game.description}
        </p>

      </div>
          {/* Game Description */}
      <section className="game-description">
        <h2>About This Game</h2>

        <p>
          {game.description ||
            "Experience an amazing adventure with stunning visuals, immersive gameplay, and exciting challenges. Discover new worlds and unforgettable moments."}
        </p>
      </section>


      {/* Game Features */}
      <section className="game-features">

        <h2>Features</h2>

        <div className="feature-grid">

          <div className="feature-card">
            <i className="bi bi-controller"></i>
            <h4>Immersive Gameplay</h4>
            <p>
              Enjoy smooth controls and engaging gameplay mechanics.
            </p>
          </div>


          <div className="feature-card">
            <i className="bi bi-people"></i>
            <h4>Multiplayer</h4>
            <p>
              Play with friends and compete with players worldwide.
            </p>
          </div>


          <div className="feature-card">
            <i className="bi bi-stars"></i>
            <h4>High Quality Graphics</h4>
            <p>
              Beautiful environments with detailed visuals.
            </p>
          </div>


          <div className="feature-card">
            <i className="bi bi-trophy"></i>
            <h4>Achievements</h4>
            <p>
              Unlock rewards and complete exciting missions.
            </p>
          </div>

        </div>

      </section>



      {/* System Requirements */}
      <section className="requirements">

        <h2>System Requirements</h2>


        <div className="requirement-box">


          <div>
            <h4>Minimum</h4>

            <p>
              <strong>OS:</strong>{" "}
              {game.systemRequirements?.minimum?.os || "Windows 10"}
            </p>


            <p>
              <strong>Processor:</strong>{" "}
              {game.systemRequirements?.minimum?.processor ||
                "Intel Core i5"}
            </p>


            <p>
              <strong>RAM:</strong>{" "}
              {game.systemRequirements?.minimum?.ram ||
                "8 GB"}
            </p>


            <p>
              <strong>Graphics:</strong>{" "}
              {game.systemRequirements?.minimum?.graphics ||
                "GTX 1060"}
            </p>

          </div>



          <div>

            <h4>Recommended</h4>

            <p>
              <strong>OS:</strong>{" "}
              {game.systemRequirements?.recommended?.os ||
                "Windows 11"}
            </p>


            <p>
              <strong>Processor:</strong>{" "}
              {game.systemRequirements?.recommended?.processor ||
                "Intel Core i7"}
            </p>


            <p>
              <strong>RAM:</strong>{" "}
              {game.systemRequirements?.recommended?.ram ||
                "16 GB"}
            </p>


            <p>
              <strong>Graphics:</strong>{" "}
              {game.systemRequirements?.recommended?.graphics ||
                "RTX 3060"}
            </p>


          </div>


        </div>

      </section>




      {/* Trailer Section */}

      <section className="trailer-section">

        <h2>Game Trailer</h2>


        <div className="trailer-box">

          <button>
            <i className="bi bi-play-fill"></i>
          </button>


        </div>


      </section>





      {/* Reviews */}

      <section className="reviews">

        <h2>Player Reviews</h2>


        <div className="review-card">


          <div className="review-user">

            <img
              src="/assets/user.png"
              alt="user"
            />


            <div>
              <h4>Alex Gamer</h4>

              <div className="stars">
                ★★★★★
              </div>

            </div>


          </div>


          <p>
            Amazing game with incredible graphics and gameplay.
            Totally worth playing!
          </p>


        </div>


      </section>






      {/* Related Games */}

      <section className="related-games">


        <h2>
          More Like This
        </h2>


        <div className="related-grid">


          {
            games
              .filter(item => item._id !== game._id)
              .slice(0,4)
              .map(item => (

                <div 
                  className="related-card"
                  key={item._id}
                >

                  <img
                    src={item.img}
                    alt={item.title}
                  />


                  <h4>
                    {item.title}
                  </h4>


                  <p>
                    ₹{item.price}
                  </p>


                </div>

              ))
          }


        </div>


      </section>



    </div>
  );
}
export default GameDetails;

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import GameRating from "../components/GameRating";
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
      <div className="game-loading">
        <h2>Loading Game...</h2>
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

  const finalPrice = (
    game.price -
    game.price * game.discount
  ).toFixed(2);

  return (
    <div className="game-details">

      {/* ================= Back Button ================= */}

      <button
        className="back-btn"
        onClick={() => navigate("/")}
      >
        <i className="bi bi-arrow-left"></i>
        Back to Store
      </button>

      {/* ================= Hero Section ================= */}

      <section className="hero-section">

        {/* Left Image */}

        <div className="hero-image">
          <img
            src={game.img}
            alt={game.title}
          />
        </div>

        {/* Right Content */}

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

              <h2>${finalPrice}</h2>

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

      </section>

      {/* ================= About Game ================= */}

      <section className="game-description">

        <h2>
          <i className="bi bi-controller"></i>
          About This Game
        </h2>

        <p>
          {game.description ||
            "Experience an unforgettable adventure with immersive gameplay, stunning visuals, challenging missions, and an exciting world waiting to be explored."}
        </p>

      </section>
            {/* ================= Features ================= */}

      <section className="game-features">

        <h2>
          <i className="bi bi-stars"></i>
          Game Features
        </h2>

        <div className="feature-grid">

          <div className="feature-card">
            <i className="bi bi-controller"></i>
            <h4>Immersive Gameplay</h4>
            <p>
              Master responsive controls and enjoy engaging combat,
              exploration, and challenging missions.
            </p>
          </div>

          <div className="feature-card">
            <i className="bi bi-people-fill"></i>
            <h4>Multiplayer</h4>
            <p>
              Team up with friends or compete against players around
              the world in exciting online battles.
            </p>
          </div>

          <div className="feature-card">
            <i className="bi bi-badge-hd-fill"></i>
            <h4>Next-Gen Graphics</h4>
            <p>
              Experience breathtaking environments, realistic lighting,
              and smooth high-quality visuals.
            </p>
          </div>

          <div className="feature-card">
            <i className="bi bi-trophy-fill"></i>
            <h4>Achievements</h4>
            <p>
              Unlock achievements, complete missions,
              and collect exclusive rewards.
            </p>
          </div>

        </div>

      </section>

      {/* ================= System Requirements ================= */}

      <section className="requirements">

        <h2>
          <i className="bi bi-pc-display"></i>
          System Requirements
        </h2>

        <div className="requirement-card">

          <div className="requirement-column">

            <h3>Minimum</h3>

            <div>
              <strong>OS</strong>
              <span>
                {game.systemRequirements?.minimum?.os || "Windows 10"}
              </span>
            </div>

            <div>
              <strong>Processor</strong>
              <span>
                {game.systemRequirements?.minimum?.processor ||
                  "Intel Core i5"}
              </span>
            </div>

            <div>
              <strong>RAM</strong>
              <span>
                {game.systemRequirements?.minimum?.ram || "8 GB"}
              </span>
            </div>

            <div>
              <strong>Graphics</strong>
              <span>
                {game.systemRequirements?.minimum?.graphics ||
                  "GTX 1060"}
              </span>
            </div>

          </div>

          <div className="requirement-column">

            <h3>Recommended</h3>

            <div>
              <strong>OS</strong>
              <span>
                {game.systemRequirements?.recommended?.os || "Windows 11"}
              </span>
            </div>

            <div>
              <strong>Processor</strong>
              <span>
                {game.systemRequirements?.recommended?.processor ||
                  "Intel Core i7"}
              </span>
            </div>

            <div>
              <strong>RAM</strong>
              <span>
                {game.systemRequirements?.recommended?.ram || "16 GB"}
              </span>
            </div>

            <div>
              <strong>Graphics</strong>
              <span>
                {game.systemRequirements?.recommended?.graphics ||
                  "RTX 3060"}
              </span>
            </div>

          </div>

        </div>

      </section>

      {/* ================= Trailer ================= */}

      <section className="trailer-section">

        <h2>
          <i className="bi bi-play-circle-fill"></i>
          Official Trailer
        </h2>

        <div className="trailer-box">

          <button className="play-btn">
            <i className="bi bi-play-fill"></i>
          </button>

          <p>Watch Gameplay Trailer</p>

        </div>

      </section>

      {/* ================= Reviews ================= */}

      <section className="reviews">

        <h2>
          <i className="bi bi-chat-square-text-fill"></i>
          Player Reviews
        </h2>

        <div className="review-card">

          <div className="review-user">

            <img
              src="/assets/user.png"
              alt="User"
            />

            <div>

              <h4>Alex Gamer</h4>

              <div className="stars">
                ★★★★★
              </div>

            </div>

          </div>

          <p>
            Amazing game with beautiful graphics, smooth controls,
            and an incredible storyline. Definitely one of the best
            games I've played this year!
          </p>

        </div>

      </section>

      {/* ================= Related Games ================= */}

      <section className="related-games">

        <h2>
          <i className="bi bi-joystick"></i>
          More Like This
        </h2>

        <div className="related-grid">

          {relatedGames.map((item) => (

            <div
              className="related-card"
              key={item._id}
              onClick={() => navigate(`/games/${item._id}`)}
            >

              <img
                src={item.img}
                alt={item.title}
              />

              <div className="related-content">

                <h4>{item.title}</h4>

                <p>{item.category}</p>

                <span>
                  $
                  {(
                    item.price -
                    item.price * item.discount
                  ).toFixed(2)}
                </span>

              </div>

            </div>

          ))}

        </div>

      </section>

    </div>
  );
}

export default GameDetails;
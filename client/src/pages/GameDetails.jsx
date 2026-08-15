import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import GameRating from "../components/GameRating";
import "./GameDetails.css";
import { getGames } from "../api/gameApi";

function GameDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [game, setGame] = useState(null);
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  // ================= FETCH GAME =================

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    const fetchGame = async () => {
      try {
        setLoading(true);

        const data = await getGames();

        const allGames = Array.isArray(data)
          ? data
          : data.games || data.data || [];

        setGames(allGames);

        const selectedGame = allGames.find(
          (item) => String(item._id) === String(id)
        );

        setGame(selectedGame || null);
      } catch (error) {
        console.error("Error fetching game:", error);
        setGame(null);
      } finally {
        setLoading(false);
      }
    };

    fetchGame();
  }, [id]);

  // ================= LOADING =================

  if (loading) {
    return (
      <div className="game-loading">
        <h2>Loading...</h2>
      </div>
    );
  }

  // ================= GAME NOT FOUND =================

  if (!game) {
    return (
      <div className="game-loading">
        <h2>Game not found 😕</h2>

        <button
          className="back-btn"
          onClick={() => navigate("/")}
        >
          <i className="bi bi-arrow-left"></i>
          Back to Store
        </button>
      </div>
    );
  }

  // ================= PRICE =================

  const discount = game.discount || 0;

  const currentPrice =
    game.price - (game.price * discount) / 100;

  // ================= CATEGORY =================

  const categoryName =
    game.category?.name ||
    game.category?.title ||
    "Game";

  // ================= RATING =================

  const rating = game.averageRating || 0;

  // ================= RELATED GAMES =================

  const relatedGames = games
    .filter((item) => {
      if (String(item._id) === String(game._id)) {
        return false;
      }

      const currentCategory =
        game.category?._id || game.category;

      const itemCategory =
        item.category?._id || item.category;

      return (
        String(currentCategory) ===
        String(itemCategory)
      );
    })
    .slice(0, 4);

  // ================= TRAILER =================

  const getYoutubeEmbedUrl = (url) => {
    if (!url) return null;

    if (url.includes("youtube.com/watch?v=")) {
      const videoId = url
        .split("v=")[1]
        ?.split("&")[0];

      return videoId
        ? `https://www.youtube.com/embed/${videoId}`
        : null;
    }

    if (url.includes("youtu.be/")) {
      const videoId = url
        .split("youtu.be/")[1]
        ?.split("?")[0];

      return videoId
        ? `https://www.youtube.com/embed/${videoId}`
        : null;
    }

    if (url.includes("youtube.com/embed/")) {
      return url;
    }

    return url;
  };

  const trailerUrl = getYoutubeEmbedUrl(
    game.trailerUrl
  );

  // ================= ADD TO CART =================

  const handleAddToCart = () => {
    const existingBag =
      JSON.parse(localStorage.getItem("gameBag")) || [];

    const alreadyExists = existingBag.some(
      (item) => String(item._id) === String(game._id)
    );

    if (alreadyExists) {
      alert(`${game.title} is already in your bag.`);
      return;
    }

    const updatedBag = [...existingBag, game];

    localStorage.setItem(
      "gameBag",
      JSON.stringify(updatedBag)
    );

    alert(`${game.title} added to your bag 🛍️`);
  };

  // ================= BUY NOW =================

  const handleBuyNow = () => {
    const existingBag =
      JSON.parse(localStorage.getItem("gameBag")) || [];

    const alreadyExists = existingBag.some(
      (item) => String(item._id) === String(game._id)
    );

    if (!alreadyExists) {
      const updatedBag = [...existingBag, game];

      localStorage.setItem(
        "gameBag",
        JSON.stringify(updatedBag)
      );
    }

    // Go directly to Bag
    navigate("/bag");
  };

  // ================= RENDER =================

  return (
    <div className="game-details">

      {/* ================= BACK BUTTON ================= */}

      <button
        className="back-btn"
        onClick={() => navigate("/")}
      >
        <i className="bi bi-arrow-left"></i>
        Back to Store
      </button>

      {/* ================= HERO SECTION ================= */}

      <div className="hero-section">

        {/* GAME IMAGE */}

        <div className="hero-image">
          <img
            src={game.coverImage}
            alt={game.title}
          />
        </div>

        {/* GAME CONTENT */}

        <div className="hero-content">

          {/* CATEGORY */}

          <span className="category-badge">
            {categoryName}
          </span>

          {/* TITLE */}

          <h1>{game.title}</h1>

          {/* RATING */}

          <div className="rating-box">
            <GameRating rating={rating} />

            <span className="review-text">
              {rating} / 5 Rating
            </span>
          </div>

          {/* GAME META */}

          <div className="game-meta">

            <div className="meta-item">
              <h5>Category</h5>
              <p>{categoryName}</p>
            </div>

            <div className="meta-item">
              <h5>Release Date</h5>

              <p>
                {game.releaseDate
                  ? new Date(
                      game.releaseDate
                    ).toLocaleDateString()
                  : "N/A"}
              </p>
            </div>

          </div>

          {/* PRICE */}

          <div className="price-box">

            <div className="price-row">

              <h2>
                ₹{currentPrice.toFixed(2)}
              </h2>

              {discount > 0 && (
                <>
                  <span className="old-price">
                    ₹{game.price.toFixed(2)}
                  </span>

                  <span className="discount-badge">
                    {discount}% OFF
                  </span>
                </>
              )}

            </div>

          </div>

          {/* ACTION BUTTONS */}

          <div className="action-buttons">

            {/* ADD TO CART */}

            <button
              className="cart-btn"
              onClick={handleAddToCart}
            >
              <i className="bi bi-bag-plus-fill"></i>
              Add to Cart
            </button>

            {/* BUY NOW */}

            <button
              className="buy-btn"
              onClick={handleBuyNow}
            >
              <i className="bi bi-lightning-fill"></i>
              Buy Now
            </button>

            {/* WISHLIST */}

            <button
              className="wish-btn"
              onClick={() => {
                alert(
                  `${game.title} added to wishlist ❤️`
                );
              }}
            >
              <i className="bi bi-heart-fill"></i>
            </button>

          </div>

        </div>
      </div>

      {/* ================= ABOUT GAME ================= */}

      <div className="details-card">

        <h2>
          <i className="bi bi-controller"></i>
          About Game
        </h2>

        <p>
          {game.fullDescription ||
            game.shortDescription ||
            "No description available."}
        </p>

      </div>

      {/* ================= FEATURES ================= */}

      <section className="game-features">

        <h2>Features</h2>

        <div className="feature-grid">

          <div className="feature-card">
            <i className="bi bi-controller"></i>

            <h4>Immersive Gameplay</h4>

            <p>
              Enjoy smooth controls and engaging
              gameplay mechanics.
            </p>
          </div>

          <div className="feature-card">
            <i className="bi bi-people"></i>

            <h4>Multiplayer</h4>

            <p>
              Play with friends and compete
              with players worldwide.
            </p>
          </div>

          <div className="feature-card">
            <i className="bi bi-stars"></i>

            <h4>High Quality Graphics</h4>

            <p>
              Beautiful environments with
              detailed visuals.
            </p>
          </div>

          <div className="feature-card">
            <i className="bi bi-trophy"></i>

            <h4>Achievements</h4>

            <p>
              Unlock rewards and complete
              exciting missions.
            </p>
          </div>

        </div>

      </section>

      {/* ================= SYSTEM REQUIREMENTS ================= */}

      <section className="requirements">

        <h2>System Requirements</h2>

        <div className="requirement-box">

          {/* MINIMUM */}

          <div>

            <h4>Minimum</h4>

            <p>
              <strong>OS:</strong>{" "}
              {game.systemRequirements?.minimum?.os ||
                "N/A"}
            </p>

            <p>
              <strong>Processor:</strong>{" "}
              {game.systemRequirements?.minimum?.processor ||
                "N/A"}
            </p>

            <p>
              <strong>Memory:</strong>{" "}
              {game.systemRequirements?.minimum?.memory ||
                "N/A"}
            </p>

            <p>
              <strong>Graphics:</strong>{" "}
              {game.systemRequirements?.minimum?.graphics ||
                "N/A"}
            </p>

            <p>
              <strong>Storage:</strong>{" "}
              {game.systemRequirements?.minimum?.storage ||
                "N/A"}
            </p>

          </div>

          {/* RECOMMENDED */}

          <div>

            <h4>Recommended</h4>

            <p>
              <strong>OS:</strong>{" "}
              {game.systemRequirements?.recommended?.os ||
                "N/A"}
            </p>

            <p>
              <strong>Processor:</strong>{" "}
              {game.systemRequirements?.recommended?.processor ||
                "N/A"}
            </p>

            <p>
              <strong>Memory:</strong>{" "}
              {game.systemRequirements?.recommended?.memory ||
                "N/A"}
            </p>

            <p>
              <strong>Graphics:</strong>{" "}
              {game.systemRequirements?.recommended?.graphics ||
                "N/A"}
            </p>

            <p>
              <strong>Storage:</strong>{" "}
              {game.systemRequirements?.recommended?.storage ||
                "N/A"}
            </p>

          </div>

        </div>

      </section>

      {/* ================= TRAILER ================= */}

      <section className="trailer-section">

        <h2>Game Trailer</h2>

        <div className="trailer-box">

          {trailerUrl ? (

            <iframe
              width="100%"
              height="450"
              src={trailerUrl}
              title={`${game.title} Trailer`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>

          ) : (

            <div className="no-trailer">
              <i className="bi bi-film"></i>

              <p>
                No trailer available for this game.
              </p>
            </div>

          )}

        </div>

      </section>

      {/* ================= REVIEWS ================= */}

      <section className="reviews">

        <h2>Player Reviews</h2>

        {game.reviews?.length > 0 ? (

          game.reviews.map((review, index) => (

            <div
              className="review-card"
              key={review._id || index}
            >

              <div className="review-user">

                <img
                  src="/assets/user.png"
                  alt="user"
                />

                <div>

                  <h4>
                    {review.user?.name ||
                      "Gamer"}
                  </h4>

                  <div className="stars">
                    {"★".repeat(
                      review.rating || 5
                    )}
                  </div>

                </div>

              </div>

              <p>
                {review.comment ||
                  "Amazing game!"}
              </p>

            </div>

          ))

        ) : (

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
              Amazing game with incredible
              graphics and gameplay.
              Totally worth playing!
            </p>

          </div>

        )}

      </section>

      {/* ================= RELATED GAMES ================= */}

      <section className="related-games">

        <h2>More Like This</h2>

        <div className="related-grid">

          {relatedGames.length > 0 ? (

            relatedGames.map((item) => (

              <div
                className="related-card"
                key={item._id}
                onClick={() =>
                  navigate(`/game/${item._id}`)
                }
                style={{ cursor: "pointer" }}
              >

                <img
                  src={item.coverImage}
                  alt={item.title}
                />

                <h4>{item.title}</h4>

                <p>
                  ₹
                  {(
                    item.price -
                    (item.price *
                      (item.discount || 0)) /
                      100
                  ).toFixed(2)}
                </p>

              </div>

            ))

          ) : (

            <p>
              No related games available.
            </p>

          )}

        </div>

      </section>

    </div>
  );
}

export default GameDetails;


import React from "react";
import "./Home.css";
import GameSwiper from "../components/GameSwiper";
import GameCard from "../components/GameCard";
import Footer from "../components/Footer";

function Home({ games, reference, active }) {
  // Different sections
  const promotionGames = games.slice(0, 4);

  const trendingGames = games
    .filter((game) => game.rating >= 4)
    .slice(0, 4);

  const bestSellerGames = games
    .filter((game) => game.price >= 80)
    .slice(0, 4);

  const newReleaseGames = [...games].reverse().slice(0, 4);

  return (
    // <section id="home" className="home active" ref={reference}>
    <section
  id="home"
  className={`home ${active ? "active" : ""}`}
  ref={reference}
>
      <div className="container-fluid">

        {/* Hero Swiper */}
        <div className="row">
          <GameSwiper games={games} />
        </div>

        {/* ================= Games on Promotion ================= */}

        <div className="row">
          <div className="col-lg-6">
            <h2 className="section-title">Games on Promotion</h2>
          </div>

          <div className="col-lg-6 d-flex justify-content-end align-items-center">
            <a href="#" className="viewMore">
              View More Games <i className="bi bi-arrow-right"></i>
            </a>
          </div>
        </div>

        <div className="row">
          {promotionGames.map((game) => (
            <GameCard key={game._id} game={game} />
          ))}
        </div>

        {/* ================= Trending Games ================= */}

        <div className="row section-space">
          <div className="col-lg-6">
            <h2 className="section-title">Trending Games</h2>
          </div>

          <div className="col-lg-6 d-flex justify-content-end align-items-center">
            <a href="#" className="viewMore">
              View More Games <i className="bi bi-arrow-right"></i>
            </a>
          </div>
        </div>

        <div className="row">
          {trendingGames.map((game) => (
            <GameCard key={game._id} game={game} />
          ))}
        </div>

        {/* ================= Best Sellers ================= */}

        <div className="row section-space">
          <div className="col-lg-6">
            <h2 className="section-title">Best Sellers</h2>
          </div>

          <div className="col-lg-6 d-flex justify-content-end align-items-center">
            <a href="#" className="viewMore">
              View More Games <i className="bi bi-arrow-right"></i>
            </a>
          </div>
        </div>

        <div className="row">
          {bestSellerGames.map((game) => (
            <GameCard key={game._id} game={game} />
          ))}
        </div>

        {/* ================= New Releases ================= */}

        <div className="row section-space">
          <div className="col-lg-6">
            <h2 className="section-title">New Releases</h2>
          </div>

          <div className="col-lg-6 d-flex justify-content-end align-items-center">
            <a href="#" className="viewMore">
              View More Games <i className="bi bi-arrow-right"></i>
            </a>
          </div>
        </div>

        <div className="row">
          {newReleaseGames.map((game) => (
            <GameCard key={game._id} game={game} />
          ))}
        </div>
        <Footer />
      </div>
    </section>
  );
}

export default Home;

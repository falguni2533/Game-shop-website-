import React, { useMemo, useState } from "react";
import "./categories.css";
import GameCard from "../components/GameCard";

function Categories({ games = [], reference, active }) {
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [search, setSearch] = useState("");

  const categories = [
    "ALL",
    "RPG",
    "MOBA",
    "BATTLE",
    "RACING",
    "FIGHTING",
  ];

  // Filter games according to category + search
  const filteredGames = useMemo(() => {
    return games.filter((game) => {
      // -----------------------------
      // CATEGORY FILTER
      // -----------------------------
      let categoryMatch = true;

      if (selectedCategory !== "ALL") {
        if (typeof game.category === "string") {
          categoryMatch =
            game.category.toUpperCase() === selectedCategory;
        } else {
          categoryMatch =
            game.category?.name?.toUpperCase() === selectedCategory;
        }
      }

      // -----------------------------
      // SEARCH FILTER
      // -----------------------------
      const searchMatch = game.title
        ?.toLowerCase()
        .includes(search.toLowerCase());

      return categoryMatch && searchMatch;
    });
  }, [games, selectedCategory, search]);

  return (
    <section
      id="categories"
      className={`categories ${active ? "active" : ""}`}
      ref={reference}
    >

      {/* =========================
          HEADER
      ========================= */}

      <div className="categoriesTop">

        <div className="categoriesTitle">

          <span>GAME STORE</span>

          <h1>Game Categories</h1>

          <p>
            Explore your favorite games by category.
          </p>

        </div>

      </div>


      {/* =========================
          SEARCH
      ========================= */}

      <div className="categoriesSearch">

        <i className="bi bi-search"></i>

        <input
          type="text"
          placeholder="Search games..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

      </div>


      {/* =========================
          CATEGORY TABS
      ========================= */}

      <div className="categoryTabs">

        {categories.map((category) => (

          <button
            key={category}
            className={
              selectedCategory === category
                ? "categoryTab active"
                : "categoryTab"
            }
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>

        ))}

      </div>


      {/* =========================
          GAME COUNT
      ========================= */}

      <div className="categoryGameCount">

        Showing{" "}

        <span>
          {filteredGames.length}
        </span>{" "}

        Games

      </div>


      {/* =========================
          GAMES
      ========================= */}

      {filteredGames.length > 0 ? (

        <div className="categoriesGameGrid">

          {filteredGames.map((game) => (

            <GameCard
              key={game._id}
              game={game}
            />

          ))}

        </div>

      ) : (

        /* =========================
           NO GAMES FOUND
        ========================= */

        <div className="noGames">

          <i className="bi bi-search"></i>

          <h3>No Games Found</h3>

          <p>
            Try another category or search.
          </p>

        </div>

      )}

    </section>
  );
}

export default Categories;
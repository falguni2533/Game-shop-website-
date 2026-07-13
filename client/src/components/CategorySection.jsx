import React from "react";
import "./categorySection.css";

function CategorySection({ games }) {
  // Get unique categories
  const categories = [...new Set(games.map((game) => game.category))];

  return (
    <div className="category-section">
      <div className="row">
        <div className="col-lg-6">
          <h2 className="section-title">Browse Categories</h2>
        </div>

        <div className="col-lg-6 d-flex justify-content-end align-items-center">
          <a href="#" className="viewMore">
            View All <i className="bi bi-arrow-right"></i>
          </a>
        </div>
      </div>

      <div className="row">
        {categories.map((category) => (
          <div
            className="col-xl-2 col-lg-3 col-md-4 col-sm-6 mb-4"
            key={category}
          >
            <div className="categoryCard">
              <h4>{category}</h4>
              <span>
                {games.filter((game) => game.category === category).length} Games
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategorySection;
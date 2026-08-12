import React, { useState, useEffect } from "react";
import "./gameRating.css";

function GameRating({ rating = 0 }) {
  const [stars, setStars] = useState([]);

  const generateStars = () => {
    const numericRating = Number(rating) || 0;

    // Keep rating between 0 and 5
    const safeRating = Math.max(0, Math.min(5, numericRating));

    const starCount = Math.floor(safeRating);

    return Array.from({ length: starCount }, (_, index) => index);
  };

  useEffect(() => {
    setStars(generateStars());
  }, [rating]);

  return (
    <div className="gameRating">
      {stars.map((star) => (
        <i
          key={star}
          className="bi bi-star-fill"
        ></i>
      ))}
    </div>
  );
}

export default GameRating;
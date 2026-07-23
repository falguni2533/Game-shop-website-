import React from "react";
import "./bag.css";

function Bag({ games, reference, active }) {
  const bagGames = games.slice(0, 3);

  const total = bagGames.reduce(
    (sum, game) => sum + (1 - game.discount) * game.price,
    0
  );

  return (
    <section
      id="bag"
      className={`bag ${active ? "active" : ""}`}
      ref={reference}
    >
      <div className="bag-header">
        <h1>My Bag</h1>
        <p>Review your selected games before checkout.</p>
      </div>

      <div className="bag-table">

        {/* Table Header */}

        <div className="bag-row bag-heading">
          <div>No.</div>
          <div>Preview</div>
          <div>Game</div>
          <div>Price</div>
          <div>Discount</div>
          <div>Payment</div>
          <div>Remove</div>
        </div>

        {/* Table Body */}

        {bagGames.map((game, index) => {

          const finalPrice = (
            (1 - game.discount) *
            game.price
          ).toFixed(2);

          return (
            <div className="bag-row" key={game.id}>

              <div className="bag-index">
                {index + 1}
              </div>

              <div className="bag-preview">
                <img
                  src={game.img}
                  alt={game.title}
                />
              </div>

              <div className="bag-title">
                {game.title}
              </div>

              <div className="bag-price">
                ${game.price.toFixed(2)}
              </div>

              <div className="bag-discount">
                {game.discount * 100}%
              </div>

              <div className="bag-payment">
                ${finalPrice}
              </div>

              <div className="bag-remove">
                <button>
                  <i className="bi bi-trash3"></i>
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {/* Footer */}

      <div className="bag-footer">

        <div className="bag-total-items">
          <span>Total Items</span>
          <strong>{bagGames.length}</strong>
        </div>

        <div className="bag-total-price">
          <span>Total</span>
          <strong>${total.toFixed(2)}</strong>
        </div>

        <button className="checkout-btn">
          Check Out
          <i className="bi bi-credit-card-fill"></i>
        </button>

      </div>

    </section>
  );
}

export default Bag;
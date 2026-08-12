import React, { useState, useEffect, useRef } from "react";
import "./main.css";

import SideMenu from "../components/SideMenu";
import Header from "../components/Header";

import Home from "./Home";
import Games from "./Games";
import Categories from "./Categories";
import MyLibrary from "./MyLibrary";
import Bag from "./Bag";

import { getGames } from "../api/gameApi";

function Main() {
  const [active, setActive] = useState(false);
  const [games, setGames] = useState([]);
  const [activePage, setActivePage] = useState("home");

  const homeRef = useRef();
  const gamesRef = useRef();
  const categoriesRef = useRef();
  const bagRef = useRef();
  const libraryRef = useRef();

  const sections = [
    {
      name: "home",
      ref: homeRef,
      active: activePage === "home",
    },
    {
      name: "games",
      ref: gamesRef,
      active: activePage === "games",
    },
    {
      name: "categories",
      ref: categoriesRef,
      active: activePage === "categories",
    },
    {
      name: "bag",
      ref: bagRef,
      active: activePage === "bag",
    },
    {
      name: "my-library",
      ref: libraryRef,
      active: activePage === "library",
    },
  ];

  const handleToggleActive = () => {
    setActive(!active);
  };

  const fetchGames = async () => {
    try {
      const data = await getGames();

      console.log("Games received from backend:", data);

      // Handles both possible response structures
      if (Array.isArray(data)) {
        setGames(data);
      } else if (Array.isArray(data.games)) {
        setGames(data.games);
      } else if (Array.isArray(data.data)) {
        setGames(data.data);
      } else {
        console.error("Unexpected games response:", data);
        setGames([]);
      }
    } catch (error) {
      console.error("Error fetching games:", error);
    }
  };

  useEffect(() => {
    fetchGames();
  }, []);

  return (
    <main>
      <SideMenu
        active={active}
        activePage={activePage}
        setActivePage={setActivePage}
      />

      <div className={`banner ${active ? "active" : ""}`}>
        <Header toggleActive={handleToggleActive} />

        <div className="container-fluid">

          <Home
            games={games}
            reference={homeRef}
            active={activePage === "home"}
          />

          <Games
            games={games}
            reference={gamesRef}
            active={activePage === "games"}
          />

          <Categories
            games={games}
            reference={categoriesRef}
            active={activePage === "categories"}
          />

          <MyLibrary
            games={games}
            reference={libraryRef}
            active={activePage === "library"}
          />

          <Bag
            games={games}
            reference={bagRef}
            active={activePage === "bag"}
          />

        </div>
      </div>
    </main>
  );
}

export default Main;
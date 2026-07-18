import React, { useState, useEffect, useRef } from "react";
import "./main.css";


import SideMenu from "../components/SideMenu";
import Header from "../components/Header";

import Home from "./Home";
import Games from "./Games";
import Categories from "./Categories";
import MyLibrary from "./MyLibrary";
import Bag from "./Bag";

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
      active: true,
    },
    {
       name: "games",
       ref: gamesRef,
       active: false,
    },
    {
      name: "categories",
      ref: categoriesRef,
      active: false,
    },
    {
      name: "bag",
      ref: bagRef,
      active: false,
    },
    {
      name: "my-library",
      ref: libraryRef,
      active: false,
    },
  ];

  const handleToggleActive = () => {
    setActive(!active);
  };

  const fetchData = () => {
    fetch("http://localhost:3000/api/games.Data.json")
      .then((res) => res.json())
      .then((data) => {
        setGames(data);
      })
      .catch((e) => console.log(e.message));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main>
      {/* <SideMenu active={active} /> */}
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
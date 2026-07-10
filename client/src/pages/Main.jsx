import React, { useState, useEffect, useRef } from "react";
import "./main.css";

import SideMenu from "../components/SideMenu";
import Header from "../components/Header";

import Home from "./Home";
import Categories from "./Categories";
import MyLibrary from "./MyLibrary";
import Bag from "./Bag";

function Main() {
  const [active, setActive] = useState(false);
  const [games, setGames] = useState([]);

  const homeRef = useRef();
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
      <SideMenu active={active} />

      <div className={`banner ${active ? "active" : ""}`}>
        <Header toggleActive={handleToggleActive} />

        <div className="container-fluid">
          <Home games={games} reference={homeRef} />
          <Categories games={games} reference={categoriesRef} />
          <MyLibrary games={games} reference={libraryRef} />
          <Bag games={games} reference={bagRef} />
        </div>
      </div>
    </main>
  );
}

export default Main;
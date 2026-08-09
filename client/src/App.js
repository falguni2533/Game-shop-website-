import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import { Routes, Route } from "react-router-dom";

import Main from "./pages/Main";
import GameDetails from "./pages/GameDetails";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/game/:id" element={<GameDetails />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}

export default App;
import React from "react";
import "./App.css";
import World from "./containers/World/World";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Account from "./containers/Account/Account";
import Gaming from "./containers/Gaming/Gaming";
import Login from "./containers/Login/Login";
import OurNews from "./containers/OurNews/OurNews";
import Sport from "./containers/Sport/Sport";
import Tech from "./containers/Tech/Tech";
import Upload from "./containers/Upload/Upload";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="account" element={<Account />} />
        <Route path="gaming" element={<Gaming />} />
        <Route path="login" element={<Login />} />
        <Route path="our-news" element={<OurNews />} />
        <Route path="sport" element={<Sport />} />
        <Route path="tech" element={<Tech />} />
        <Route path="upload" element={<Upload />} />
        <Route path="world" element={<World />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

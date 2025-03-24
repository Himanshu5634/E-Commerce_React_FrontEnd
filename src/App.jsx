import React, { useState } from "react";
import Navbar from "./Components/Navbar/Navbar";
import Auth from "./Components/Authentication/auth";
import HeroSection from "./Components/HeroSection/HeroSection";
import { Outlet } from "react-router";

function App() {

  const [showLogin,setShowLogin] = useState(false)
  
  return (
    <>
      {showLogin?(<Auth setShowLogin={setShowLogin}/>):(<></>)}
      <Navbar setShowLogin={setShowLogin}/>
      <Outlet setShowLogin={setShowLogin}/>
    </>
  );
}

export default App;

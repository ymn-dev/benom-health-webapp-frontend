import React from "react";
import heroImagePath from "../../assets/hero.png";
import { Link } from "react-router-dom";

const Hero = () => {
  const heroStyle = {
    backgroundImage: `url(${heroImagePath})`,
  };

  return (
    <>
      <div className="hero min-h-screen" style={heroStyle}>
        <div className="hero-overlay bg-opacity-60 bg-black"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Let Venom be your gym buddy!</h1>
            <p className="mb-5 text-2xl px-5">we offer you automatic calories calculator and activity tracker to keep your life in check and get strong</p>
            <div className="space-x-36">
              <Link to="/signup"><button className="btn btn-ghost hover:scale-105 hover:bg-salmon-column border-salmon-profile hover:border-salmon-profile hover:text-black duration-200">Sign Up</button></Link>
              <Link to="/about"><button className="btn btn-ghost hover:scale-105  hover:bg-salmon-column border-salmon-profile hover:border-salmon-profile hover:text-black duration-200">About us</button></Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;

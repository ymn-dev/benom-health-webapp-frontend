import React from "react";
import heroImagePath from "../../assets/hero.png";

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
            <p className="mb-5">we offer you automatic calories calculator and activity tracker to keep your life in check and get strong</p>
            <div className="space-x-36 ">
              <button className="btn btn-ghost">Try Now</button>
              <button className="btn btn-ghost">Sign Up</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;

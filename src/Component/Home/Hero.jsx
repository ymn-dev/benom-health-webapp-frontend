import React from "react";
import heroImagePath from "../../assets/hero.png";
const Hero = () => {
  return (
    <>
      <div className="heroImageContainer">
        <img src={heroImagePath} />
      </div>
      <div className="textContainer">
        <h1 className="heroH1">Let Venom be your gym buddy!</h1>
        <p className="heroP">
          we offer you automatic calories calculator <br />
          and activity tracker to keep your life in check <br />
          and get strong
        </p>
      </div>
    </>
  );
};

export default Hero;

import React from "react";
import { Link } from "react-router-dom";

const Card = ({ Name, Image, Text }) => {
  const link = "/" + Name.split(" ").join("-").toLowerCase();
  return (
    <div>
      <div className="cardHeading">
        <h3>{Name}</h3>
      </div>
      <div className="cardImage">
        <img src={Image} />
      </div>
      <div className="textContainer">
        {Text}
        <Link to={link}>Learn more</Link>
      </div>
    </div>
  );
};

export default Card;

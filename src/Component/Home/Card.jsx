import React from "react";
import { Link } from "react-router-dom";

const Card = ({ Name, Image, Text }) => {
  const link = "/" + Name.split(" ").join("-").toLowerCase();
  return (
    <div className="text-black  overflow-hidden mx-4 ">
      <div className="bg-salmon p-4">
        <h3 className="text-2xl font-family: 'Nunito' font-bold">{Name}</h3>
      </div>
      <div >
        <img src={Image} alt={Name}  className="w-full"/>
      </div>
      <div className="bg-lightsalmon  p-4 pb-16">
        <p className="text-black font-family: 'Nunito' mt-2 mb-8">{Text}</p>
        <Link to={link} className="text-blue-800 mt-2 font-bold">
          Learn more
        </Link>
      </div>
    </div>
  );
};

export default Card;

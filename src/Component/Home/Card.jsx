import React from "react";
import { Link } from "react-router-dom";

const Card = ({ Name, Image, Text }) => {
  const link = "/" + Name.split(" ").join("-").toLowerCase();
  return (
    
    <div className="text-black  overflow-hidden mx-4  ">
      <div className="bg-salmon p-4">
        <h3 className="text-2xl font-family: 'Nunito' font-bold">{Name}</h3>
      </div>
      <div>
        <img src={Image} alt={Name} className="w-full" />
      </div>
      <div className="bg-lightsalmon  p-4 pb-16">
        <p className="text-black font-family: 'Nunito' mt-2 mb-8">{Text}</p>
        <div className="card-actions justify-end">
       <Link to={link} className=" text-blue-800 mt-2 font-bold just">
          Learn more
        </Link>
    </div>
      </div>
    </div>
    
    // <div className="bg-lightsalmon rounded overflow-hidden shadow-lg">
    //   <img className="w-full" src={Image} alt={Name}/>
    //   <div className="px-6 py-4">
    //     <div className="font-bold text-xl mb-2">{Name}</div>
    //     <p className="text-gray-700 text-base">
    //     {Text}
    //     </p>
    //   </div>
      
    //   <div className="px-6 pt-4 pb-2">
    //     <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#sporttag</span>
    //     <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#workouttag</span>
    //     <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#anytag</span>
    //   </div>

    // </div>
    
    
  );
};

export default Card;

import React from "react";
import { Link } from "react-router-dom";

const Card = ({ Name, Image, Text }) => {
  const link = "/" + Name.split(" ").join("-").toLowerCase();
  return (
    
    <div className="text-white overflow-hidden mx-4 hover:scale-105 shadow-md shadow-gray-950 duration-150 rounded-lg ">
      <div className="bg-dark-sea p-4">
        <h3 className="text-3xl font-family: 'Nunito' font-bold">{Name}</h3>
      </div>
      <div className="w-full h-2/4 overflow-hidden">
        <img src={Image} alt={Name} className="w-full h-full object-cover" />
      </div>
      <div className=" bg-slate-200 p-4 pb-20 ">
        <p className="text-slate-700 font-family: 'Nunito' mt-2 mb-8">{Text}</p>
        <div className="card-actions justify-center">
       <Link to={link} className=" text-slate-700 mt-2 font-bold justify-center btn btn-wide rounded-full bg-slate-200 border-gray-400 hover:bg-sea-blue duration-500 hover:border-gray-400 hover:scale-105">
         {'Learn more'}
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

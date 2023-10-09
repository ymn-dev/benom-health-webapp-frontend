import React from "react";
import bgAboutUs from "../../assets/bgabout.png"
import venom from "../../assets/venom-about.png"


const About = () => {
  const AboutStyle = {
    backgroundImage: `url(${bgAboutUs})`,
  };
  return (
    <>
    <div className="min-h-screen  bg-cover bg-center " style={AboutStyle}>

    <div className="container mx-auto  text-white flex items-center">
      <div className="w-1/2 ml-8">
        <h1 className="text-4xl font-bold font-family: 'Nunito'">About Us</h1>

      <div className="p-4 bg-gray-200 bg-opacity-25 rounded-lg mt-4">
      <p className="text-lg font-family: 'Nunito'">
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Repudiandae aspernatur quaerat maiores quis unde explicabo id consequuntur assumenda?
        Ut minima praesentium amet voluptatem quidem voluptate veniam,
        repudiandae eum voluptas debitis?
      </p>
         <div className="mt-6 text-center ">
             <h3 className="btn w-90 bg-black text-white p-4 font-semibold font-family: 'Nunito'">START YOUR JOURNEY WITH BENOM TODAY</h3>
         </div>
         <div className="mt-6"> 
            <div className="text-center">
            <button className="btn w-60 bg-dark-orange font-family: 'Nunito' ">SMASH IT!</button>
            </div>
        </div>
      </div>
      
    
    
    {/* ภาพเวนอม */}
     
     </div>
      
      
      
      <div className="w-1/2">
         <img src={venom} alt="Venom" className="mx-auto max-w-full h-auto mt-0" />
      </div>
     </div>
          
     {/* // section bottom  */}
       <div className="">

       <div className=" bg-black text-white  text-center rounded-md p-4 ">
        <h3 className="text-2xl font-semibold font-family: 'Nunito' text-center">Developer Team: วีนุ่มชุบแป้งทอด</h3>
      </div>

          <div className="">
            
               {/* Team member cards Top */}
              <div className="flex justify-center items-center">
                  {/* Team member info 1 */}
                  <div className="flex justify-center items-center rounded-lg mr-3 w-100 h-60">
                     <div className="text-center">
                     <img src={venom} alt="Team Member" className="mx-aut mb-0 w-60 h-60 rounded-full" />
                     <p className="mt-[-2rem] font-family: 'Nunito' text-dark-orange text-2xl font-semibold">Name</p>
                     </div>
                     

                     <div className="">
                    {/* github  */}
                    <div>
                    <a href="http://" target="_blank"  className="" rel="noopener noreferrer">
                    <img src="https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&amp;logo=github&amp;logoColor=white" alt="github" className="w-full"></img>
                    </a>
                    </div>
                    <div>
                    {/* linkedin  */}
                    <a href="http://" target="_blank"  className="" rel="noopener noreferrer">
                    <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&amp;logo=linkedin&amp;logoColor=white" alt="linkedin" className="w-full"></img>
                    </a>
                    </div>
                    {/* portfolio */}
                    <div>
                    <a href="http://" target="_blank"  className="" rel="noopener noreferrer">
                    <img src="https://img.shields.io/badge/website-d5d5d5?style=for-the-badge&amp;logo=About.me&amp;logoColor=orange" alt="website" className="w-full"></img>
                    </a>
                    </div>
                    </div>
                   </div>
                  
                  {/* Team member info 2 */}
                  <div className="flex justify-center items-center rounded-lg mr-3 w-100 h-60">
                    <div className="text-center">
                     <img src={venom} alt="Team Member" className="mx-aut mb-0 w-60 h-60 rounded-full" />
                     <p className="mt-[-2rem] font-family: 'Nunito' text-dark-orange text-2xl font-semibold">Name</p>
                     </div>

                     <div className="">
                    {/* github  */}
                    <a href="http://" target="_blank"  className="" rel="noopener noreferrer">
                    <img src="https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&amp;logo=github&amp;logoColor=white" alt="github" className="w-full"></img>
                    
                    </a>
                    {/* linkedin  */}
                    <a href="http://" target="_blank"  className="" rel="noopener noreferrer">
                    <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&amp;logo=linkedin&amp;logoColor=white" alt="linkedin" className="w-full"></img>
                    </a>
                    {/* portfolio */}
                    <a href="http://" target="_blank"  className="" rel="noopener noreferrer">
                    <img src="https://img.shields.io/badge/website-d5d5d5?style=for-the-badge&amp;logo=About.me&amp;logoColor=orange" alt="website" className="w-full"></img>
                    </a>
                    </div>
                   </div>
                   
                   {/* Team member info 3 */}
                  <div className="flex justify-center items-center rounded-lg mr-3 w-100 h-60">
                    <div className="text-center">
                     <img src={venom} alt="Team Member" className="mx-aut mb-0 w-60 h-60 rounded-full" />
                     <p className="mt-[-2rem] font-family: 'Nunito' text-dark-orange text-2xl font-semibold">Name</p>
                     </div>

                     <div className="">
                    {/* github  */}
                    <a href="http://" target="_blank"  className="" rel="noopener noreferrer">
                    <img src="https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&amp;logo=github&amp;logoColor=white" alt="github" className="w-full"></img>
                    
                    </a>
                    {/* linkedin  */}
                    <a href="http://" target="_blank"  className="" rel="noopener noreferrer">
                    <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&amp;logo=linkedin&amp;logoColor=white" alt="linkedin" className="w-full"></img>
                    </a>
                    {/* portfolio */}
                    <a href="http://" target="_blank"  className="" rel="noopener noreferrer">
                    <img src="https://img.shields.io/badge/website-d5d5d5?style=for-the-badge&amp;logo=About.me&amp;logoColor=orange" alt="website" className="w-full"></img>
                    </a>
                    </div>
                   </div>
              </div>

              {/* Team member cards bottom */}
              <div className="flex justify-center items-center">
              {/* Team member info 4 */}
              <div className="flex justify-center items-center rounded-lg mr-3 w-100 h-60">
                  <div className="text-center">
                     <img src={venom} alt="Team Member" className="mx-aut mb-0 w-60 h-60 rounded-full" />
                     <p className="mt-[-2rem] font-family: 'Nunito' text-dark-orange text-2xl font-semibold">Name</p>
                     </div>

                     <div className="">
                    {/* github  */}
                    <a href="http://" target="_blank"  className="" rel="noopener noreferrer">
                    <img src="https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&amp;logo=github&amp;logoColor=white" alt="github" className="w-full"></img>
                    
                    </a>
                    {/* linkedin  */}
                    <a href="http://" target="_blank"  className="" rel="noopener noreferrer">
                    <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&amp;logo=linkedin&amp;logoColor=white" alt="linkedin" className="w-full"></img>
                    </a>
                    {/* portfolio */}
                    <a href="http://" target="_blank"  className="" rel="noopener noreferrer">
                    <img src="https://img.shields.io/badge/website-d5d5d5?style=for-the-badge&amp;logo=About.me&amp;logoColor=orange" alt="website" className="w-full"></img>
                    </a>
                    </div>
                   </div>
                  
                  {/* Team member info 5 */}
                  <div className="flex justify-center items-center rounded-lg mr-3 w-100 h-60">
                    <div className="text-center">
                     <img src={venom} alt="Team Member" className="mx-aut mb-0 w-60 h-60 rounded-full" />
                     <p className="mt-[-2rem] font-family: 'Nunito' text-dark-orange text-2xl font-semibold">Name</p>
                     </div>

                     <div className="">
                    {/* github  */}
                    <a href="http://" target="_blank"  className="" rel="noopener noreferrer">
                    <img src="https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&amp;logo=github&amp;logoColor=white" alt="github" className="w-full"></img>
                    
                    </a>
                    {/* linkedin  */}
                    <a href="http://" target="_blank"  className="" rel="noopener noreferrer">
                    <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&amp;logo=linkedin&amp;logoColor=white" alt="linkedin" className="w-full"></img>
                    </a>
                    {/* portfolio */}
                    <a href="http://" target="_blank"  className="" rel="noopener noreferrer">
                    <img src="https://img.shields.io/badge/website-d5d5d5?style=for-the-badge&amp;logo=About.me&amp;logoColor=orange" alt="website" className="w-full"></img>
                    </a>
                    </div>
                   </div>
              </div>

            
            
          </div>
        </div>
        
      </div>
    
  </>
);
};

export default About;
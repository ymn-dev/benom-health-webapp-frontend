import React from "react";
import bgAboutUs from "../../assets/bg-about.png";
import venom from "../../assets/venom-about.png";
import venom1 from "../../assets/venom1.webp";
import venom2 from "../../assets/venom2.jpg";
import venom3 from "../../assets/venom3.png";
import venom4 from "../../assets/venom4.png";
import venom5 from "../../assets/venom5.png";
import { Link } from "react-router-dom";


const About = () => {
  const AboutStyle = {
    backgroundImage: `url(${bgAboutUs})`,
  };
  return (
    <>
      <div className="bg-cover bg-center p-10 pb-20" style={AboutStyle}>
        <div className="   text-white flex items-center">
          <div className="w-full md:w-1/2 ">
            <h1 className="text-4xl font-bold font-family: 'Nunito'">About Us</h1>

            <div className="p-4 bg-white bg-opacity-25 rounded-lg mt-4">
              <p className="text-lg font-family: 'Nunito'">
                We are a group of junior software developers #5 of the Generation Thailand project. This application is an integral part of our project-based learning experience. We created this app with the goal of helping both office
                workers and individuals incorporate more exercise into their daily routines.The Benom app combines six types of workouts to cater to your overall physical health. It provides a user-friendly experience, calculating calorie
                counts and MET values with ease. The Benom team sincerely thanks our users for entrusting us as your health partner.
              </p>
              <div className="mt-6 text-center ">
                <h3 className="btn text-white bg-black border">
                  <Link to={"/signin"}>
                  START YOUR JOURNEY WITH BENOM TODAY
                  </Link>
                  </h3>
              </div>
            </div>

            {/* ภาพเวนอม */}
          </div>

          <div className="w-1/2 hidden  md:flex lg:flex ">
            <img src={venom} alt="Venom" className="mx-auto w-250 h-90 mt-0" />
          </div>
        </div>

        {/* // section bottom  */}
        <div className="mt-8">
          <div className="text-start">
            <h3 className="bg-black bg-opacity-50 py-5 pl-10 text-white 2xl:text-4xl sm:text-2xl">Developer Team: วีนุ่มชุบแป้งทอด</h3>
          </div>
          <div className="">
            {/* Team member cards Top */}
            <div className="flex flex-col md:flex-row  justify-center items-center">
              {/* Team member info 1 */}
              <div className="flex justify-center items-center mt-16 md:mt-10 lg:mt-10 md:mr-5">
                <div className="text-center mr-10 md:mr-5">
                  <img src={venom1} alt="Team Member" className="  w-40 h-40 rounded-full" />
                  <p className=" font-family: 'Nunito' text-dark-orange text-2xl font-semibold">Aphisit</p>
                </div>

                <div className="">
                  {/* github  */}
                  <div>
                    <a href="https://github.com/KanomWaan" target="_blank" className="" rel="noopener noreferrer">
                      <img src="https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&amp;logo=github&amp;logoColor=white" alt="github" className="w-full"></img>
                    </a>
                  </div>
                  <div>
                    {/* linkedin  */}
                    <a href="https://www.linkedin.com/in/aphisit-wanit/" target="_blank" className="" rel="noopener noreferrer">
                      <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&amp;logo=linkedin&amp;logoColor=white" alt="linkedin" className="w-full"></img>
                    </a>
                  </div>
                  {/* portfolio */}
                  <div>
                    <a href="https://aphisit-portfolio-kanomwaan.vercel.app/" target="_blank" className="" rel="noopener noreferrer">
                      <img src="https://img.shields.io/badge/website-d5d5d5?style=for-the-badge&amp;logo=About.me&amp;logoColor=orange" alt="website" className="w-full"></img>
                    </a>
                  </div>
                </div>
              </div>

              {/* Team member info 2 */}
              <div className="flex justify-center items-center mt-10 md:mr-5">
                <div className="text-center mr-10 md:mr-5">
                  <img src={venom2} alt="Team Member" className=" w-40 h-40 rounded-full" />
                  <p className=" font-family: 'Nunito' text-dark-orange text-2xl font-semibold">Auckawit</p>
                </div>

                <div className="">
                  {/* github  */}
                  <a href="https://github.com/ymn-dev" target="_blank" className="" rel="noopener noreferrer">
                    <img src="https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&amp;logo=github&amp;logoColor=white" alt="github" className="w-full"></img>
                  </a>
                  {/* linkedin  */}
                  <a href="https://www.linkedin.com/in/sornniyoma/" target="_blank" className="" rel="noopener noreferrer">
                    <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&amp;logo=linkedin&amp;logoColor=white" alt="linkedin" className="w-full"></img>
                  </a>
                  {/* portfolio */}
                  <a href="https://ymn-portfolio.vercel.app/" target="_blank" className="" rel="noopener noreferrer">
                    <img src="https://img.shields.io/badge/website-d5d5d5?style=for-the-badge&amp;logo=About.me&amp;logoColor=orange" alt="website" className="w-full"></img>
                  </a>
                </div>
              </div>

              {/* Team member info 3 */}
              <div className="flex justify-center items-center mt-10">
                <div className="text-center mr-10 md:mr-5">
                  <img src={venom3} alt="Team Member" className=" w-40 h-40 rounded-full" />
                  <p className=" font-family: 'Nunito' text-dark-orange text-2xl font-semibold">Jeniwa</p>
                </div>

                <div className="">
                  {/* github  */}
                  <a href="https://github.com/JeniwaD" target="_blank" className="" rel="noopener noreferrer">
                    <img src="https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&amp;logo=github&amp;logoColor=white" alt="github" className="w-full"></img>
                  </a>
                  {/* linkedin  */}
                  <a href="https://www.linkedin.com/in/jeniwa-dongsang-380012286/" target="_blank" className="" rel="noopener noreferrer">
                    <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&amp;logo=linkedin&amp;logoColor=white" alt="linkedin" className="w-full"></img>
                  </a>
                  {/* portfolio */}
                  <a href="https://portfolio-jeniwa-dongsang.vercel.app/" target="_blank" className="" rel="noopener noreferrer">
                    <img src="https://img.shields.io/badge/website-d5d5d5?style=for-the-badge&amp;logo=About.me&amp;logoColor=orange" alt="website" className="w-full"></img>
                  </a>
                </div>
              </div>
            </div>

            {/* Team member cards bottom */}
            <div className="flex flex-col md:flex-row justify-center items-center">
              {/* Team member info 4 */}
              <div className="flex justify-center items-center mt-10 md:mr-5">
                <div className="text-center mr-10 md:mr-5">
                  <img src={venom4} alt="Team Member" className=" w-40 h-40 rounded-full" />
                  <p className=" font-family: 'Nunito' text-dark-orange text-2xl font-semibold">Kantapon</p>
                </div>

                <div className="">
                  {/* github  */}
                  <a href="https://github.com/KantaKan" target="_blank" className="" rel="noopener noreferrer">
                    <img src="https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&amp;logo=github&amp;logoColor=white" alt="github" className="w-full"></img>
                  </a>
                  {/* linkedin  */}
                  <a href="https://www.linkedin.com/in/kantapon/" target="_blank" className="" rel="noopener noreferrer">
                    <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&amp;logo=linkedin&amp;logoColor=white" alt="linkedin" className="w-full"></img>
                  </a>
                  {/* portfolio */}
                  <a href="https://kantaponportfolio.vercel.app/" target="_blank" className="" rel="noopener noreferrer">
                    <img src="https://img.shields.io/badge/website-d5d5d5?style=for-the-badge&amp;logo=About.me&amp;logoColor=orange" alt="website" className="w-full"></img>
                  </a>
                </div>
              </div>

              {/* Team member info 5 */}
              <div className="flex justify-center items-center mt-10">
                <div className="text-center mr-10 md:mr-5">
                  <img src={venom5} alt="Team Member" className=" w-40 h-40 rounded-full" />
                  <p className=" font-family: 'Nunito' text-dark-orange text-2xl font-semibold">Sukanda</p>
                </div>

                <div className="">
                  {/* github  */}
                  <a href="https://github.com/sukandasaeieo" target="_blank" className="" rel="noopener noreferrer">
                    <img src="https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&amp;logo=github&amp;logoColor=white" alt="github" className="w-full"></img>
                  </a>
                  {/* linkedin  */}
                  <a href="https://www.linkedin.com/in/sukanda-saeieo/" target="_blank" className="" rel="noopener noreferrer">
                    <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&amp;logo=linkedin&amp;logoColor=white" alt="linkedin" className="w-full"></img>
                  </a>
                  {/* portfolio */}
                  <a href="https://portfolio-sukanda.vercel.app/" target="_blank" className="" rel="noopener noreferrer">
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

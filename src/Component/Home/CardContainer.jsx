import React from "react";
import Card from "./Card";
import yogaImgPath from "../../assets/yoga02.jpg";
import cyclingImgPath from "../../assets/cycling.png";
import runningImgPath from "../../assets/running.png";
import calisthenicsImgPath from "../../assets/calisthenics.png";
import swimmingImgPath from "../../assets/swim02.jpg";
import walkingImgPath from "../../assets/walking.png";

const CardContainer = () => {
  return (
    <div className="text-center py-5 bg-dark-blue">
      <h2 className="text-5xl text-white font-bold mb-8 ">Our Courses</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

        <Card
          Name="Yoga"
          Image={yogaImgPath}
          Text="Elevate your well-being with our exceptional yoga classes. Join us for a journey to mindfulness and strength, and experience the best in yoga practice today!"
        />
        <Card
          Name="Cycling"
          Image={cyclingImgPath}
          Text="Ignite your passion for cycling with our dynamic classes. Pedal your way to peak fitness and exhilaration - the ultimate cycling experience awaits!"
        />
        <Card
          Name="Running"
          Image={runningImgPath}
          Text="Lace up and conquer the road with our invigorating running classes. Unleash your full potential with expert guidance - your journey to running excellence begins here!"
        />
        <Card
          Name="Calisthenics"
          Image={calisthenicsImgPath}
          Text="Unlock your body's true strength with our calisthenics classes. Join us to sculpt a powerful, resilient physique and redefine your limits today!"
        />
        <Card
          Name="Swimming"
          Image={swimmingImgPath}
          Text="Dive into greatness with our swimming classes. Experience the water's embrace as you enhance your aquatic skills and fitness - make a splash towards a healthier you!"
        />
        <Card
          Name="Walking"
          Image={walkingImgPath}
          Text="Step into a world of wellness with our walking classes. Embrace the benefits of daily strides and journey towards better health with each step you take!"
        />
      </div>
    </div>
  );
};

export default CardContainer;

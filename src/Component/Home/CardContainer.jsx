import React from "react";
import Card from "./Card";
import yogaImgPath from "../../assets/yoga.png";
import cyclingImgPath from "../../assets/cycling.png";
import runningImgPath from "../../assets/running.png";
import calisthenicsImgPath from "../../assets/calisthenics.png";
import swimmingImgPath from "../../assets/swimming.png";
import walkingImgPath from "../../assets/walking.png";

const CardContainer = () => {
  return (
    <div className="text-center py-8">
      <h2 className="text-6xl text-white font-bold mb-5">Our Courses</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <Card
          Name="Yoga"
          Image={yogaImgPath}
          Text="Train your body, mind and spirit in a studio designed to suit everyone, with 3 different classes, utilizing ancient sciences and knowledge applied to the present"
        />
        <Card
          Name="Cycling"
          Image={cyclingImgPath}
          Text="Train your body, mind and spirit in a studio designed to suit everyone, with 3 different classes, utilizing ancient sciences and knowledge applied to the present"
        />
        <Card
          Name="Running"
          Image={runningImgPath}
          Text="Train your body, mind and spirit in a studio designed to suit everyone, with 3 different classes, utilizing ancient sciences and knowledge applied to the present"
        />
        <Card
          Name="Calisthenics"
          Image={calisthenicsImgPath}
          Text="Train your body, mind and spirit in a studio designed to suit everyone, with 3 different classes, utilizing ancient sciences and knowledge applied to the present"
        />
        <Card
          Name="Swimming"
          Image={swimmingImgPath}
          Text="Train your body, mind and spirit in a studio designed to suit everyone, with 3 different classes, utilizing ancient sciences and knowledge applied to the present"
        />
        <Card
          Name="Walking"
          Image={walkingImgPath}
          Text="Train your body, mind and spirit in a studio designed to suit everyone, with 3 different classes, utilizing ancient sciences and knowledge applied to the present"
        />
      </div>
    </div>
  );
};

export default CardContainer;

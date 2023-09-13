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
    <>
      <h2>Our Courses</h2>
      <div className="cardFlexContainer">
        <Card Name="Yoga" Image={yogaImgPath} Text="Train your body, mind and spirit in a studio designed to suit everyone, with 3 different classes, utilizing ancient sciences and knowledge applied to the present" />
        <Card Name="Cycling" Image={cyclingImgPath} Text="Train your body, mind and spirit in a studio designed to suit everyone, with 3 different classes, utilizing ancient sciences and knowledge applied to the present" />
        <Card Name="Running" Image={runningImgPath} Text="Train your body, mind and spirit in a studio designed to suit everyone, with 3 different classes, utilizing ancient sciences and knowledge applied to the present" />
        <Card Name="Calisthenics" Image={calisthenicsImgPath} Text="Train your body, mind and spirit in a studio designed to suit everyone, with 3 different classes, utilizing ancient sciences and knowledge applied to the present" />
        <Card Name="Swimming" Image={swimmingImgPath} Text="Train your body, mind and spirit in a studio designed to suit everyone, with 3 different classes, utilizing ancient sciences and knowledge applied to the present" />
        <Card Name="Walking" Image={walkingImgPath} Text="Train your body, mind and spirit in a studio designed to suit everyone, with 3 different classes, utilizing ancient sciences and knowledge applied to the present" />
      </div>
    </>
  );
};
export default CardContainer;

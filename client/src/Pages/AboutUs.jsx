import React from "react";
import "./AboutUs.css";
import Card from "../Components/Card";
import card1 from "../assets/Facebook.png";
import sudesh from "../assets/Sudesh.png";
import dilukshan from "../assets/Dilukshan.png"
import card3 from "../assets/Behance.png";

const AboutUs = () => {
  return (
    <div className="aboutCon1">
      <div className="aboutDiv1">
        <h1 className="here_1">So,</h1>
        <h1 className="here_1">
          <span className="silver-gradient">Here </span>
          <span className="green-gradient">We're</span>
        </h1>

        <p className="DescriptionAbout_1">
          We are Computer Engineering undergraduates a at the Lovely Professional  University  and currently I  study in Third  year.
        </p>
      </div>

      <div className="aboutDiv2">
        <div className="box_1">
          <Card className="grayGradient">
            <div className="box1_Up">
              <div className="box_1_up_left">
                <img src={sudesh} alt="SLSAC" className="logo_1" />
              </div>

              <div className="box_1_up_right">
                <div className="box_1_up_right_1">
                  <text className="createrNameinAbout">Sumit Kumar Jha</text>
                </div>

                <div className="box_1_up_right_2">
                  <img src={card1} alt="SLSAC" className="logo_2" />
                  <img src={card3} alt="SLSAC" className="logo_2" />
                </div>
              </div>
            </div>

            <div className="box1_Down">
              <text className="CreaterDescription">
                Designer Developer
                <br /> Computer Engineering Undergraduate
              </text>
            </div>
          </Card>
        </div>

        
      </div>
    </div>
  );
};

export default AboutUs;

// src/components/About.jsx
import React from 'react';
import './About.css';
import BlurText from "./BlurText";

const handleAnimationComplete = () => {
  console.log('Animation completed!');
};


const About = ({id}) => {
  return (
    <section className="about-section" id={id}>
      <BlurText
        text="Hii 👋, My name is Ashish Biradar"
        delay={150}
        animateBy="words"
        direction="top"
        onAnimationComplete={handleAnimationComplete}
        className="about-greeting"
      />
      <div className="about-stack">
      Full Stack Developer & AI Engineer
      </div>
      {/* <div className="image-background-container"> */}
      <div className="about-image-container">
        <img src="projects_images/profilePhoto.jpg" alt="Profile" className="about-image" />
        {/* <img src="/imageBackg.png" alt="" className="backg-profile" /> */}
      </div>
      {/* </div> */}

      <div className="about-title">About Me</div>
      <p className="about-description">
        I’m a Computer Engineering student who enjoys building projects in Artificial Intelligence, Full-Stack Development, and Cloud Computing. I have experience developing AI-powered applications, web solutions, and software systems, with a focus on creating practical and impactful technology. Writing clean, efficient code and building user-friendly applications are at the core of my development approach.
      </p>

      <p className="about-description">
        I’m constantly learning and exploring new technologies, strengthening my skills in Software Development, Data Structures & Algorithms, Machine Learning, and Cloud Technologies. I enjoy taking on challenging projects that help me grow as a developer and create meaningful solutions.
      </p>
    </section>
  );
};

export default About;

// src/components/Journey/Journey.jsx
import React, { useState } from "react";
import { 
  FaBookOpen, FaTrophy, FaBrain, FaCheckCircle, 
  FaRegCircle, FaFlag, FaAward, FaRocket 
} from "react-icons/fa";
import "./Journey.css";

const Journey = ({ id }) => {
  const [selectedYear, setSelectedYear] = useState(2); // Second year is selected by default

  const handleMouseEnter = (year) => {
    setSelectedYear(year);
  };

  const renderIllustration = (type) => {
    switch (type) {
      case "first-year":
        return (
          <svg viewBox="0 0 100 100" className="journey-illustration-svg">
            <rect x="10" y="15" width="80" height="52" rx="6" fill="none" stroke="#1D3557" strokeWidth="2.5" />
            <path d="M 40 67 L 32 82 L 68 82 L 60 67 Z" fill="#1D3557" />
            <rect x="15" y="20" width="70" height="42" rx="2" fill="#E8F1F2" />
            <text x="29" y="48" fill="#E63946" fontSize="20" fontWeight="bold" fontFamily="monospace">&lt;/&gt;</text>
            <line x1="20" y1="26" x2="38" y2="26" stroke="#457B9D" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="20" y1="32" x2="60" y2="32" stroke="#A8DADC" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        );
      case "second-year":
        return (
          <svg viewBox="0 0 100 100" className="journey-illustration-svg">
            <rect x="10" y="15" width="80" height="65" rx="6" fill="#ffffff" stroke="#1D3557" strokeWidth="2.5" />
            <rect x="10" y="15" width="80" height="14" rx="6" fill="#E63946" opacity="0.15" />
            <line x1="10" y1="29" x2="90" y2="29" stroke="#1D3557" strokeWidth="2" />
            <circle cx="17" cy="22" r="2" fill="#E63946" />
            <circle cx="23" cy="22" r="2" fill="#457B9D" />
            <circle cx="29" cy="22" r="2" fill="#A8DADC" />
            <rect x="16" y="36" width="28" height="20" rx="3" fill="#E63946" opacity="0.08" stroke="#E63946" strokeWidth="1.2" />
            <rect x="20" y="41" width="20" height="2.5" rx="0.5" fill="#E63946" />
            <rect x="20" y="47" width="10" height="2.5" rx="0.5" fill="#E63946" />
            <rect x="50" y="36" width="34" height="4" rx="1" fill="#1D3557" />
            <rect x="50" y="44" width="26" height="3" rx="1" fill="#457B9D" />
            <rect x="50" y="51" width="16" height="3" rx="1" fill="#A8DADC" />
            <rect x="16" y="66" width="68" height="8" rx="2.5" fill="#A8DADC" opacity="0.3" />
          </svg>
        );
      case "third-year":
        return (
          <svg viewBox="0 0 100 100" className="journey-illustration-svg">
            <rect x="25" y="46" width="50" height="12" rx="3" fill="#ffffff" stroke="#1D3557" strokeWidth="2" />
            <circle cx="33" cy="52" r="2" fill="#E63946" />
            <line x1="42" y1="52" x2="68" y2="52" stroke="#457B9D" strokeWidth="2" strokeDasharray="3 2" />
            
            <rect x="25" y="63" width="50" height="12" rx="3" fill="#ffffff" stroke="#1D3557" strokeWidth="2" />
            <circle cx="33" cy="69" r="2" fill="#457B9D" />
            <line x1="42" y1="69" x2="68" y2="69" stroke="#457B9D" strokeWidth="2" strokeDasharray="3 2" />
            
            <rect x="25" y="80" width="50" height="12" rx="3" fill="#ffffff" stroke="#1D3557" strokeWidth="2" />
            <circle cx="33" cy="86" r="2" fill="#A8DADC" />
            <line x1="42" y1="86" x2="68" y2="86" stroke="#457B9D" strokeWidth="2" strokeDasharray="3 2" />

            <path d="M 36 32 A 8 8 0 0 1 54 28 A 11 11 0 0 1 72 32 A 8 8 0 0 1 66 45 L 36 45 A 7 7 0 0 1 36 32 Z" fill="none" stroke="#1D3557" strokeWidth="2.5" strokeLinejoin="round" />
            <path d="M 32 37 A 5 5 0 0 1 43 34 A 8 8 0 0 1 59 37 L 59 42 L 32 42 Z" fill="#A8DADC" opacity="0.3" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <section className="journey-section" id={id}>
      <div className="journey-header">
        <h2 className="journey-title">My Journey</h2>
        <p className="journey-subtitle">From learning the fundamentals to building real-world software.</p>
      </div>

      {/* Year Timeline Selector */}
      <div className="journey-timeline-container">
        <div className="journey-timeline-line" />
        
        <div className="journey-timeline-nodes">
          {/* First Year Node */}
          <button 
            className={`journey-node ${selectedYear === 1 ? "active" : "completed"}`}
            onClick={() => setSelectedYear(1)}
            aria-label="First Year: Foundations (2024 - 2025)"
          >
            <div className="node-circle">
              <FaBookOpen />
            </div>
            <span className="node-label">First Year</span>
            <span className="node-date">2024 – 2025</span>
          </button>

          {/* Second Year Node */}
          <button 
            className={`journey-node ${selectedYear === 2 ? "active" : selectedYear > 2 ? "completed" : "future"}`}
            onClick={() => setSelectedYear(2)}
            aria-label="Second Year: Building (2025 - 2026)"
          >
            <div className="node-circle">
              <FaTrophy />
            </div>
            <span className="node-label">Second Year</span>
            <span className="node-date">2025 – 2026</span>
          </button>

          {/* Third Year Node */}
          <button 
            className={`journey-node ${selectedYear === 3 ? "active" : "future"}`}
            onClick={() => setSelectedYear(3)}
            aria-label="Third Year: Current Focus (2026 - Present)"
          >
            <div className="node-circle">
              <FaBrain />
            </div>
            <span className="node-label">Third Year</span>
            <span className="node-date">2026 – Present</span>
          </button>
        </div>
      </div>

      {/* Journey Cards Container */}
      <div className="journey-cards-container">
        {/* Card 1: First Year */}
        <div 
          className={`journey-card ${selectedYear === 1 ? "active" : ""}`}
          onMouseEnter={() => handleMouseEnter(1)}
        >
          {/* Top section flex row: content aligned left, small SVG aligned right */}
          <div className="journey-card-header-row">
            <div className="journey-card-header-left">
              <span className="journey-card-badge badge-1">FIRST YEAR</span>
              <span className="journey-card-dates">2024 – 2025</span>
              <p className="journey-card-summary">"Built the foundation of my software development journey."</p>
            </div>
            <div className="journey-card-header-right">
              {renderIllustration("first-year")}
            </div>
          </div>

          {/* Bottom section: full width lists */}
          <div className="journey-card-body">
            <div className="journey-milestones-block">
              <h5 className="block-title">
                <FaFlag className="block-title-icon" />
                MILESTONES
              </h5>
              <ul className="milestone-list">
                <li className="milestone-item">
                  <FaCheckCircle className="milestone-icon completed" />
                  <span className="milestone-text">Started with C++</span>
                </li>
                <li className="milestone-item">
                  <FaCheckCircle className="milestone-icon completed" />
                  <span className="milestone-text">Started Web Development</span>
                </li>
                <li className="milestone-item">
                  <FaCheckCircle className="milestone-icon completed" />
                  <span className="milestone-text">Built my first web project</span>
                </li>
                <li className="milestone-item">
                  <FaCheckCircle className="milestone-icon completed" />
                  <span className="milestone-text">Started using Git and GitHub</span>
                </li>
              </ul>
            </div>

            <div className="journey-achievements-block">
              <h5 className="block-title">
                <FaAward className="block-title-icon" />
                ACHIEVEMENTS
              </h5>
              <div className="achievements-list">
                <div className="achievement-item">
                  <div className="achievement-icon-wrapper">
                    <FaTrophy />
                  </div>
                  <span className="achievement-text">Won Datathon 2025</span>
                </div>
                <div className="achievement-item">
                  <div className="achievement-icon-wrapper">
                    <FaAward />
                  </div>
                  <span className="achievement-text">Received an internship offer from Preskilet</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: Second Year */}
        <div 
          className={`journey-card ${selectedYear === 2 ? "active" : ""}`}
          onMouseEnter={() => handleMouseEnter(2)}
        >
          <div className="journey-card-header-row">
            <div className="journey-card-header-left">
              <span className="journey-card-badge badge-2">SECOND YEAR</span>
              <span className="journey-card-dates">2025 – 2026</span>
              <p className="journey-card-summary">"Moved from learning the basics to building real applications."</p>
            </div>
            <div className="journey-card-header-right">
              {renderIllustration("second-year")}
            </div>
          </div>

          <div className="journey-card-body">
            <div className="journey-milestones-block">
              <h5 className="block-title">
                <FaFlag className="block-title-icon" />
                MILESTONES
              </h5>
              <ul className="milestone-list">
                <li className="milestone-item">
                  <FaCheckCircle className="milestone-icon completed" />
                  <span className="milestone-text">Completed Web Development & MERN Stack</span>
                </li>
                <li className="milestone-item">
                  <FaCheckCircle className="milestone-icon completed" />
                  <span className="milestone-text">Focused heavily on Data Structures and Algorithms</span>
                </li>
                <li className="milestone-item">
                  <FaCheckCircle className="milestone-icon completed" />
                  <span className="milestone-text">Studied Computer Networks</span>
                </li>
                <li className="milestone-item">
                  <FaCheckCircle className="milestone-icon completed" />
                  <span className="milestone-text">Completed Harvard CS50 certification</span>
                </li>
                <li className="milestone-item">
                  <FaCheckCircle className="milestone-icon completed" />
                  <span className="milestone-text">Built 10+ projects</span>
                </li>
              </ul>
            </div>

            <div className="journey-areas-block">
              <h5 className="block-title">
                <FaRocket className="block-title-icon" />
                AREAS
              </h5>
              <div className="areas-grid">
                <span className="area-badge">MERN Stack</span>
                <span className="area-badge">DSA</span>
                <span className="area-badge">Networks</span>
                <span className="area-badge">CS50</span>
                <span className="area-badge">Full-Stack</span>
              </div>
            </div>
          </div>
        </div>

        {/* Card 3: Third Year */}
        <div 
          className={`journey-card ${selectedYear === 3 ? "active" : ""}`}
          onMouseEnter={() => handleMouseEnter(3)}
        >
          <div className="journey-card-header-row">
            <div className="journey-card-header-left">
              <span className="journey-card-badge badge-3">THIRD YEAR</span>
              <span className="journey-card-dates">2026 – Present</span>
              <p className="journey-card-summary">"Expanding my knowledge into systems, AI, and infrastructure."</p>
            </div>
            <div className="journey-card-header-right">
              {renderIllustration("third-year")}
            </div>
          </div>

          <div className="journey-card-body">
            <div className="journey-milestones-block">
              <h5 className="block-title">
                <FaBrain className="block-title-icon" />
                CURRENT FOCUS
              </h5>
              <ul className="milestone-list">
                <li className="milestone-item">
                  <FaRegCircle className="milestone-icon future" />
                  <span className="milestone-text">Linux Command Line & Shell Scripting</span>
                </li>
                <li className="milestone-item">
                  <FaRegCircle className="milestone-icon future" />
                  <span className="milestone-text">Artificial Intelligence & Machine Learning</span>
                </li>
                <li className="milestone-item">
                  <FaRegCircle className="milestone-icon future" />
                  <span className="milestone-text">Operating Systems & Kernels</span>
                </li>
                <li className="milestone-item">
                  <FaRegCircle className="milestone-icon future" />
                  <span className="milestone-text">Cloud Computing & AWS</span>
                </li>
              </ul>
            </div>

            <div className="journey-note-block">
              <div className="note-box">
                <FaRocket className="note-box-icon" />
                <span className="note-box-text">This is my current learning journey. More to come!</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Journey;

import React from 'react';
import './DTLogo.css';

const DTLogo: React.FC = () => {
  return (
    <div className="dt-logo-wrapper" role="img" aria-label="DT Prompt Institutional Logo">
      {/* 3D Deep Orbital System */}
      <div className="orbit-container">
        <div className="orbit-dot dot-primary"></div>
        <div className="orbit-dot dot-secondary"></div>
      </div>

      {/* V601.24 Snake Neon Boundary Layer */}
      <div className="dt-snake-container">
        <svg className="dt-snake-svg" viewBox="0 0 340 240">
          <text
            x="50%"
            y="48%"
            textAnchor="middle"
            dominantBaseline="middle"
            className="dt-snake-path"
            style={{
              fontSize: '140px',
              fontWeight: 950,
              fontFamily: 'Cairo, sans-serif',
              letterSpacing: '-2px'
            }}
          >
            DT
          </text>
        </svg>
      </div>
      
      {/* High-Fidelity Text Core */}
      <div className="dt-main-text">DT</div>
      
      {/* Centered Sub-branding */}
      <div className="dt-sub-text">Prompt</div>
    </div>
  );
};

export default DTLogo;
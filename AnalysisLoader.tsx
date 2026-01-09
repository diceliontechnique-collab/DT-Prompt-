
import React from 'react';
import './AnalysisLoader.css';

const AnalysisLoader: React.FC = () => {
  return (
    <div className="analysis-loader-capsule" role="status" aria-label="جاري التحليل المجهري">
      <div className="analysis-loader-beam"></div>
      <span className="analysis-loader-text">جاري التحليل المجهري...</span>
    </div>
  );
};

export default AnalysisLoader;


import React, { useState, useEffect } from 'react';

const MatrixStatus: React.FC = () => {
  const [code, setCode] = useState("");

  useEffect(() => {
    const chars = "01ABCDEF";
    const interval = setInterval(() => {
      let str = "";
      for (let i = 0; i < 60; i++) {
        str += chars[Math.floor(Math.random() * chars.length)];
      }
      setCode(str);
    }, 60);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center bg-black z-0">
      <div className="font-mono text-[10px] text-[#00FF41] opacity-30 whitespace-nowrap animate-matrix-rtl-fast flex gap-4">
        <span>{code}</span>
        <span>{code}</span>
        <span>{code}</span>
        <span>{code}</span>
        <span>{code}</span>
      </div>
    </div>
  );
};

export default MatrixStatus;

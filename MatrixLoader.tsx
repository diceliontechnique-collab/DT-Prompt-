
import React, { useState, useEffect, useRef } from 'react';
import './MatrixLoader.css';

const MatrixLoader: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // منطق العداد التقدمي
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev < 99 ? prev + 1 : 99));
    }, 40);
    return () => clearInterval(interval);
  }, []);

  // محرك المطر الرقمي (Matrix Rain Engine)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // ضبط أبعاد الكانفاس
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();

    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = new Array(columns).fill(1);

    const draw = () => {
      // خلفية شبه شفافة لخلق تأثير التلاشي (Tail effect)
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#0f0'; // لون الأكواد
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        // اختيار عشوائي بين 0 و 1
        const text = Math.random() > 0.5 ? "0" : "1";
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // إعادة التعيين إذا وصل السطر للنهاية أو عشوائياً
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i]++;
      }
    };

    const animationId = setInterval(draw, 50);

    window.addEventListener('resize', resize);
    return () => {
      clearInterval(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div className="matrix-loader-container" role="status" aria-label="تحليل الأكواد البرمجية السيادي">
      <canvas ref={canvasRef} className="matrix-rain-canvas" />
      <div className="matrix-content-wrapper">
        <span className="matrix-text-main">جاري تحليل الأكواد البرمجية</span>
        <span className="matrix-counter">{progress}%</span>
      </div>
    </div>
  );
};

export default MatrixLoader;

import { useState, useEffect, useRef } from 'react';

const Sparkles = ({ children }) => {
  const [sparkles, setSparkles] = useState([]);
  const containerRef = useRef(null);

  useEffect(() => {
    const generateSparkle = () => ({
      id: Math.random(),
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 10 + 5,
      delay: Math.random() * 2,
    });

    const interval = setInterval(() => {
      setSparkles((prev) => {
        const newSparkles = [...prev, generateSparkle()].slice(-20);
        return newSparkles;
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const cleanup = setTimeout(() => {
      setSparkles((prev) => prev.slice(1));
    }, 3000);

    return () => clearTimeout(cleanup);
  }, [sparkles]);

  return (
    <div ref={containerRef} className="relative inline-block">
      {sparkles.map((sparkle) => (
        <div
          key={sparkle.id}
          className="pointer-events-none absolute animate-ping"
          style={{
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
            width: `${sparkle.size}px`,
            height: `${sparkle.size}px`,
            animationDelay: `${sparkle.delay}s`,
          }}
        >
          ✨
        </div>
      ))}
      {children}
    </div>
  );
};

export default Sparkles;

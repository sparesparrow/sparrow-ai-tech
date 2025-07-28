/** @jsx React.createElement */
import React from 'react';

const SPARKLE_COUNT = 20;

function random(min, max) {
  return Math.random() * (max - min) + min;
}

function createSparkle() {
  return {
    id: Math.random().toString(36).substring(2, 11),
    top: random(0, 100),
    left: random(0, 100),
    size: random(8, 18),
    duration: random(2, 4),
    delay: random(0, 2),
  };
}

export default function Sparkles({ children }) {
  const sparkles = useRef(Array.from({ length: SPARKLE_COUNT }, createSparkle));

  return (
    <div className="sparkles-wrapper" style={{ position: 'relative', display: 'inline-block' }}>
      {children}
      {sparkles.current.map((sparkle) => (
        <span
          key={sparkle.id}
          className="sparkle"
          style={{
            position: 'absolute',
            top: `${sparkle.top}%`,
            left: `${sparkle.left}%`,
            width: sparkle.size,
            height: sparkle.size,
            pointerEvents: 'none',
            animation: `sparkle-fade ${sparkle.duration}s linear ${sparkle.delay}s infinite`,
            opacity: 0.8,
            zIndex: 2,
          }}
        >
          <svg width={sparkle.size} height={sparkle.size} viewBox="0 0 20 20" fill="none">
            <polygon
              points="10,0 12,7 19,7 13,11 15,18 10,14 5,18 7,11 1,7 8,7"
              fill="#fff8c6"
              stroke="#ffe066"
              strokeWidth="0.5"
            />
          </svg>
        </span>
      ))}
      <style>{`
        @keyframes sparkle-fade {
          0% { opacity: 0; transform: scale(0.7) rotate(0deg); }
          10% { opacity: 1; transform: scale(1) rotate(10deg); }
          90% { opacity: 1; transform: scale(1) rotate(-10deg); }
          100% { opacity: 0; transform: scale(0.7) rotate(0deg); }
        }
        .sparkle {
          filter: drop-shadow(0 0 4px #ffe066);
          transition: opacity 0.2s;
        }
      `}</style>
    </div>
  );
}

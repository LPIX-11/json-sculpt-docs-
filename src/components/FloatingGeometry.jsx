import React, { useMemo } from 'react';
import { colors } from '../theme';

export const FloatingGeometry = () => {
  const shapes = useMemo(() => {
    return Array.from({ length: 20 }).map((_, i) => {
      const shapeTypes = ['diamond', 'circle', 'dot'];
      const type = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];
      const size = Math.random() * 40 + 20;
      const left = Math.random() * 100;
      const top = Math.random() * 100;
      const duration = Math.random() * 3 + 3;
      const delay = Math.random() * 2;
      const opacity = Math.random() * 0.5 + 0.2;

      return {
        id: i,
        type,
        size,
        left,
        top,
        duration,
        delay,
        opacity,
      };
    });
  }, []);

  const containerStyles = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    overflow: 'hidden',
  };

  const renderShape = (shape) => {
    const baseStyle = {
      position: 'absolute',
      left: `${shape.left}%`,
      top: `${shape.top}%`,
      opacity: shape.opacity,
      animation: `floatGeo ${shape.duration}s ease-in-out ${shape.delay}s infinite`,
    };

    if (shape.type === 'diamond') {
      return (
        <div
          key={shape.id}
          style={{
            ...baseStyle,
            width: shape.size,
            height: shape.size,
            transform: 'rotate(45deg)',
            border: `2px solid rgba(212, 168, 67, 0.3)`,
          }}
        />
      );
    }

    if (shape.type === 'circle') {
      return (
        <div
          key={shape.id}
          style={{
            ...baseStyle,
            width: shape.size,
            height: shape.size,
            borderRadius: '50%',
            border: `2px solid rgba(212, 168, 67, 0.3)`,
          }}
        />
      );
    }

    return (
      <div
        key={shape.id}
        style={{
          ...baseStyle,
          width: shape.size / 2,
          height: shape.size / 2,
          borderRadius: '50%',
          backgroundColor: 'rgba(212, 168, 67, 0.4)',
        }}
      />
    );
  };

  return (
    <>
      <style>{`
        @keyframes floatGeo {
          0% {
            transform: translate(0, 0);
            opacity: 0;
          }
          10% {
            opacity: var(--shape-opacity);
          }
          90% {
            opacity: var(--shape-opacity);
          }
          100% {
            transform: translate(-10px, -30px);
            opacity: 0;
          }
        }
      `}</style>
      <div style={containerStyles}>
        {shapes.map((shape) => renderShape(shape))}
      </div>
    </>
  );
};

export default FloatingGeometry;

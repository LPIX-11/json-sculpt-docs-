import React, { useState, useEffect, useRef } from 'react';
import { colors, fonts } from '../theme';

export const StatCounter = ({ value, label, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const observerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.5 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    let currentCount = 0;
    const step = Math.ceil(value / 35);
    const interval = 30;

    const timer = setInterval(() => {
      currentCount += step;
      if (currentCount >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(currentCount);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [hasStarted, value]);

  return (
    <div
      ref={observerRef}
      style={{
        textAlign: 'center',
        padding: '24px 0',
      }}
    >
      <div
        style={{
          fontSize: 48,
          fontWeight: 700,
          color: colors.goldBright,
          lineHeight: 1,
          marginBottom: 8,
          fontFamily: fonts.sans,
          letterSpacing: '-1px',
        }}
      >
        {count}
        {suffix}
      </div>
      <p
        style={{
          fontSize: 12,
          fontWeight: 600,
          color: colors.mutedText,
          letterSpacing: '1.5px',
          textTransform: 'uppercase',
          fontFamily: fonts.sans,
        }}
      >
        {label}
      </p>
    </div>
  );
};

export default StatCounter;

import React from 'react';
import { colors } from '../theme';

export const Divider = () => {
  return (
    <div
      style={{
        width: 180,
        height: 2,
        margin: '40px auto',
        borderRadius: 1,
        background: `linear-gradient(90deg, transparent, ${colors.gold}, transparent)`,
        opacity: 0.6,
      }}
    />
  );
};

export default Divider;

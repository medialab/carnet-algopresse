import React from 'react';

export default function ControlButton({children, onClick}) {
  return (
    <button className="control-button" onClick={onClick}>
      {children}
    </button>
  );
}
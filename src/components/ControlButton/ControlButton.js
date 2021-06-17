import React from 'react';

export default function ControlButton({children, onClick, ...props}) {
  return (
    <button className="control-button" onClick={onClick} {...props}>
      {children}
    </button>
  );
}
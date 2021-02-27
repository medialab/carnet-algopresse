
import React from 'react';

export default function ColorLegend ({
  colorPalette
}) {
  return (
    <ul className="ColorLegend">
      {
        Object.entries(colorPalette)
        .map(([modality, color]) => (
          <li key={modality}>
            <span className="legend-color" style={{background: color}} />
            <span className="legend-modality">{modality}</span>
          </li>
        ))
      }
    </ul>
  );
}
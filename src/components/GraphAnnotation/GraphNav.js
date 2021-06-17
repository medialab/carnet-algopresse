import React from 'react';
import cx from 'classnames';

import ControlButton from '../ControlButton';

import eye from './icons/magnifier-with-an-eye.svg';
import plus from './icons/add-searching.svg';
import minus from './icons/delete-searching.svg';
import activate from './icons/validate-search.svg';
import deactivate from './icons/magnifier-and-delete-mark.svg';

export default function GraphNav({
  rescale,
  zoomIn,
  zoomOut,
  isLocked,
  onToggleLock
}) {
  return (
    <ul className={cx("GraphNav", {'is-expanded': !isLocked})}>
      
      <li className="vis-controls-item">

        <ControlButton title={'dézoomer dans la vue'} disabled={isLocked} onClick={zoomOut}>
          <img alt="btn-icon" src={minus} />
        </ControlButton>
      </li>
      <li className="vis-controls-item">
        <ControlButton title={'zoomer dans la vue'} disabled={isLocked} onClick={zoomIn}>
          <img alt="btn-icon" src={plus} />
        </ControlButton>
      </li>
      <li className="vis-controls-item">
        <ControlButton title={'recentrer la vue'} disabled={isLocked} onClick={rescale}>
          <img alt="btn-icon" src={eye} />
        </ControlButton>
      </li>
      <li className="vis-controls-item">
        <ControlButton title={isLocked ? 'permettre la navigation dans le graphe' : 'bloquer la navigation dans le graphe'} onClick={onToggleLock}>
          {isLocked ? <img alt="btn-icon" src={activate} /> : <img alt="btn-icon" src={deactivate} />}
        </ControlButton>
      </li>
      
    </ul>
  );
}
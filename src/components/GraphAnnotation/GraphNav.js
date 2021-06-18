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
  onToggleLock,
  lang
}) {
  let lockMessage = isLocked ? 'permettre la navigation dans le graphe' : 'bloquer la navigation dans le graphe';
  if (lang !== 'en') {
    lockMessage = isLocked ? 'enable navigation' : 'disable navigation';
  }
  return (
    <ul className={cx("GraphNav", {'is-expanded': !isLocked})}>
      
      <li className="vis-controls-item">

        <ControlButton title={lang === 'fr' ? 'dézoomer dans la vue' : 'unzoom'} disabled={isLocked} onClick={zoomOut}>
          <img alt="btn-icon" src={minus} />
        </ControlButton>
      </li>
      <li className="vis-controls-item">
        <ControlButton title={lang === 'fr' ? 'zoomer dans la vue' : 'zoom'} disabled={isLocked} onClick={zoomIn}>
          <img alt="btn-icon" src={plus} />
        </ControlButton>
      </li>
      <li className="vis-controls-item">
        <ControlButton title={lang === 'fr' ? 'recentrer la vue' : 'recenter'} disabled={isLocked} onClick={rescale}>
          <img alt="btn-icon" src={eye} />
        </ControlButton>
      </li>
      <li className="vis-controls-item">
        <ControlButton title={lockMessage} onClick={onToggleLock}>
          {isLocked ? <img alt="btn-icon" src={activate} /> : <img alt="btn-icon" src={deactivate} />}
        </ControlButton>
      </li>
      
    </ul>
  );
}
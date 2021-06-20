import React from 'react';
import cx from 'classnames';

export default function ControlButton({children, onClick, isActive, ...props}) {
  return (
    <button className={cx("control-button", {'is-active': isActive})} onClick={onClick} {...props}>
      {children}
    </button>
  );
}
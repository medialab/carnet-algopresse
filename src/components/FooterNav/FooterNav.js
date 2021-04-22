import React from 'react';
import { Link } from 'react-router-dom';
import cx from 'classnames'

const FooterNav = ({
  prevPage,
  nextPage
}) => {
  return (
    <footer className={cx("FooterNav", {'start-page': !prevPage})}>
      <ul>
        {
          prevPage ?
            <li className="previous-page">
              <h5>
                <Link to={prevPage.route}>
                  <div className="marker">{'<'}</div>
                  <div className="page-content">
                    <div className="page-label"><i>Page précédente</i></div>
                    <div>
                        {prevPage.title}
                    </div>
                  </div>
                </Link>
              </h5>
            </li>
            :
            null
        }
        {
          nextPage ?
            <li className="next-page">
              <h5>
                <Link to={nextPage.route}>
                  <div>
                    <div className="page-label"><i>Page suivante</i></div>
                    <div className="page-content">
                        {nextPage.title}
                    </div>
                  </div>
                  <div className="marker">{'>'}</div>
                </Link>
              </h5>
            </li>
            :
            null
        }
      </ul>
    </footer>
  )
}

export default FooterNav;
import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import {LanguageContext} from '../../contexts';
import cx from 'classnames';

const FooterNav = ({
  prevPage,
  nextPage
}) => {
  const {
    lang
  } = useContext(LanguageContext);
  const messages = {
    next: {
      fr: 'Page suivante',
      en: 'Next page'
    },
    prev: {
      fr: 'Page précédente',
      en: 'Previous page'
    }
  }
  return (
    <footer className={cx("FooterNav", {'start-page': !prevPage})}>
      <ul>
        {
          prevPage ?
            <li className="previous-page">
              <h5>
                <Link to={prevPage.route[lang]}>
                  <div className="marker">{'<'}</div>
                  <div className="page-content">
                    <div className="page-label"><i>{messages.prev[lang]}</i></div>
                    <div>
                        {prevPage.title[lang]}
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
                <Link to={nextPage.route[lang]}>
                  <div>
                    <div className="page-label"><i>{messages.next[lang]}</i></div>
                    <div className="page-content">
                        {nextPage.title[lang]}
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
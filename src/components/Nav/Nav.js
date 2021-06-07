import cx from 'classnames';


const Nav = ({
  lang, 
  routes,
  onRouteNav,
  isDeployed,
  activeSectionIndex
}) => {
  return (
    <nav className={cx('Nav', {'is-deployed': isDeployed})}>
      <ul>
        {
          routes.map((route, routeIndex) => {
            const handleClick = () => {
              onRouteNav(routeIndex);
            }
            return (
              <li className={cx({'is-active': activeSectionIndex === routeIndex})} onClick={handleClick} key={routeIndex}>
                <span className="item-number">{routeIndex}</span>
                <span className="item-label">
                  <span>{route.title[lang]}</span>
                </span>
              </li>
            )
          })
        }
      </ul>
    </nav>
  )
}

export default Nav;
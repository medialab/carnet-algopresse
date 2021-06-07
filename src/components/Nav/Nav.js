


const Nav = ({
  lang, 
  routes,
  onRouteNav
}) => {
  return (
    <nav>
      <ul>
        {
          routes.map((route, routeIndex) => {
            const handleClick = () => {
              onRouteNav(routeIndex);
            }
            return (
              <li onClick={handleClick} key={routeIndex}>
                <span className="number-marker">{routeIndex}</span> {route.title[lang]}
              </li>
            )
          })
        }
      </ul>
    </nav>
  )
}

export default Nav;
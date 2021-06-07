


const Nav = ({lang, routes}) => {
  return (
    <nav>
      <ul>
        {
          routes.map((route, routeIndex) => {
            return (
              <li key={routeIndex}>
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
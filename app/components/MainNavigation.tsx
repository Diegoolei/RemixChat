import { NavLink } from '@remix-run/react';
import { LinksFunction } from '@remix-run/node';

import MainNavigationStyle from './MainNavigation.css?url';

function MainNavigation() {
  return (
    <nav id="main-navigation">
      <ul>
        <li className="nav-item">
          <NavLink to="/">Home</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/chats">Chats</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default MainNavigation;


export const links: LinksFunction = () => [
  { rel: "stylesheet", href: MainNavigationStyle },
];
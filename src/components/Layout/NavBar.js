import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {isAuthenticated && (
          <li>
            <Link to="/profile">Profile</Link>
          </li>
        )}
        <li>
          {!isAuthenticated ? (
            <button onClick={() => loginWithRedirect()}>Login</button>
          ) : (
            <button onClick={() => logout({ returnTo: window.location.origin })}>Logout</button>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;

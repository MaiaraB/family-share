import React from 'react';
import { Link } from 'react-router-dom';

const AuthenticatedApp = () => {

  return (
    <ul>
      <li>
        <Link to="/">Calendar</Link>
      </li>
      <li>
        <Link to="/new">New task</Link>
      </li>
    </ul>
  );
};

export default AuthenticatedApp;
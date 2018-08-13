import React from "react";
import { Link } from "react-router-dom";
import * as routes from "../constants/routes";
import HashFunction from "../helpers/HashFunction";

const Navbar = () => {
  let copied = false;
  return (
    <nav id="navbar">
      <li className="nav-item">
        <Link to={routes.HOME}>Home</Link>
      </li>
      <li className="nav-item">
        <Link to={routes.LOBBY}>Lobby</Link>
      </li>
      <li className="nav-item">
        <Link to={`/room/${HashFunction()}`}>Random Room</Link>
      </li>
    </nav>
  );
};

export default Navbar;

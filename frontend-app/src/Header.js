import React from "react";
import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <HeaderNavItem exact to="/" name="Goodies" />
      <HeaderNavItem to="/about" name="About" />
      <HeaderNavItem to="/contact" name="Contact" />
      <HeaderNavItem to="/SellerSignup" name="Seller signup" />
      <HeaderNavItem to="/SellerLogin" name="Seller Login" />
    </header>
  );
}

function HeaderNavItem(props) {
  return (
    <NavLink
      to={props.to}
      className="nav-item"
      exact={props.exact ? true : false}
      activeClassName="active"
    >
      {props.name}
    </NavLink>
  );
}

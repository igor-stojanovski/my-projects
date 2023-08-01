import React from "react";
import { NavLink } from "react-router-dom";

type Props = {};

export default function Navbar({}: Props) {
  return (
    <NavLink to={"/"} className="text-decoration-none">
      <div className="Navbar">
        <div className="overlay">
          <h1>Music DB</h1>
        </div>
      </div>
    </NavLink>
  );
}

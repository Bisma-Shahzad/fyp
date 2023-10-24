import React, { useState } from "react";

import "./Navbar.css";
import { Link, NavLink } from "react-router-dom";
import SearchBargpt from "../Searchbar/searchbargpt";

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchProd, setSearchProd] = useState('');
  const handleSearch = (text) => {
    setSearchProd(text)
};

  return (
    <nav>
      <Link to="/" className="title">
        WHEEL CONNECT
      </Link>
      <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className="search-bar">
      <SearchBargpt label="Search cars" onSearch={handleSearch} />
      </div>
      <ul className={menuOpen ? "open" : ""}>
        <li>
          <NavLink to="/about">About</NavLink>
        </li>
        <li>
          <NavLink to="/services">Services</NavLink>
        </li>
        <li>
          <NavLink to="/contact">Contact</NavLink>
        </li>
      </ul>
    </nav>
  );
};
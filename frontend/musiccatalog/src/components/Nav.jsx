import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
const NavBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const performSearch = () => {
    console.log('Search Term:', searchTerm);
  };
  return (
    <nav className="navbar">
      <div className="home-link">
        <Link to="/">Home</Link>
      </div>
      <div className="search-section">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <button type="button" onClick={performSearch}>Search</button>
      </div>
      <div className="nav-links">
        <Link to="/artists">Artists</Link>
        <Link to="/albums">Albums</Link>
        <Link to="/genres">Genres</Link>
      </div>
      <div className="profile-section">
        {isAuthenticated ? (
          <>
            <span>Welcome, {user.name}</span>
            <Link to="/logout">Logout</Link>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
};
export default NavBar;
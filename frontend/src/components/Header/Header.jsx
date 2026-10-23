import React, { useState, useRef, useEffect } from "react";
import { NavLink, Link, Outlet, useLocation } from "react-router-dom";
import { motion } from "motion/react";
import { getProfile, logoutProfile } from "../../services/profile";
import { searchUsers } from "../../services/searchusers";
import logoSvg from "../../assets/logo.svg";
import {
  Home,
  Code2,
  Trophy,
  LineChart,
  LogOut,
  Sparkles,
  User,
  Search,
  X,
  UserPlus,
} from "lucide-react";
import "./Header.css";

const navLinks = [
  { path: "/", label: "Home", icon: Home },
  { path: "/problems", label: "Problems", icon: Code2 },
  { path: "/contests", label: "Contests", icon: Trophy },
  { path: "/leaderboard", label: "Leaderboard", icon: LineChart },
];

function Header() {
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const searchRef = useRef(null);

  const handleLogout = async () => {
    try {
      await logoutProfile();
      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  const handleSearchChange = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim().length > 0) {
      setIsSearching(true);
      const filtered = await searchUsers(query);
      setSearchResults(filtered.data.users);
    } else {
      setIsSearching(false);
      setSearchResults([]);
    }
  };

  useEffect(() => {
    const user_Profile = async () => {
      const response = await getProfile();
      setUser(response.data);
      console.log(response.data);
    };
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearching(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    user_Profile();
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div>
      <header className="navbar-header">
        <div className="navbar-container">
          {/* Brand Logo & Navigation */}
          <div className="navbar-left">
            <Link to="/" className="navbar-logo-link">
              <img className="navbar-logo" src={logoSvg} alt="CodeForge AI" />
            </Link>

            <nav className="navbar-nav">
              {navLinks.map((item, index) => {
                const isActive = location.pathname === item.path;
                return (
                  <NavLink
                    key={index}
                    to={item.path}
                    className={({ isActive }) =>
                      isActive ? "nav-item active" : "nav-item"
                    }
                  >
                    <item.icon size={16} className="nav-icon" />
                    <span className="nav-label">{item.label}</span>
                    {isActive && (
                      <motion.div
                        layoutId="activeNavIndicator"
                        className="active-tab-glow"
                        transition={{
                          type: "spring",
                          stiffness: 550,
                          damping: 90,
                        }}
                      />
                    )}
                  </NavLink>
                );
              })}
            </nav>
          </div>

          {/* Center: User Search Box */}
          <div className="navbar-search-wrapper" ref={searchRef}>
            <div className={`search-input-box ${isSearching ? "focused" : ""}`}>
              <Search size={16} className="search-icon" />
              <input
                type="text"
                placeholder="Search coders..."
                value={searchQuery}
                onChange={handleSearchChange}
                onFocus={() => searchQuery.trim() && setIsSearching(true)}
              />
              {searchQuery && (
                <button
                  className="clear-search-btn"
                  onClick={() => {
                    setSearchQuery("");
                    setIsSearching(false);
                  }}
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* User Search Results Dropdown */}
            {isSearching && (
              <div className="search-results-dropdown">
                {searchResults.length > 0 ? (
                  <div className="results-list">
                    <div className="dropdown-header">Users</div>
                    {searchResults.map((resultUser) => (
                      <Link
                        key={resultUser.id}
                        to={`/profile/${resultUser.username}`}
                        className="search-result-item"
                        onClick={() => setIsSearching(false)}
                      >
                        <div className="result-avatar">
                          {resultUser.avatar ? (
                            <img
                              src={resultUser.avatar}
                              alt={resultUser.name}
                            />
                          ) : (
                            <User size={16} />
                          )}
                        </div>
                        <div className="result-info">
                          <div className="result-name-row">
                            <span className="result-name">
                              {resultUser.name}
                            </span>
                            <span className="result-rank-badge">
                              {resultUser.rank}
                            </span>
                          </div>
                          <span className="result-username">
                            @{resultUser.username} • Rating: {resultUser.rating}
                          </span>
                        </div>
                        <button
                          className="quick-follow-btn"
                          title="Follow"
                          onClick={(e) => e.preventDefault()}
                        >
                          <UserPlus size={14} />
                        </button>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="no-results">
                    <span>No coders found matching "{searchQuery}"</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* User Info / Auth Controls */}
          <div className="navbar-right">
            {user ? (
              <div className="user-profile-badge">
                <Link to="/my-profile" className="profile-info-link">
                  <div className="user-text-details">
                    <span className="user-display-name">{user.user.name}</span>
                    <span className="user-handle">{user.user.username}</span>
                  </div>

                  <div className="avatar-ring">
                    {user.user.profile_picture ? (
                      <img
                        src={user.user.profile_picture}
                        alt={user.user.name}
                        className="user-avatar-img"
                      />
                    ) : (
                      <div className="user-avatar-fallback">
                        <User size={16} />
                      </div>
                    )}
                  </div>
                </Link>

                <div className="profile-divider" />

                <button
                  className="logout-action-btn"
                  title="Log out"
                  onClick={handleLogout}
                >
                  <LogOut size={15} />
                </button>
              </div>
            ) : (
              <div className="auth-actions">
                <Link to="/login" className="auth-btn btn-sign-in">
                  Sign in
                </Link>
                <Link to="/signup" className="auth-btn btn-register">
                  <span>Register</span>
                  <Sparkles size={14} />
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>
      <Outlet />
    </div>
  );
}

export default Header;

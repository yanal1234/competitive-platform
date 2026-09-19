import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
import logoSvg from "../../../assets/logo.svg";
import { Code2, User } from "lucide-react";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Brand Section */}
        <div className="footer-brand">
          <Link to="/">
            <img className="footer-logo" src={logoSvg} alt="CodeForge AI" />
          </Link>
          <p className="footer-desc">
            AI-powered competitive programming platform for serious developers.
          </p>
        </div>

        {/* Links Grid */}
        <div className="footer-links-grid">
          {/* Column 1: Platform */}
          <div className="footer-column">
            <h4 className="footer-column-title">PLATFORM</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/problems">Problems</Link></li>
              <li><Link to="/contests">Contests</Link></li>
              <li><Link to="/leaderboard">Leaderboard</Link></li>
              <li><Link to="/skill-graph">Skill Graph</Link></li>
            </ul>
          </div>

          {/* Column 2: Team */}
          <div className="footer-column">
            <h4 className="footer-column-title">WHO ARE WE?</h4>
            <ul>
              <li className="footer-sub-label">GitHub</li>
              <li>
                <a href="https://github.com/Ayham" target="_blank" rel="noopener noreferrer" className="social-link">
                  <Code2 size={14} /> Ayham
                </a>
              </li>
              <li>
                <a href="https://github.com/yanal1234" target="_blank" rel="noopener noreferrer" className="social-link">
                  <Code2 size={14} /> Yanal
                </a>
              </li>
              <li className="footer-sub-label margin-top">LinkedIn</li>
              <li>
                <a href="https://linkedin.com/in/yanal-abed" target="_blank" rel="noopener noreferrer" className="social-link">
                  <User size={14} /> Yanal
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div className="footer-column">
            <h4 className="footer-column-title">RESOURCES</h4>
            <ul>
              <li><Link to="/faq">FAQ</Link></li>
            </ul>
          </div>

          {/* Column 4: Legal */}
          <div className="footer-column">
            <h4 className="footer-column-title">LEGAL</h4>
            <ul>
              <li><Link to="/privacy-policy">Privacy Policy</Link></li>
              <li><Link to="/terms-of-service">Terms of Service</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="footer-bottom">
        <p>© 2026 CodeForge AI. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;

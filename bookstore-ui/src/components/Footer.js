// src/components/Footer.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../stylesheets/Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section logo-section">
                    <div className="logo">
                        <Link to="/"><img src="/bookstorelogo.png" alt="Logo" /></Link>
                    </div>
                    <div className="social-icons">
                        <img src="/twitter.png" alt="X Icon" />
                        <img src="/insta.png" alt="Instagram Icon" />
                        <img src="/youtube.png" alt="YouTube Icon" />
                    </div>
                </div>

                <div className="footer-section">
                    <h4>Explore</h4>
                    <ul>
                        <li><Link to="/genres">Genres</Link></li>
                        <li><Link to="/recommendations">Recommended</Link></li>
                        <li>Non-Book Items</li>
                        <li>Sales</li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h4>Resources</h4>
                    <ul>
                        <li>About</li>
                        <li>Store Policies</li>
                        <li>Hours</li>
                        <li>News / Blog</li>
                        <li>Contact Us</li>
                        <li className="dropdown">
                            <select>
                                <option value="en">English</option>
                                <option value="sw">Swedish</option>
                            </select>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="footer-bottom">
                <p>© 2024 BookWiz. All Rights Reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
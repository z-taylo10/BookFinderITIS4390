// src/components/Footer.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section logo-section">
                    <div className="logo">
                        <Link to="/"><img src="/bookstorelogo.png" alt="Logo" /></Link>
                    </div>
                    <div className="social-icons">
                        {/* Replace with actual icons or SVGs */}
                        <span>📘</span> {/* Facebook Icon */}
                        <span>🐦</span> {/* Twitter Icon */}
                        <span>📸</span> {/* Instagram Icon */}
                        <span>📺</span> {/* YouTube Icon */}
                    </div>
                </div>

                <div className="footer-section">
                    <h4>Explore</h4>
                    <ul>
                        <li>Genres</li>
                        <li>Recommended</li>
                        <li>Popular Books</li>
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

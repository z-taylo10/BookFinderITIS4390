// src/components/Footer.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../stylesheets/Footer.css';

const Footer = () => {
    const [language, setLanguage] = useState('English');

    const handleLanguageChange = (event) => {
        setLanguage(event.target.value);
    };

    return (
        <div className="footer">
            <div className="logo-section">
                <img src={`${process.env.PUBLIC_URL}/bookstorelogo.png`} alt="Logo" className="footer-logo" />
                <div className="social-icons">
                    <img src={`${process.env.PUBLIC_URL}/twitter.png`} alt="Twitter" />
                    <img src={`${process.env.PUBLIC_URL}/insta.png`} alt="Instagram" />
                    <img src={`${process.env.PUBLIC_URL}/yt.png`} alt="YouTube" />
                </div>
            </div>
            <div className="footer-section">
                <h4>Explore</h4>
                <ul>
                    <li><Link to="/genres">Genres</Link></li>
                    <li><Link to="/recommendations">Recommended</Link></li>
                    <li><Link to="/search">Non-Book Items</Link></li>
                    <li><Link to="/sales">Sales</Link></li>
                    <li><Link to="/blog">Blog</Link></li>
                </ul>
            </div>
            <div className="footer-section">
                <h4>Resources</h4>
                <ul>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/store-policies">Store Policies</Link></li>
                    <li><Link to="/hours">Hours</Link></li>
                    <li><Link to="/contact-us">Contact Us</Link></li>
                    <li>
                        <select value={language} onChange={handleLanguageChange}>
                            <option value="English">English</option>
                            <option value="Swedish">Swedish</option>
                        </select>
                    </li>
                </ul>
            </div>
            <div className="footer-bottom">
                <hr />
                © 2024 BookWiz. All Rights Reserved.
            </div>
        </div>
    );
};

export default Footer;

// src/components/Footer.js
import React, { useState } from 'react';
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
                    <img src={`${process.env.PUBLIC_URL}/twitter.png`} alt="Social 1" />
                    <img src={`${process.env.PUBLIC_URL}/insta.png`} alt="Social 2" />
                    <img src={`${process.env.PUBLIC_URL}/yt.png`} alt="Social 3" />
                </div>
            </div>
            <div className="footer-section">
                <h4>Explore</h4>
                <ul>
                    <li><a href="#genres">Genres</a></li>
                    <li><a href="#recommended">Recommended</a></li>
                    <li><a href="#non-book-items">Non-Book Items</a></li>
                    <li><a href="#sales">Sales</a></li>
                    <li><a href="#blog">Blog</a></li>
                </ul>
            </div>
            <div className="footer-section">
                <h4>Resources</h4>
                <ul>
                    <li><a href="#about">About</a></li>
                    <li><a href="#store-policies">Store Policies</a></li>
                    <li><a href="#hours">Hours</a></li>
                    <li><a href="#contact-us">Contact Us</a></li>
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
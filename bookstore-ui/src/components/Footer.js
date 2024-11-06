// src/components/Footer.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../stylesheets/Footer.css';

const Footer = () => {
    const { t, i18n } = useTranslation();
    const [language, setLanguage] = useState('English');

    const handleLanguageChange = (event) => {
        const newLanguage = event.target.value;
        setLanguage(newLanguage);
        i18n.changeLanguage(newLanguage === 'English' ? 'en' : 'sv');
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
                <h4>{t('explore')}</h4>
                <ul>
                    <li><Link to="/genres">{t('genres')}</Link></li>
                    <li><Link to="/recommendations">{t('recommended')}</Link></li>
                    <li><Link to="/search">{t('nonBookItems')}</Link></li>
                    <li><Link to="/sales">{t('sales')}</Link></li>
                    <li><Link to="/blog">{t('blog')}</Link></li>
                </ul>
            </div>
            <div className="footer-section">
                <h4>{t('resources')}</h4>
                <ul>
                    <li><Link to="/about">{t('about')}</Link></li>
                    <li><Link to="/store-policies">{t('storePolicies')}</Link></li>
                    <li><Link to="/hours">{t('hours')}</Link></li>
                    <li><Link to="/contact-us">{t('contactUs')}</Link></li>
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

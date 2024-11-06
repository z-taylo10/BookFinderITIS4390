import React from 'react';
import { useTranslation } from 'react-i18next';
import LandingPage from './LandingPage';
// import SearchBar from '../components/SearchBar';

function HomePage({ onSearch }) {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t('welcomeMessage')}</h1>
      {/* <p>Landing page</p> */}
      <LandingPage />
    </div>
  );
}

export default HomePage;
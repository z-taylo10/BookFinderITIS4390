// src/components/GenreCard.js

import React from 'react';
import './GenreCard.css'; // Optional styling file

const GenreCard = ({ genre, image }) => {
  return (
    <div className="genre-card">
      <img src={image} alt={`${genre} icon`} className="genre-image" />
      <h3 className="genre-title">{genre}</h3>
    </div>
  );
};

export default GenreCard;

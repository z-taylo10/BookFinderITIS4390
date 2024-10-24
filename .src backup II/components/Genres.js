import React from 'react';
import { useNavigate } from 'react-router-dom';

const mainGenres = [
  'Fiction',
  'Nonfiction',
  'Science Fiction',
  'Fantasy',
  'Mystery',
  'Biography',
  'History',
  'Romance',
  'Horror',
  'Self-Help'
];

function Genres({ onGenreClick }) {
  const navigate = useNavigate();

  const handleGenreClick = (genre) => {
    onGenreClick(genre);
    navigate('/genre');
  };

  return (
    <div className="genres-container">
      <h2>Main Genres</h2>
      <ul>
        {mainGenres.map((genre, index) => (
          <li key={index} onClick={() => handleGenreClick(genre)}>
            {genre}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Genres;

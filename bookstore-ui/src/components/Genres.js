import React from 'react';
import { useNavigate } from 'react-router-dom';

export const mainGenres = [
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

function Genres() {
  const navigate = useNavigate();

  const handleGenreClick = (genre) => {
    navigate(`/genre/${genre.toLowerCase()}`);
  };

  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  return (
    <div className="genres-container"> 
      <h2>Main Genres</h2>
      <ul>
        {mainGenres.map((genre, index) => (
          <li key={index} onClick={() => handleGenreClick(genre)}>
            {capitalize(genre)}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Genres;

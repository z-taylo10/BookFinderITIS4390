import React from 'react';

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
  return (
    <div className="genres-container">
      <h2>Main Genres</h2>
      <ul>
        {mainGenres.map((genre, index) => (
          <li key={index} onClick={() => onGenreClick(genre)}>
            {genre}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Genres;

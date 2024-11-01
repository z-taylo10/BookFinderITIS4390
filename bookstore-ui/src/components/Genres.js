import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../stylesheets/GenresPage.css';
import Pagination from './Pagination';

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
  'Self-Help',
  'Thriller',
  'Adventure',
  'Poetry',
  'Drama',
  'Graphic Novels',
  'Children',
  'Cooking',
  'Travel',
  'Health'
];

function Genres() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const genresPerPage = 9;
  const totalPages = Math.min(5, Math.ceil(mainGenres.length / genresPerPage));
  const [covers, setCovers] = useState({});

  useEffect(() => {
    const fetchCovers = async () => {
      const requests = mainGenres.map(genre =>
        axios.get('https://www.googleapis.com/books/v1/volumes', {
          params: {
            q: `subject:${genre}`,
            maxResults: 1
          }
        }).then(response => ({
          genre,
          cover: response.data.items[0]?.volumeInfo.imageLinks?.thumbnail || '/placeholder.jpg'
        })).catch(() => ({
          genre,
          cover: '/placeholder.jpg'
        }))
      );

      const results = await Promise.all(requests);
      const newCovers = results.reduce((acc, { genre, cover }) => {
        acc[genre] = cover;
        return acc;
      }, {});

      setCovers(newCovers);
    };

    fetchCovers();
  }, []);

  const handleGenreClick = (genre) => {
    navigate(`/genre/${genre.toLowerCase()}`);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * genresPerPage;
  const currentGenres = mainGenres.slice(startIndex, startIndex + genresPerPage);

  return (
    <div className="genres-page">
      <div className="genres-header">
        <div className="checkbox-container">
          <input type="checkbox" id="subgenres" />
          <label htmlFor="subgenres">Include Sub-Genres</label>
        </div>
        <div className="genres-search-bar">
          <input type="text" placeholder="Search genres..." />
        </div>
        <div className="sort-dropdown">
          <label htmlFor="sort">Sort: </label>
          <select id="sort">
            <option value="popular">Popular</option>
            <option value="a-z">A-Z</option>
            <option value="z-a">Z-A</option>
          </select>
        </div>
      </div>
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      <div className="genres-grid">
        {currentGenres.map((genre, index) => (
          <div key={index} className="genre-card" onClick={() => handleGenreClick(genre)}>
            <img src={covers[genre]} alt={`${genre} cover`} />
            <h3>{genre}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Genres;

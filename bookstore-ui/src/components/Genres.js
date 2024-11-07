import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
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

export const subGenres = [
  'Historical Fiction',
  'Cyberpunk',
  'Steampunk',
  'Cozy Mystery',
  'True Crime',
  'Memoir',
  'Autobiography',
  'Self-Improvement',
  'Psychological Thriller',
  'Legal Thriller',
  'Space Opera',
  'Dystopian',
  'Post-Apocalyptic',
  'Paranormal Romance',
  'Gothic Horror',
  'Supernatural Horror',
  'Cooking Techniques',
  'Travel Guides',
  'Adventure Travel',
  'Health & Wellness',
  'Fitness',
  'Nutrition',
  'Poetry Anthologies',
  'Drama Plays',
  'Graphic Memoirs',
  'Children',
  'Fantasy'
];

function Genres() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const genresPerPage = 9;
  const [covers, setCovers] = useState({});
  const [sortOption, setSortOption] = useState('popular');
  const [includeSubGenres, setIncludeSubGenres] = useState(false);
  const [cachedCovers, setCachedCovers] = useState({});
  const [searchInput, setSearchInput] = useState('');

  const allGenres = useMemo(() => includeSubGenres ? [...mainGenres, ...subGenres] : mainGenres, [includeSubGenres]);
  const totalPages = Math.ceil(allGenres.length / genresPerPage);

  useEffect(() => {
    const fetchCovers = async () => {
      const uncachedGenres = allGenres.filter(genre => !cachedCovers[genre]);
      if (uncachedGenres.length === 0) {
        setCovers(cachedCovers);
        return;
      }

      const requests = uncachedGenres.map(genre =>
        axios.get('https://www.googleapis.com/books/v1/volumes', {
          params: {
            q: `subject:${genre}`,
            maxResults: 1,
            key: 'AIzaSyD-Tmhd6vMaMMakBt2VY6Tk5SQ9CvCTS3I'
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

      setCachedCovers(prev => ({ ...prev, ...newCovers }));
      setCovers({ ...cachedCovers, ...newCovers });
    };

    fetchCovers();
  }, [includeSubGenres, allGenres, cachedCovers]);

  const handleGenreClick = (genre) => {
    navigate(`/genre/${genre.toLowerCase()}`);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  const handleSubGenresChange = () => {
    setIncludeSubGenres(!includeSubGenres);
    setCurrentPage(1); // Reset to first page when toggling sub-genres
  };

  const handleSearchChange = (event) => {
    setSearchInput(event.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  const filteredGenres = allGenres.filter(genre =>
    genre.toLowerCase().includes(searchInput.toLowerCase())
  );

  const sortedGenres = [...filteredGenres].sort((a, b) => {
    if (sortOption === 'a-z') {
      return a.localeCompare(b);
    } else if (sortOption === 'z-a') {
      return b.localeCompare(a);
    }
    return 0; // Default (popular) does not change order
  });

  const startIndex = (currentPage - 1) * genresPerPage;
  const currentGenres = sortedGenres.slice(startIndex, startIndex + genresPerPage);

  return (
    <div className="genres-page">
      <div className="genres-header">
        <div className="checkbox-container">
          <input type="checkbox" id="subgenres" checked={includeSubGenres} onChange={handleSubGenresChange} />
          <label htmlFor="subgenres">{t('includeSubGenres')}</label>
        </div>
        <div className="genres-search-bar">
          <input
            type="text"
            placeholder={t('searchGenres')}
            value={searchInput}
            onChange={handleSearchChange}
          />
        </div>
        <div className="genre-sort-dropdown">
          <label htmlFor="sort">{t('sort')}: </label>
          <select id="sort" value={sortOption} onChange={handleSortChange}>
            <option value="popular">{t('popular')}</option>
            <option value="a-z">{t('aToZ')}</option>
            <option value="z-a">{t('zToA')}</option>
          </select>
        </div>
      </div>
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      <div className="genres-grid">
        {currentGenres.map((genre, index) => (
          <div key={index} className="genre-card" onClick={() => handleGenreClick(genre)}>
            <img src={covers[genre]} alt={`${genre} cover`} />
            <h3>{t(genre.toLowerCase().replace(/\s+/g, ''))}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Genres;

// src/pages/BooksPage.js

import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import BookCard from '../components/BookCard';
import '../stylesheets/BooksPage.css';
import { API_KEY } from '../config';
import { useTranslation } from 'react-i18next';

const BooksPage = () => {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [genre, setGenre] = useState('Fiction'); // Default genre
  const { t } = useTranslation();

  // Fetch books based on genre and pagination
  const fetchBooks = useCallback(async () => {
    const baseUrl = 'https://www.googleapis.com/books/v1/volumes';
    const params = {
      q: `subject:${genre}`, // Filter by genre
      maxResults: 12,
      startIndex: (currentPage - 1) * 12,
      key: API_KEY
    };

    try {
      const response = await axios.get(baseUrl, { params });
      setBooks(response.data.items || []);
      setTotalPages(Math.ceil(response.data.totalItems / 12));
    } catch (error) {
      console.error('Failed to retrieve data:', error);
    }
  }, [genre, currentPage]);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleGenreChange = (event) => {
    setGenre(event.target.value); // Update genre
    setCurrentPage(1); // Reset to first page for new genre
  };

  return (
    <div className="books-page">
      <h1>Books</h1>
      <div className="filter-container">
        <label htmlFor="genre-select">{t('filterByGenre')}</label>
        <select id="genre-select" value={genre} onChange={handleGenreChange}>
          <option value="Fiction">{t('fiction')}</option>
          <option value="Science">{t('science')}</option>
          <option value="History">{t('history')}</option>
          <option value="Fantasy">{t('fantasy')}</option>
          <option value="Mystery">{t('mystery')}</option>
        </select>
      </div>
      <div className="books-grid">
        {books.map((book, index) => (
          <BookCard
            key={index}
            id={book.id} // Pass book ID to link to detail page
            title={book.volumeInfo.title}
            author={book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown'}
            cover={book.volumeInfo.imageLinks?.thumbnail || '/placeholder.jpg'}
          />
        ))}
      </div>
      <div className="pagination">
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default BooksPage;

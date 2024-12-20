import React, { useState, useEffect } from 'react';
import BookList from '../components/BookList';
import Pagination from '../components/Pagination';
import axios from 'axios';

function GenrePage({ genre }) {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchBooksByGenre = async () => {
      const baseUrl = 'https://www.googleapis.com/books/v1/volumes';
      const params = {
        q: `subject:${genre}`,
        maxResults: 12,
        startIndex: (currentPage - 1) * 12,
      };

      try {
        const response = await axios.get(baseUrl, { params });
        setBooks(response.data.items || []);
        setTotalPages(Math.ceil(response.data.totalItems / 12));
      } catch (error) {
        console.error('Failed to retrieve data:', error);
      }
    };

    fetchBooksByGenre();
  }, [genre, currentPage]);

  return (
    <div>
      <h2>Books in {genre}</h2>
      <BookList books={books} />
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
    </div>
  );
}

export default GenrePage;


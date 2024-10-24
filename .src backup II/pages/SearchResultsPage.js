import React, { useState, useEffect, useCallback } from 'react';
import BookList from '../components/BookList';
import Pagination from '../components/Pagination';
import SearchBar from '../components/SearchBar'; // Import SearchBar
import axios from 'axios';

function SearchResultsPage({ query }) {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [currentQuery, setCurrentQuery] = useState(query);

  const fetchBooks = useCallback(async (searchQuery) => {
    setCurrentQuery(searchQuery);
    const baseUrl = 'https://www.googleapis.com/books/v1/volumes';
    const params = {
      q: searchQuery,
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
  }, [currentPage]);

  useEffect(() => {
    fetchBooks(query);
  }, [query, currentPage, fetchBooks]);

  return (
    <div>
      <SearchBar onSearch={fetchBooks} />
      <h2>Search Results for "{currentQuery}"</h2> {/* Use currentQuery */}
      <BookList books={books} />
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
    </div>
  );
}

export default SearchResultsPage;

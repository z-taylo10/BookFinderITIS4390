import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import BookList from '../components/BookList';
import Pagination from '../components/Pagination';
import axios from 'axios';
import '../stylesheets/SearchResultsPage.css';

function SearchResultsPage() {
  const location = useLocation();
  const query = location.state?.query || '';
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [currentQuery, setCurrentQuery] = useState(query);
  const [sortOption, setSortOption] = useState('popular');

  const fetchBooks = useCallback(async (searchQuery) => {
    setCurrentQuery(searchQuery);
    const baseUrl = 'https://www.googleapis.com/books/v1/volumes';
    const params = {
      q: searchQuery,
      maxResults: 40,
      key: 'AIzaSyD-Tmhd6vMaMMakBt2VY6Tk5SQ9CvCTS3I'
    };

    try {
      const response = await axios.get(baseUrl, { params });
      let fetchedBooks = response.data.items || [];

      // Sort books based on the selected option
      switch (sortOption) {
        case 'A-Z':
          fetchedBooks.sort((a, b) => a.volumeInfo.title.localeCompare(b.volumeInfo.title));
          break;
        case 'Z-A':
          fetchedBooks.sort((a, b) => b.volumeInfo.title.localeCompare(a.volumeInfo.title));
          break;
        case 'priceLowHigh':
          fetchedBooks.sort((a, b) => (a.saleInfo.listPrice?.amount || 0) - (b.saleInfo.listPrice?.amount || 0));
          break;
        case 'priceHighLow':
          fetchedBooks.sort((a, b) => (b.saleInfo.listPrice?.amount || 0) - (a.saleInfo.listPrice?.amount || 0));
          break;
        default:
          break;
      }

      // Paginate the sorted books
      const startIndex = (currentPage - 1) * 12;
      const paginatedBooks = fetchedBooks.slice(startIndex, startIndex + 12);

      setBooks(paginatedBooks);
      setTotalPages(Math.ceil(fetchedBooks.length / 12));
    } catch (error) {
      console.error('Failed to retrieve data:', error);
    }
  }, [currentPage, sortOption]);

  useEffect(() => {
    fetchBooks(query);
  }, [query, currentPage, sortOption, fetchBooks]);

  return (
    <div>
      <h2>Search Results for "{currentQuery}"</h2>
      <div className="three-column-layout">
        <div className="empty-column"></div>
        <div className="pagination-container">
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </div>
        <div className="sort-dropdown">
          <label htmlFor="sort">Sort by: </label>
          <select id="sort" value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
            <option value="popular">Popular</option>
            <option value="A-Z">A-Z</option>
            <option value="Z-A">Z-A</option>
            <option value="priceLowHigh">Price: Low to High</option>
            <option value="priceHighLow">Price: High to Low</option>
          </select>
        </div>
      </div>
      <BookList books={books} />
    </div>
  );
}

export default SearchResultsPage;

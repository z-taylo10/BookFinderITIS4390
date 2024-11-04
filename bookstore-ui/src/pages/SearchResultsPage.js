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
  const [suggestedBooks, setSuggestedBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [currentQuery, setCurrentQuery] = useState(query);
  const [sortOption, setSortOption] = useState('popular');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const baseUrl = 'https://www.googleapis.com/books/v1/volumes';
  const apiKey = 'AIzaSyD-Tmhd6vMaMMakBt2VY6Tk5SQ9CvCTS3I';

  // Fetch books based on the search query
  const fetchBooks = useCallback(async (searchQuery) => {
    if (!searchQuery.trim()) {
      setError('Please enter a search query.');
      setBooks([]);
      setSuggestedBooks([]);
      return;
    }

    setLoading(true); // Start loading
    setCurrentQuery(searchQuery);
    const params = {
      q: searchQuery,
      maxResults: 40,
      key: apiKey,
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
      setError(null);

      // If no results, fetch suggested books
      if (fetchedBooks.length === 0) {
        fetchSuggestedBooks();
      }
    } catch (error) {
      setError('Failed to retrieve data.');
      console.error('Failed to retrieve data:', error);
    } finally {
      setLoading(false); // End loading
    }
  }, [currentPage, sortOption]);

  // Fetch suggested books if no results are found
  const fetchSuggestedBooks = async () => {
    const params = {
      q: 'popular books', // Example query for suggested books
      maxResults: 3,
      key: apiKey,
    };

    try {
      const response = await axios.get(baseUrl, { params });
      setSuggestedBooks(response.data.items || []);
    } catch (error) {
      console.error('Failed to retrieve suggested books:', error);
      setSuggestedBooks([]);
    }
  };

  useEffect(() => {
    fetchBooks(query);
  }, [query, currentPage, sortOption, fetchBooks]);

  return (
    <div>
      {loading ? (
        <div className="loading-message">Loading...</div>
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : books.length === 0 ? (
        <div className="no-books-message">
          <p><strong><img src="/emoji.png" width={20} height={20} alt="emo" />Oops!</strong></p>
          <p className="no-books-text"><strong>Book not found</strong></p>
          <hr/>
          {suggestedBooks.length > 0 && (
            <>
              <strong>Are you looking for these?</strong>
              <BookList books={suggestedBooks} />
            </>
          )}
        </div>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
}

export default SearchResultsPage;

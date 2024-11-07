import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BookList from '../components/BookList';
import Pagination from '../components/Pagination';
import axios from 'axios';
import { API_KEY } from '../config';
import { useTranslation } from 'react-i18next';

function GenrePage() {
  const { genre } = useParams();
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortOption, setSortOption] = useState('popular');
  const { t } = useTranslation();

//  const capitalizeWords = (str) => {
//    return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
//  };

  useEffect(() => {
    const fetchBooksByGenre = async () => {
      const baseUrl = 'https://www.googleapis.com/books/v1/volumes';
      const params = {
        q: `subject:${genre}`,
        maxResults: 40,
        startIndex: (currentPage - 1) * 40,
        key: API_KEY
      };

      try {
        const response = await axios.get(baseUrl, { params });
        let fetchedBooks = response.data.items || [];

        console.log('Number of books fetched:', fetchedBooks.length);

        const indexMultiplierMap = {
          0: 1.1,
          1: 1.2,
          2: 1.3,
          3: 1.4,
          4: 1.5,
          5: 1.6,
          6: 1.7,
          7: 1.8,
          8: 1.9,
          9: 2.0,
          10: 1.1,
          11: 1.2,
          12: 1.3,
          13: 1.4,
          14: 1.5,
          15: 1.6,
          16: 1.7,
          17: 1.8,
          18: 1.9,
          19: 2.0,
          20: 1.1,
          21: 1.2,
          22: 1.3,
          23: 1.4,
          24: 1.5,
          25: 1.6,
          26: 1.7,
          27: 1.8,
          28: 1.9,
          29: 2.0,
          30: 1.1,
          31: 1.2,
          32: 1.3,
          33: 1.4,
          34: 1.5,
          35: 1.6,
          36: 1.7,
          37: 1.8,
          38: 1.9,
          39: 2.0
        };

        fetchedBooks.forEach((book, i) => {
          if (!book.saleInfo.listPrice) {
            book.saleInfo.listPrice = { amount: 9.99, currencyCode: 'USD' };
          }
          if (indexMultiplierMap[i]) {
            console.log(`Original price for book at index ${i}:`, book.saleInfo.listPrice.amount);
            book.saleInfo.listPrice.amount *= indexMultiplierMap[i];
            book.saleInfo.listPrice.amount = parseFloat(book.saleInfo.listPrice.amount.toFixed(2));
            console.log(`Modified price for book at index ${i}:`, book.saleInfo.listPrice.amount);
          }
        });

        // Sort books based on the selected option
        switch (sortOption) {
          case 'A-Z':
            fetchedBooks.sort((a, b) => a.volumeInfo.title.localeCompare(b.volumeInfo.title));
            break;
          case 'Z-A':
            fetchedBooks.sort((a, b) => b.volumeInfo.title.localeCompare(a.volumeInfo.title));
            break;
          case 'priceLowHigh':
            fetchedBooks.sort((a, b) => {
              const priceA = a.saleInfo.listPrice?.amount || 0;
              const priceB = b.saleInfo.listPrice?.amount || 0;
              return priceA - priceB;
            });
            break;
          case 'priceHighLow':
            fetchedBooks.sort((a, b) => {
              const priceA = a.saleInfo.listPrice?.amount || 0;
              const priceB = b.saleInfo.listPrice?.amount || 0;
              return priceB - priceA;
            });
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
    };

    fetchBooksByGenre();
  }, [genre, sortOption, currentPage]);

  return (
    <div>
      <h2>{t('booksIn')} {t(genre.toLowerCase())}</h2>
      <div className="genre-sort-dropdown">
        <label htmlFor="sort">{t('sortBy')}: </label>
        <select id="sort" value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
          <option value="popular">{t('popular')}</option>
          <option value="A-Z">{t('aToZ')}</option>
          <option value="Z-A">{t('zToA')}</option>
          <option value="priceLowHigh">{t('priceLowHigh')}</option>
          <option value="priceHighLow">{t('priceHighLow')}</option>
        </select>
      </div>
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
      <BookList books={books} />
    </div>
  );
}

export default GenrePage;
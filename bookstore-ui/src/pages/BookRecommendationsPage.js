import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookList from '../components/BookList';
import '../stylesheets/BookRecommendationsPage.css';
import { API_KEY } from '../config';

const BookRecommendationsPage = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch 8 random books from popular genres
    axios.get('https://www.googleapis.com/books/v1/volumes?q=subject:popular&maxResults=8&key=' + API_KEY)
      .then(response => {
        const bookData = response.data.items.map((item, index) => {
          const multiplierMap = [1.2, 1.4, 1.6, 1.8, 2.0, 1.1, 1.3, 1.5];
          const saleInfo = item.saleInfo;
          if (!saleInfo.listPrice) {
            saleInfo.listPrice = { amount: 9.99, currencyCode: 'USD' };
          }
          saleInfo.listPrice.amount *= multiplierMap[index];
          saleInfo.listPrice.amount = parseFloat(saleInfo.listPrice.amount.toFixed(2));

          return {
            id: item.id,
            volumeInfo: item.volumeInfo,
            saleInfo: saleInfo,
          };
        });
        setBooks(bookData);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch book recommendations');
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="book-finder">
      <main>
        <h2>Recommended for You</h2>
        <BookList books={books} />
      </main>
    </div>
  );
};

export default BookRecommendationsPage;